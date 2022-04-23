package com.github.alkhanm.domstc.domain.mapper;

import com.github.alkhanm.domstc.domain.Item;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.transference.ItemTransference;
import com.github.alkhanm.domstc.domain.transference.ProductTransference;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ItemMapper extends DomstcMapper<Item, ItemTransference> {
    ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);
    ProductMapper PRODUCT_MAPPER = Mappers.getMapper(ProductMapper.class);

    default ProductTransference map(Product product){
        return PRODUCT_MAPPER.toTransference(product);
    }
}