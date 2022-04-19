package com.github.alkhanm.domstc.configuration;

import com.github.alkhanm.domstc.domain.Category;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Profile("test")
@Configuration()
public class Instantiation implements CommandLineRunner {
    private final ProductRepository productRepository;

    public Instantiation(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        //productRepository.deleteAll();
    }
}
