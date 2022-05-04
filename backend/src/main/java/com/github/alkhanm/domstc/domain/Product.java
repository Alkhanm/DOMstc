package com.github.alkhanm.domstc.domain;

import com.github.alkhanm.domstc.domain.enums.CompanyEnum;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

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
    private Integer volume;
    private Integer weight;
    private LocalDate purchaseDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private CompanyEnum company;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private final List<ProductStore> productStores = new ArrayList<>();

    @OneToOne(cascade = CascadeType.PERSIST)
    private Category category;

    public Product(String description, long code, String brand, double purchasePrice, double salePrice, int quantity, CompanyEnum company, Category category, Collection<ProductStore> productStores) {
        this.description = description;
        this.code = code;
        this.brand = brand;
        this.purchasePrice = purchasePrice;
        this.salePrice = salePrice;
        this.quantity = quantity;
        this.company = company;
        this.category = category;
        this.productStores.addAll(Set.copyOf(productStores));
    }

    public void addProductStore(ProductStore productStores){
        this.productStores.add(productStores);
    }

    public void addStoreAsDefaultValues(Store store) {
        final int PRODUCT_QUANTITY = 1;
        ProductStore productStore = new ProductStore(salePrice, PRODUCT_QUANTITY, store);
        productStores.add(productStore);
    }

    public Set<ProductStore> getProductStores(){
        return Set.copyOf(productStores);
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
