package com.github.alkhanm.domstc.configuration;

import com.github.alkhanm.domstc.services.ProductService;
import com.github.alkhanm.domstc.services.SaleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration()
public class Instantiation implements CommandLineRunner {
    private final ProductService productService;
    private final SaleService saleService;

    public Instantiation(ProductService productService, SaleService saleService) {
        this.productService = productService;
        this.saleService = saleService;
    }

    @Override
    public void run(String... args) {

    }
}
