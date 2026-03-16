package vn.tuan_dao.springrestwithai.feature.auth.dto;

import java.time.Instant;

import vn.tuan_dao.springrestwithai.feature.user.User;
import vn.tuan_dao.springrestwithai.util.constant.GenderEnum;

public record RegisterResponse(
        Long id,
        String name,
        String email,
        Integer age,
        GenderEnum gender,
        String address,
        Instant createdAt
) {
    public static RegisterResponse fromEntity(User user) {
        return new RegisterResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAge(),
                user.getGender(),
                user.getAddress(),
                user.getCreatedAt()
        );
    }
}
