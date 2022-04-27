package com.github.alkhanm.domstc.resources;

import com.github.alkhanm.domstc.domain.Store;
import com.github.alkhanm.domstc.services.StoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/stores")
@CrossOrigin(origins = "*", methods = {GET, POST, DELETE})
public class StoreController implements DomStcController<Store, Store>{
    private final StoreService service;

    public StoreController(StoreService service) {
        this.service = service;
    }

    @GetMapping
    @Override public @ResponseBody
    List<Store> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Override public Store getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @Override public Store create(Store store) {
        return service.save(store);
    }

    @DeleteMapping("/{id}")
    @Override public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
