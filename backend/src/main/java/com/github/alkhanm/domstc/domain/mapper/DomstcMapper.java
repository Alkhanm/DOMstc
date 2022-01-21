package com.github.alkhanm.domstc.domain.mapper;

import java.util.List;
import java.util.stream.Collectors;

public interface DomstcMapper<E, T> {
    T toTransference (E e);

    default List<T> toTransferenceList(List<E> entityList){
        return entityList.stream()
                .map(this::toTransference)
                .collect(Collectors.toList());
    }
}
