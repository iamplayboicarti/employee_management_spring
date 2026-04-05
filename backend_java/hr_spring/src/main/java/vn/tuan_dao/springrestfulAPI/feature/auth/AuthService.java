package vn.tuan_dao.springrestfulAPI.feature.auth;

import vn.tuan_dao.springrestfulAPI.feature.auth.dto.LoginRequest;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.LoginResponse;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.RegisterRequest;
import vn.tuan_dao.springrestfulAPI.feature.auth.dto.RegisterResponse;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request, String deviceInfo, String ipAddress);

    RegisterResponse register(RegisterRequest request);

    LoginResponse refresh(String rawRefreshToken);

    void logout(String rawRefreshToken);

    UserResponse getMe(String email);
}

