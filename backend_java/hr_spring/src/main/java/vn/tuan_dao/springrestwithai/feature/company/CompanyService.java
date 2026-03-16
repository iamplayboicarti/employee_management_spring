package vn.tuan_dao.springrestwithai.feature.company;

import org.springframework.data.domain.Pageable;

import vn.tuan_dao.springrestwithai.dto.ResultPaginationDTO;
import vn.tuan_dao.springrestwithai.feature.company.dto.CompanyResponse;
import vn.tuan_dao.springrestwithai.feature.company.dto.CreateCompanyRequest;
import vn.tuan_dao.springrestwithai.feature.company.dto.UpdateCompanyRequest;

public interface CompanyService {

    CompanyResponse create(CreateCompanyRequest request);

    CompanyResponse update(UpdateCompanyRequest request);

    CompanyResponse getById(Long id);

    ResultPaginationDTO getAll(Pageable pageable);

    void delete(Long id);
}
