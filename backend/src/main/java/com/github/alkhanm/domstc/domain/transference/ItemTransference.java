package com.github.alkhanm.domstc.domain.transference;

import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.mapper.ProductMapper;
import lombok.Getter;

@Getter
public class ItemTransference {
    final int quantity;
    final ProductTransference product;

    public ItemTransference(int quantity, Product product) {
        this.quantity = quantity;
        this.product = ProductMapper.INSTANCE.toTransference(product);
    }
}
