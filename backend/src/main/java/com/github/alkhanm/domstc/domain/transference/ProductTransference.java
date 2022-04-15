package com.github.alkhanm.domstc.domain.transference;

import java.time.LocalDate;

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
       LocalDate purchaseDate
) {}

