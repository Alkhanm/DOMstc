package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.Store;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import com.github.alkhanm.domstc.services.exceptions.ResourceNotFoundException;
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

    public Product findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não corresponde a nem um produto", Product.class.getName(), "ENCONTRAR POR ID"));
    }
}
