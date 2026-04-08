package vn.tuan_dao.springrestfulAPI.security;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import vn.tuan_dao.springrestfulAPI.feature.permission.Permission;
import vn.tuan_dao.springrestfulAPI.feature.role.Role;
import vn.tuan_dao.springrestfulAPI.feature.role.RoleRepository;

@Component
public class PermissionAuthorizationManager
        implements AuthorizationManager<RequestAuthorizationContext> {

    private final RoleRepository roleRepository;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    // ConcurrentHashMap để thread-safe khi refreshCache() gọi từ nhiều thread
    private volatile Map<String, List<Permission>> rolePermissionsCache = new ConcurrentHashMap<>();

    public PermissionAuthorizationManager(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * Chạy sau khi toàn bộ CommandLineRunner (kể cả DatabaseSeeder) đã xong.
     * Đảm bảo cache được build SAU khi DB đã được seed.
     */
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        refreshCache();
    }

    /**
     * Reload toàn bộ role-permission từ DB.
     * Gọi sau mỗi lần tạo/sửa/xóa Role hoặc Permission.
     */
    public void refreshCache() {
        List<Role> roles = roleRepository.findAllWithPermissions();

        Map<String, List<Permission>> newCache = new ConcurrentHashMap<>();
        for (Role role : roles) {
            newCache.computeIfAbsent("ROLE_" + role.getName(), k -> new ArrayList<>())
                    .addAll(role.getPermissions());
        }
        // Gán atomic — các request đang xử lý vẫn dùng snapshot cũ
        this.rolePermissionsCache = newCache;
    }

    @Override
    public AuthorizationDecision authorize(
            Supplier<? extends Authentication> authSupplier,
            RequestAuthorizationContext context) {

        Authentication authentication = authSupplier.get();
        if (authentication == null || !authentication.isAuthenticated()) {
            return new AuthorizationDecision(false);
        }

        String requestPath = context.getRequest().getRequestURI();
        String httpMethod = context.getRequest().getMethod();

        // Lấy roles của user từ JWT
        List<String> userRoles = getUserRolesFromJwt(authentication);

        // Với mỗi role → lấy permissions từ cache → check match
        for (String role : userRoles) {
            List<Permission> permissions = rolePermissionsCache
                    .getOrDefault(role, Collections.emptyList());

            for (Permission perm : permissions) {
                if (perm.getMethod().equalsIgnoreCase(httpMethod)
                        && pathMatcher.match(perm.getApiPath(), requestPath)) {
                    return new AuthorizationDecision(true);
                }
            }
        }

        return new AuthorizationDecision(false);
    }

    @SuppressWarnings("unchecked")
    private List<String> getUserRolesFromJwt(Authentication authentication) {
        if (authentication instanceof JwtAuthenticationToken jwtToken) {
            Object rolesClaim = jwtToken.getToken().getClaim("roles");
            if (rolesClaim instanceof List<?> roles) {
                return (List<String>) roles;
            }
        }
        return Collections.emptyList();
    }
}

