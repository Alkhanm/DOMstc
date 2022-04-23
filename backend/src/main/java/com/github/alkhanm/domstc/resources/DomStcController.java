package com.github.alkhanm.domstc.resources;

import java.util.List;

public interface DomStcController<E, R> {
    List<R> getAll();
    R getOne(Long id);
    R create(E t);
    void delete(Long id);
}
