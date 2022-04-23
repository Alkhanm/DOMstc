package com.github.alkhanm.domstc.domain.mapper;

import com.github.alkhanm.domstc.domain.Sale;
import com.github.alkhanm.domstc.domain.transference.SaleTransference;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface SaleMapper extends DomstcMapper<Sale, SaleTransference> {
    SaleMapper INSTANCE = Mappers.getMapper(SaleMapper.class);
}
