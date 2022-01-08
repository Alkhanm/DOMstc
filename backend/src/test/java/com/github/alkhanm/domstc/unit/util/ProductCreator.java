package com.github.alkhanm.domstc.unit.util;

import com.github.alkhanm.domstc.domain.Product;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

public class ProductCreator {
    private static final List<String> names = List.of(
            "HD 1000GB",
            "SSD",
            "Mouse pad",
            "Notebook",
            "Mouse"
    );
    private static final List<String> brand = List.of(
            "Kingston",
            "WD Green",
            "Positivo",
            "ACER",
            "Leadership"
    );

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

    public static String createName(){
        int r = new Random().nextInt(4);
        return names.get(r);
    }
    public static String createBrand(){
        int r = new Random().nextInt(4);
        return brand.get(r);
    }
    public static int createPrice(){
        return new Random().nextInt(3000);
    }

}
