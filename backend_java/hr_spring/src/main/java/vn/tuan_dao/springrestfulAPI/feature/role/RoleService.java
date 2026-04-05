package vn.tuan_dao.springrestfulAPI.feature.role;

import org.springframework.data.domain.Pageable;

import vn.tuan_dao.springrestfulAPI.dto.ResultPaginationDTO;
import vn.tuan_dao.springrestfulAPI.feature.role.dto.CreateRoleRequest;
import vn.tuan_dao.springrestfulAPI.feature.role.dto.RoleResponse;
import vn.tuan_dao.springrestfulAPI.feature.role.dto.UpdateRoleRequest;

public interface RoleService {

    RoleResponse create(CreateRoleRequest request);

    RoleResponse update(UpdateRoleRequest request);

    RoleResponse getById(Long id);

    ResultPaginationDTO getAll(Pageable pageable);

    void delete(Long id);
}

