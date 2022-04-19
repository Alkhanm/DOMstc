package com.github.alkhanm.domstc.domain;

import com.github.alkhanm.domstc.domain.enums.CompanyEnum;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
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

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, unique = true)
    private long code;

    private String brand;
    private double purchasePrice;
    private double salePrice;
    private int quantity;
    private String variation;
    private String imageUrl;
    private int volume;
    private int weight;
    private int unit;
    private LocalDate purchaseDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private CompanyEnum company;

    @OneToOne(cascade = CascadeType.PERSIST)
    private Category category = new Category("");

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = LocalDate.parse(purchaseDate);
    }
    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return code == product.code && id.equals(product.id) && purchaseDate.equals(product.purchaseDate);
    }
    @Override public int hashCode() {
        return Objects.hash(id, code, purchaseDate);
    }
}
