package com.github.alkhanm.domstc.configuration;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import com.github.alkhanm.domstc.services.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class Instantiation implements CommandLineRunner {
    private final ProductRepository productRepository;

    public Instantiation(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        productRepository.deleteAll();
        productRepository.saveAll(List.of(
                new Product("Product1", 120.90,199.90, "Avon", LocalDate.now().toString())
        ));
    }
}
