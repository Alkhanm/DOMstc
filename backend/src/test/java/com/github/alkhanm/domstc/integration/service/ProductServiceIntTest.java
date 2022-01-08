package com.github.alkhanm.domstc.integration.service;
import com.github.alkhanm.domstc.domain.Product;
import com.github.alkhanm.domstc.repositories.ProductRepository;
import com.github.alkhanm.domstc.services.ProductService;
import com.github.alkhanm.domstc.unit.util.ProductCreator;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@DisplayName("Testes para Product Service")
public class ProductServiceIntTest {

    @Autowired
    private ProductService service;

    @Autowired
    private ProductRepository repository;

    private final List<Product> productListInitial = ProductCreator.createProductList(false);

    @BeforeEach
    public void setUp(){
        repository.saveAll(productListInitial);
    }

    @AfterEach
    public void clean(){
        repository.deleteAll();
    }

    @Test
    @DisplayName("Retorna uma lista com todos os produtos")
    void  listAllTest(){
        List<Product> productList = service.findAll();

        // Assegura que a lista não está nula ou vazia
        Assertions.assertThat(productList)
                .isNotNull()
                .isNotEmpty();

        // Assegura que os produtos anteriormente salvos estão na lista
        Assertions.assertThat(productList)
                .containsAll(productListInitial);
    }

    @Test
    @DisplayName("Salva um produto")
    void saveTest(){
        // Pega o quantidade de produtos que há na lista
        Integer productQuantity = service.findAll().size();

        // Cria um produto, guarda na variável e depois o inseri para ser salvo
        Product product = ProductCreator.createProduct(false);
        service.save(product);

        // Verifica se a lista aumentou de tamanho devido á nova inserção
        Assertions.assertThat(productQuantity)
                .isLessThan(service.findAll().size());

        // Verifica se o produto criado acima está na lista de produtos salvos no banco de dados
        Assertions.assertThat(service.findAll())
                .contains(product);
    }


    //Testa se um produto está sendo excluído corretamente
    @Test
    @DisplayName("Deleta um produto")
    void deleteTest(){
        // Cria um produto
        Product prod1 = ProductCreator.createProduct(false);
        // Salva esse produto no banco de dados e guardo o ‘id’ desse produto salvo em uma variável
        Long id = repository.save(prod1).getId();
        //Verifica se o produto criado foi realmente salvo no banco de dados
        Assertions.assertThat(repository.existsById(id))
                .isTrue();
        //Deleta o produto
        service.delete(id);
        //Verifica se o produto criado foi realmente deletado do banco de dados
        Assertions.assertThat(repository.existsById(id))
                .isFalse();
    }
}
