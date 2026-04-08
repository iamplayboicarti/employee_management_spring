package vn.tuan_dao.springrestfulAPI.feature.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import vn.tuan_dao.springrestfulAPI.config.CookieProperties;
import vn.tuan_dao.springrestfulAPI.dto.ApiResponse;
import vn.tuan_dao.springrestfulAPI.exception.InvalidTokenException;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.LoginRequest;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.LoginResponse;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.RefreshRequest;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.RegisterRequest;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.RegisterResponse;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    private static final String COOKIE_PATH = "/api/v1/auth";
    // 7 ngày = 604800 giây — khớp với jwt.refresh-expiration
    private static final int COOKIE_MAX_AGE = 604800;

    private final AuthService authService;
    private final CookieProperties cookieProperties;

    public AuthController(AuthService authService, CookieProperties cookieProperties) {
        this.authService = authService;
        this.cookieProperties = cookieProperties;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String deviceInfo = httpRequest.getHeader("User-Agent");
        String ipAddress = extractClientIp(httpRequest);

        LoginResponse loginResponse = authService.login(request, deviceInfo, ipAddress);
        setRefreshTokenCookie(httpResponse, loginResponse.refreshToken());

        return ResponseEntity.ok(ApiResponse.success("Đăng nhập thành công", loginResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Đăng ký thành công", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @RequestBody(required = false) RefreshRequest body,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String rawRefreshToken = extractRefreshToken(body, httpRequest);
        if (rawRefreshToken == null) {
            throw new InvalidTokenException("Refresh token không được cung cấp");
        }

        LoginResponse loginResponse = authService.refresh(rawRefreshToken);
        setRefreshTokenCookie(httpResponse, loginResponse.refreshToken());

        return ResponseEntity.ok(ApiResponse.success("Token đã được làm mới", loginResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        String rawRefreshToken = extractRefreshTokenFromCookie(httpRequest);
        if (rawRefreshToken != null) {
            authService.logout(rawRefreshToken);
        }
        clearRefreshTokenCookie(httpResponse);

        return ResponseEntity.ok(ApiResponse.success("Đăng xuất thành công", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMe(
            @AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        UserResponse userResponse = authService.getMe(email);
        return ResponseEntity.ok(ApiResponse.success(userResponse));
    }

    private String extractRefreshToken(RefreshRequest body, HttpServletRequest request) {
        String fromCookie = extractRefreshTokenFromCookie(request);
        if (fromCookie != null) {
            return fromCookie;
        }
        if (body != null && body.refreshToken() != null && !body.refreshToken().isBlank()) {
            return body.refreshToken();
        }
        return null;
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> REFRESH_TOKEN_COOKIE_NAME.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String rawToken) {
        StringBuilder cookie = new StringBuilder();
        cookie.append(REFRESH_TOKEN_COOKIE_NAME).append("=").append(rawToken);
        cookie.append("; HttpOnly");
        if (cookieProperties.isSecure()) {
            cookie.append("; Secure");
        }
        cookie.append("; SameSite=Lax");
        cookie.append("; Path=").append(COOKIE_PATH);
        cookie.append("; Max-Age=").append(COOKIE_MAX_AGE);
        response.setHeader("Set-Cookie", cookie.toString());
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        response.setHeader("Set-Cookie", REFRESH_TOKEN_COOKIE_NAME + "=; Max-Age=0; Path=" + COOKIE_PATH);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}

