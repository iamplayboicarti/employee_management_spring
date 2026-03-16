package vn.tuan_dao.springrestwithai.feature.role.dto;

import java.time.Instant;
import java.util.List;

import vn.tuan_dao.springrestwithai.feature.permission.dto.PermissionResponse;
import vn.tuan_dao.springrestwithai.feature.role.Role;

public record RoleResponse(
        Long id,
        String name,
        String description,
        List<PermissionResponse> permissions,
        Instant createdAt,
        Instant updatedAt
) {
    public static RoleResponse fromEntity(Role role) {
        List<PermissionResponse> permissionResponses = role.getPermissions().stream()
                .map(PermissionResponse::fromEntity)
                .toList();
        return new RoleResponse(
                role.getId(),
                role.getName(),
                role.getDescription(),
                permissionResponses,
                role.getCreatedAt(),
                role.getUpdatedAt()
        );
    }
}
