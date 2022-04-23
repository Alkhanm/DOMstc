package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_item")
public class Item {
    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "integer default 1")
    private Integer quantity;

    @OneToOne
    private Product product;

    public Item(Integer quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }
}
