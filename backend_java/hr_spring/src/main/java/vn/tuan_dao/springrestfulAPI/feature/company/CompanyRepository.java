package vn.tuan_dao.springrestfulAPI.feature.company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);
}

