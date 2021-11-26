package com.github.alkhanm.domstc.unit.util;

import com.github.alkhanm.domstc.domain.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

public class ProductCreator {

    public static Product createProduct(boolean withId){
        long id = new Random().nextInt(99);
       double price = new Random().nextDouble(100);
        return Product
                .builder()
                .id(withId ? id : null)
                .name("Produto test")
                .brand("Testante")
                .purchasePrice(price)
                .salePrice(price * new Random().nextDouble(3))
                .acquisitionDate(LocalDate.now().toString())
                .build();
    }

    public static List<Product> createProductList(boolean withId){
        return List.of (
                createProduct(withId),
                createProduct(withId),
                createProduct(withId));
    }
}
