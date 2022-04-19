package com.github.alkhanm.domstc.resources.controllers;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.mapper.ProductMapper;
import com.github.alkhanm.domstc.domain.transference.ProductTransference;
import com.github.alkhanm.domstc.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", methods = {GET, POST, DELETE})
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

    @GetMapping("/{id}")
    public @ResponseBody
    ProductTransference getOne(@PathVariable Long id) {
        return mapper.toTransference(service.findById(id));
    }

    @PostMapping
    public @ResponseBody
    ProductTransference save(@RequestBody Product product) {
        return mapper.toTransference(service.save(product));
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