package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.domain.Category;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.Store;
import com.github.alkhanm.domstc.repositories.CategoryRepository;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import com.github.alkhanm.domstc.repositories.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements DomStcService<Product, ProductRepository> {
    private final ProductRepository repository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository repository, StoreRepository storeRepository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.storeRepository = storeRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductRepository getRepository() {
        return repository;
    }

    @Override
    public Product save(Product product) {
        List<Store> nonIncludedStores = storeRepository.findAll().stream()
                .filter(store -> product.getProductStores().stream().noneMatch(ps -> ps.getStore().equals(store)))
                .toList();
        nonIncludedStores.forEach(product::addStoreAsDefaultValues);
        return repository.save(product);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }
}
