package com.github.alkhanm.domstc.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_store")
public class Store {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    public Store(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Store store = (Store) o;
        return Objects.equals(id, store.id);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
