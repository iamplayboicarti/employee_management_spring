package vn.tuan_dao.springrestfulAPI.feature.user;

import org.springframework.data.domain.Pageable;

import vn.tuan_dao.springrestfulAPI.dto.ResultPaginationDTO;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.CreateUserRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UpdateUserRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserFilterRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserResponse;

public interface UserService {

    UserResponse create(CreateUserRequest request);

    UserResponse update(UpdateUserRequest request);

    UserResponse getById(Long id);

    ResultPaginationDTO filter(UserFilterRequest filter, Pageable pageable);

    void delete(Long id);
}

