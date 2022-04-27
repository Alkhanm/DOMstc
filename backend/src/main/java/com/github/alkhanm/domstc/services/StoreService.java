package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Store;
import com.github.alkhanm.domstc.repositories.StoreRepository;
import org.springframework.stereotype.Service;

@Service
public class StoreService implements DomStcService<Store, StoreRepository> {
    private final StoreRepository repository;

    public StoreService(StoreRepository repository) {
        this.repository = repository;
    }

    @Override public StoreRepository getRepository() {
        return repository;
    }
}
