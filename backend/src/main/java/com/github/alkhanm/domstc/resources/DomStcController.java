package com.github.alkhanm.domstc.resources;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*", methods = {GET, POST, DELETE})
public interface DomStcController<E, R> {
    List<R> getAll();
    R getOne(Long id);
    R create(E t);
    void delete(Long id);
}
