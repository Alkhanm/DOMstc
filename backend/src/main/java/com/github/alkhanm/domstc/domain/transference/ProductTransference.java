package com.github.alkhanm.domstc.domain.transference;

import com.github.alkhanm.domstc.domain.ProductStore;

import java.time.LocalDate;
import java.util.Set;

public record ProductTransference(
       long id,
       long code,
       int quantity,
       int volume,
       int weight,
       int unit,
       double purchasePrice,
       double salePrice,
       String description,
       String category,
       String company,
       String brand,
       String imageUrl,
       String variation,
       LocalDate purchaseDate,
       Set<ProductStore> productStores
) {}

