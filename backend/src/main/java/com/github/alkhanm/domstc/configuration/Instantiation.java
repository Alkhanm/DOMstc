package com.github.alkhanm.domstc.configuration;

import com.github.alkhanm.domstc.domain.*;
import com.github.alkhanm.domstc.domain.enums.CompanyEnum;
import com.github.alkhanm.domstc.repositories.CategoryRepository;
import com.github.alkhanm.domstc.services.ProductService;
import com.github.alkhanm.domstc.repositories.SaleRepository;
import com.github.alkhanm.domstc.repositories.StoreRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;
import java.util.Set;

@Profile("test")
@Configuration()
public class Instantiation implements CommandLineRunner {
    private final ProductService productService;
    private final SaleRepository saleRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    public Instantiation(ProductService productService, SaleRepository saleRepository, StoreRepository storeRepository, CategoryRepository categoryRepository) {
        this.productService = productService;
        this.saleRepository = saleRepository;
        this.storeRepository = storeRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        Category perfume = new Category( "PERFUME");
        Category saboneteEmBarras = new Category( "Sabonete em barras");
        Category shampooAnticaspa = new Category( "Shampoo anticaspa");
        List<Category> categories = List.of(perfume, saboneteEmBarras, shampooAnticaspa);

        Store shopee = new Store("Shopee");
        Store amazon = new Store("Amazon");
        Store mercadoLivre = new Store("Mercado Livre");
        List<Store> stores = List.of(shopee, amazon, mercadoLivre);

        List<Product> products = List.of(
                new Product("Petit Libellule", 1234434576, "Petit", 13.5, 23.9, 3, CompanyEnum.AVON, perfume, List.of(
                        new ProductStore(29, 3, amazon),
                        new ProductStore(2, 5, shopee)
                )),
                new Product("Musk Freeze", 961255896, "Musk", 6.5, 215, 8, CompanyEnum.AVON, perfume, Set.of(
                        new ProductStore(2, 5, shopee)
                )),
                new Product("Musk Storm", 1234453576, "Musk", 6.1, 16, 10, CompanyEnum.AVON, perfume, Set.of(
                        new ProductStore(2, 5, shopee)
                )),
                new Product("Shampo Anticaspa", 524153252, "Advance Tecniques", 23.5, 33.9, 12, CompanyEnum.AVON, shampooAnticaspa, List.of(
                        new ProductStore(29, 2, amazon),
                        new ProductStore(29, 3, mercadoLivre)
                ))
        );
        List<Item> items1 = List.of(
                new Item(2, products.get(1))
        );
        List<Item> items2 = List.of(
                new Item(2, products.get(3)),
                new Item(1, products.get(2))
        );
        List<Item> items3 = List.of(
                new Item(2, products.get(3)),
                new Item(1, products.get(1)),
                new Item(1, products.get(0))

        );
        List<Item> items4 = List.of(
                new Item(2, products.get(1)),
                new Item(1, products.get(2)),
                new Item(2, products.get(3)),
                new Item(1, products.get(0))
        );

        List<Sale> sales = List.of(
                new Sale("Venda teste", "Amazon", items1),
                new Sale("Venda teste", "Mercado Livre", items2),
                new Sale("Venda teste", "Shopee", items3),
                new Sale("Venda teste", "Shopee", items4)
        );

        storeRepository.saveAll(stores);
        categoryRepository.saveAll(categories);
        productService.saveAll(products);
        saleRepository.saveAll(sales);
    }
}
