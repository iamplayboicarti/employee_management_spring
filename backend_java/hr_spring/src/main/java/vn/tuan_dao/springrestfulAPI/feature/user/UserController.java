package vn.tuan_dao.springrestfulAPI.feature.user;

import jakarta.validation.Valid;
import vn.tuan_dao.springrestfulAPI.dto.ApiResponse;
import vn.tuan_dao.springrestfulAPI.dto.ResultPaginationDTO;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.CreateUserRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UpdateUserRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserFilterRequest;
import vn.tuan_dao.springrestfulAPI.feature.user.dto.UserResponse;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
// khai báo base URL cho tất cả endpoint trong controller này, gomn cả endpoint getById, create, update, delete
@RequestMapping("/api/v1/users") 
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    //ResponseEntity là một class đại diện cho toàn bộ một phản hồi HTTP (HTTP Response).
    // Nó cho phép kiểm soát toàn bộ phản hồi, bao gồm cả status code, headers và body. Trong trường hợp này, body của phản hồi sẽ là một ApiResponse chứa ResultPaginationDTO.
    
    public ResponseEntity<ApiResponse<ResultPaginationDTO>> filter(
            @ParameterObject UserFilterRequest filter,
            @ParameterObject Pageable pageable) {
        ResultPaginationDTO result = userService.filter(filter, pageable);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách người dùng thành công", result));
    }

    @GetMapping("/{id}")
    // ResponseEntity<ApiResponse<UserResponse>>: kiểu trả về của API, bao gồm cả metadata (status, message) và dữ liệu thực tế (result)
    // Nho co apiResponse de dam bao format response nhat quan, de client de dang xu ly, tranh dai dong code khi client nhan response
    public ResponseEntity<ApiResponse<UserResponse>> getById(@PathVariable Long id) {
        UserResponse response = userService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy thông tin người dùng thành công", response));
    }

    // Khong nen viet logic qua nhieu trong controller, ma nen de service xu ly, controller chi nhan request, goi service, tra ve response
    // Khong nen tra ra du lieu sai trong controller, ma nen de service xu ly, neu co loi thi service se nem exception, controller se bat va tra ve response phu hop
    // De global exception handler xu ly, tranh viec viet nhieu code xu ly loi trong controller, de controller gon gang hon, de global exception handler xu ly loi nhat quan hon
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> create(
        //valid de kiem tra du lieu dau vao
            @Valid @RequestBody CreateUserRequest request) {
        UserResponse response = userService.create(request);
        URI location = URI.create("/api/v1/users/" + response.id());
        return ResponseEntity.created(location)
                .body(ApiResponse.created("Tạo người dùng thành công", response));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserResponse>> update(
            @Valid @RequestBody UpdateUserRequest request) {
        UserResponse response = userService.update(request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thông tin người dùng thành công", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa người dùng thành công", null));
    }
}

