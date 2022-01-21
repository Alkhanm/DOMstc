package com.github.alkhanm.domstc.domain.mapper;

import com.github.alkhanm.domstc.domain.Category;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.domain.transference.ProductTransference;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ProductMapper extends DomstcMapper<Product, ProductTransference> {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    default String map(Category value) {
        return value.getName();
    }
}
