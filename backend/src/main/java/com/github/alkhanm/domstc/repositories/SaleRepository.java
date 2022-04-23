package com.github.alkhanm.domstc.repositories;

import com.github.alkhanm.domstc.domain.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {}
