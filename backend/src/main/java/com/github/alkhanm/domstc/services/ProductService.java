package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll(){
        return repository.findAll();
    }

    public Product save(Product product){
       return repository.save(product);
    }

    public void delete(Long id) {
       repository.findById(id)
               .ifPresent(repository::delete);
    }
}
