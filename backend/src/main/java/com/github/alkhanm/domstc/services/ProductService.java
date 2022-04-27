package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements DomStcService<Product, ProductRepository>{
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public ProductRepository getRepository() {
        return repository;
    }
}
