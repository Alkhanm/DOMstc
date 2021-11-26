package com.github.alkhanm.domstc.resources.controllers;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = {"http://localhost:8080/"})
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public @ResponseBody
    List<Product> getAll(){
        return service.findAll();
    }

    @PostMapping
    public @ResponseBody
    Product save(@RequestBody Product product){
        return service.save(product);
    }
}
