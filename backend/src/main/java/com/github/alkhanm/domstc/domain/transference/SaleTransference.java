package com.github.alkhanm.domstc.domain.transference;
import java.time.LocalDateTime;
import java.util.Set;

public record SaleTransference(
        Long id,
        LocalDateTime date,
        String description,
        String canal,
        Set<ItemTransference> items
) {
}
