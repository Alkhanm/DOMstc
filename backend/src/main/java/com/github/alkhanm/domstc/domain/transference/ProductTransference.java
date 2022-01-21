package com.github.alkhanm.domstc.domain.transference;

import java.time.LocalDate;

public record ProductTransference(
       Long id,
       String description,
       Long code,
       String category,
       Double purchasePrice,
       Double salePrice,
       String brand,
       Integer quantity,
       String variation,
       String imageUrl,
       Integer volume,
       Integer weight,
       Integer unit,
       LocalDate purchaseDate
) {}

