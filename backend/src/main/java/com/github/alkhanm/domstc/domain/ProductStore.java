package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_product_store")
@Builder
public class ProductStore{
    @Id
    @GeneratedValue
    private Long id;
    private  double price;
    private  int qnt;

    @OneToOne(targetEntity = Store.class)
    @JoinColumn(name = "store_id")
    private Store store;

    public ProductStore(double price, int qnt, Store store) {
        this.price = price;
        this.qnt = qnt;
        this.store = store;
    }
}
