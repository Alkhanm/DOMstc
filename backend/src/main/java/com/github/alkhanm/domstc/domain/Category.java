package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_category")
public class Category {
    @Id @GeneratedValue
    private Long id;

    private String name;

    public Category(String name) {
        this.name = name;
    }
}
