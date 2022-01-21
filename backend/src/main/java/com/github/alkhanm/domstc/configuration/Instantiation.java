package com.github.alkhanm.domstc.configuration;

import com.github.alkhanm.domstc.domain.Category;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;

import java.util.List;

//@Configuration
public class Instantiation implements CommandLineRunner {
    private final ProductRepository productRepository;

    public Instantiation(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        List<Category> categoryList = List.of(
                new Category("COLONIA"),
                new Category("SAMPHOO"),
                new Category(),
                new Category()
        );
        List<Product> productList = List.of(
                new Product(),
                new Product(),
                new Product(),
                new Product()
        );
    }
}
