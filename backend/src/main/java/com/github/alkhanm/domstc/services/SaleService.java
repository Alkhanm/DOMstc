package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Sale;
import com.github.alkhanm.domstc.repositories.SaleRepository;
import org.springframework.stereotype.Repository;

@Repository
public class SaleService implements DomStcService<Sale, SaleRepository> {
    private final SaleRepository repository;

    public SaleService(SaleRepository repository) {
        this.repository = repository;
    }

    @Override
    public SaleRepository getRepository() {
        return repository;
    }
}
