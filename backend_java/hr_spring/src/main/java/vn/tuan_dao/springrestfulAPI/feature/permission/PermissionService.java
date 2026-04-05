package vn.tuan_dao.springrestfulAPI.feature.permission;

import org.springframework.data.domain.Pageable;

import vn.tuan_dao.springrestfulAPI.dto.ResultPaginationDTO;
import vn.tuan_dao.springrestfulAPI.feature.permission.dto.CreatePermissionRequest;
import vn.tuan_dao.springrestfulAPI.feature.permission.dto.PermissionResponse;
import vn.tuan_dao.springrestfulAPI.feature.permission.dto.UpdatePermissionRequest;

public interface PermissionService {

    PermissionResponse create(CreatePermissionRequest request);

    PermissionResponse update(UpdatePermissionRequest request);

    PermissionResponse getById(Long id);

    ResultPaginationDTO getAll(Pageable pageable);

    void delete(Long id);
}

