package com.github.alkhanm.domstc.services;

import com.github.alkhanm.domstc.services.exceptions.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomStcService<T, R extends JpaRepository<T, Long>> {

    R getRepository();

    default List<T> findAll(){
        return getRepository().findAll();
    }

    default T save(T product){
        return getRepository().save(product);
    }

    default void delete(Long id) {
        getRepository().findById(id)
                .ifPresent(getRepository()::delete);
    }

    default T findById(Long id) {
        return getRepository().findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Esse id não corresponde a nem uma entidade", this.getClass().getSimpleName(), "ENCONTRAR POR ID"));
    }
}
