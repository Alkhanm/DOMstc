package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_product_shop")
@Builder
public class ProductShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  double price;
    private  int qnt;

    @OneToOne(targetEntity = Store.class)
    @JoinColumn(name = "store_id")
    private Store store;

    public ProductShop(double price, int qnt, Store store) {
        this.price = price;
        this.qnt = qnt;
        this.store = store;
    }
    public ProductShop(long id, double price, int qnt, Store store) {
        this.id = id;
        this.price = price;
        this.qnt = qnt;
        this.store = store;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductShop that = (ProductShop) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, store);
    }
}
