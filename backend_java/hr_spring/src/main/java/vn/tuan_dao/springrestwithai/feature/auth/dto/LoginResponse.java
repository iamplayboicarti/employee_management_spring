package vn.tuan_dao.springrestwithai.feature.auth.dto;

public record LoginResponse(
        String accessToken,
        String refreshToken
) {
}
