package com.github.alkhanm.domstc.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity(name = "tb_product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private double purchasePrice;
    private double salePrice;
    private String brand;
    private String acquisitionDate = LocalDate.now(ZoneId.of("America/Sao_Paulo")).toString();

    public Product(
            String name,
            double purchasePrice,
            double salePrice,
            String brand,
            String acquisitionDate) {
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.brand = brand;
        this.acquisitionDate = acquisitionDate;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Double.compare(product.purchasePrice, purchasePrice) == 0 && Double.compare(product.salePrice, salePrice) == 0 && Objects.equals(id, product.id) && Objects.equals(name, product.name) && Objects.equals(brand, product.brand) && Objects.equals(acquisitionDate, product.acquisitionDate);
    }
    @Override public int hashCode() {
        return Objects.hash(id, name, purchasePrice, salePrice, brand, acquisitionDate);
    }
}
