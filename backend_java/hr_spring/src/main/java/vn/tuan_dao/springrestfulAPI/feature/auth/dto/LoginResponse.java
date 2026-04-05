package vn.tuan_dao.springrestfulAPI.feature.auth.dto;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {
}

