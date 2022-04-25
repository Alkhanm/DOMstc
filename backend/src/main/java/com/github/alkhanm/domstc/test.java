package com.github.alkhanm.domstc;

import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString
class Produto {
    String nome;
    double preco;
    int qnt;
    List<LojaProduto> lojas = new ArrayList<>();

    public Produto(String nome, double preco, int qnt) {
        this.nome = nome;
        this.preco = preco;
        this.qnt = qnt;
    }
}

@ToString
class Loja {
    String nome;

    public Loja(String nome) {
        this.nome = nome;
    }
}

@ToString
class LojaProduto {
    Loja loja;
    int qnt;
    double preco;

    public LojaProduto(Loja loja, int qnt, double preco) {
        this.loja = loja;
        this.qnt = qnt;
        this.preco = preco;
    }
}



public class test {
    public static void main(String[] args) {
        List<Loja> lojas = List.of(
                new Loja("Amazon"),
                new Loja("Shopee"),
                new Loja("Mercado Livre")
        );

        LojaProduto lojaProduto = new LojaProduto(lojas.get(0), 1, 12.0);
        LojaProduto lojaProduto2 = new LojaProduto(lojas.get(0), 2, 22.0);
        LojaProduto lojaProduto3 = new LojaProduto(lojas.get(0), 4, 16.0);

        Produto petit = new Produto("Petit", 32.0, 2);
        petit.lojas.add(lojaProduto);
        petit.lojas.add(lojaProduto2);
        petit.lojas.add(lojaProduto3);

        System.out.println(petit);
    }
}
