package vn.tuan_dao.springrestfulAPI.feature.user.dto;

import vn.tuan_dao.springrestfulAPI.util.constant.GenderEnum;

public record UserFilterRequest(
        String name,
        String email,
        String address,
        Integer ageFrom,
        Integer ageTo,
        GenderEnum gender) {
}

