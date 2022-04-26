package com.github.alkhanm.domstc.resources;

import com.github.alkhanm.domstc.domain.Sale;
import com.github.alkhanm.domstc.domain.mapper.SaleMapper;
import com.github.alkhanm.domstc.domain.transference.SaleTransference;
import com.github.alkhanm.domstc.services.SaleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "*", methods = {GET, POST, DELETE})
public class SaleController implements DomStcController<Sale, SaleTransference> {
    private final SaleService service;
    private final SaleMapper mapper = SaleMapper.INSTANCE;

    public SaleController(SaleService service) {
        this.service = service;
    }

    @GetMapping
    @Override public @ResponseBody
    List<SaleTransference> getAll() {
        List<Sale> list = service.findAll();
        return mapper.toTransferenceList(list);
    }

    @GetMapping("/{id}")
    @Override public @ResponseBody
    SaleTransference getOne(@PathVariable Long id) {
        Sale saleFound = service.findById(id);
        return mapper.toTransference(saleFound);
    }

    @PostMapping
    @Override public @ResponseBody
    SaleTransference create(@RequestBody Sale sale) {
        Sale newSale = service.save(sale);
        return mapper.toTransference(newSale);
    }

    @DeleteMapping("/{id}")
    @Override public @ResponseBody
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
