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
    @Id @GeneratedValue
    private Long id;

    private Integer quantity = 1;

    @OneToOne
    private Product product;

    @ManyToOne(targetEntity = Sale.class)
    private Sale sale;

    public Item(Integer quantity, Product product) {
        this.quantity = quantity;
        this.product = product;
    }
}
