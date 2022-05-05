package com.github.alkhanm.domstc.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter @ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_category")
public class Category {
    @Id @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(targetEntity = Product.class)
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    public Category( String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return name.equals(category.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
