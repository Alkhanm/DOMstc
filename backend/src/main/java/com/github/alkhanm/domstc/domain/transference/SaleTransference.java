package com.github.alkhanm.domstc.domain.transference;
import java.time.LocalDateTime;
import java.util.List;

public record SaleTransference(
        Long id,
        LocalDateTime date,
        String description,
        String canal,
        List<ItemTransference> items
) {
}
