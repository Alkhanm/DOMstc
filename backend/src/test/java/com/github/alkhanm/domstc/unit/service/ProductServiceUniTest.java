package com.github.alkhanm.domstc.unit.service;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import com.github.alkhanm.domstc.services.ProductService;
import com.github.alkhanm.domstc.unit.util.ProductCreator;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(SpringExtension.class)
@DisplayName("Testes para Product Service")
public class ProductServiceUniTest {

    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    private final List<Product> productListTest = new ArrayList<>();

    @BeforeEach
    void setUp(){
        productListTest.addAll(ProductCreator.createProductList(true));
        PageImpl<Product> productPage = new PageImpl<>(List.of(ProductCreator.createProduct(true)));
        BDDMockito.when(repository.findAll(ArgumentMatchers.any(PageRequest.class)))
                .thenReturn(productPage);

        BDDMockito.when(repository.findAll())
                .thenReturn(productListTest);

        BDDMockito.when(repository.save(ArgumentMatchers.any(Product.class)))
                        .thenAnswer(p -> {
                            productListTest.add(p.getArgument(0));
                            return null;
                        });

        BDDMockito.doNothing().when(repository)
                .delete(ArgumentMatchers.any(Product.class));
    }

    @AfterEach
    public void clean(){
        productListTest.clear();
    }

    @Test
    @DisplayName("Retorna uma lista com todos os produtos")
    void listAll_ReturnsAllProducts_When_Successful(){
        List<Product> productList = service.findAll();

        // Assegura que a lista não está nula ou vazia
        Assertions.assertThat(productList)
                .isNotNull()
                .isNotEmpty();

        // Assegura que os produtos anteriormente salvos estão na lista
        Assertions.assertThat(productList)
                .containsAll(productListTest);
    }

    @Test
    @DisplayName("Salva um produto")
    void saveTest(){
        //Pega o quantidade de produtos que há na lista
        Integer productQuantity = service.findAll().size();

        // Cria um produto, guarda na variável e depois o inseri para ser salvo
        Product product = ProductCreator.createProduct(true);
        service.save(product);

        // Verifica se a lista aumentou de tamanho devido á nova inserção
        Assertions.assertThat(productQuantity)
                .isLessThan(service.findAll().size());
    }
}
