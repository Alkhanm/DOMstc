package com.github.alkhanm.domstc.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity(name = "tb_sale")
public class Sale {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime date = LocalDateTime.now(ZoneId.of("America/Sao_Paulo"));
    private String description;

    private String canal;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Item> items;

    public Sale(String description, String canal, List<Item> items) {
        this.description = description;
        this.canal = canal;
        this.items = items;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sale sale = (Sale) o;
        return Objects.equals(id, sale.id);
    }
    @Override public int hashCode() {
        return Objects.hash(id);
    }
}
