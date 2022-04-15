package com.github.alkhanm.domstc.resources.controllers;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.mapper.ProductMapper;
import com.github.alkhanm.domstc.domain.transference.ProductTransference;
import com.github.alkhanm.domstc.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductMapper mapper = ProductMapper.INSTANCE;
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public @ResponseBody
    List<ProductTransference> getAll() {
        return mapper.toTransferenceList(service.findAll());
    }

    @PostMapping
    public @ResponseBody
    Product save(@RequestBody Product product) {
        return service.save(product);
    }

    @PostMapping("/all")
    public @ResponseBody
    List<Product> save(@RequestBody List<Product> products) {
        return products.stream()
                .map(service::save)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public @ResponseBody
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
}