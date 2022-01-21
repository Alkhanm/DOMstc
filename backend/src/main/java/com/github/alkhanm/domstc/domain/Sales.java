package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_sales")
public class Sales {
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate date;
    private int quantity;

    @OneToOne
    private Product product;
}
