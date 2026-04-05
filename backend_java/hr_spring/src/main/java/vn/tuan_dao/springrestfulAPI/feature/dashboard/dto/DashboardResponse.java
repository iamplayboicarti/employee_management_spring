package vn.tuan_dao.springrestfulAPI.feature.dashboard.dto;

public record DashboardResponse(
        long totalUsers,
        long totalCompanies,
        long totalRoles,
        long totalPermissions) {
}

