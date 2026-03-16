package vn.tuan_dao.springrestwithai.feature.user.dto;

import vn.tuan_dao.springrestwithai.util.constant.GenderEnum;

public record UserFilterRequest(
        String name,
        String email,
        String address,
        Integer ageFrom,
        Integer ageTo,
        GenderEnum gender) {
}
