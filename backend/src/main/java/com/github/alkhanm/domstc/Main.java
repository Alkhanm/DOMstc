package com.github.alkhanm.domstc;

import java.util.Objects;

enum MaqStatusContratoEnum {

    AGUARDANDO(1, "AGUARDANDO INICIO", "labelBlack", "black"), ATIVO(2, "ATIVO", "labelBlue", "blue"),
    AG_DECISAO_COMPRA(3, "AG. DECISÃO COMPRA", "labelBoldYellowV1", "gold"), ATIVO_SEM_COMPRA(4, "ATIVO S/ COMPRA", "labelBlue", "blue"),
    AG_RENOVAR(5, "AGUARDANDO RENOVAR", "labelBoldYellowV1", "gold"), ENCERRADO_COMPRA(6, "ENCERRADO C/ COMPRA", "labelBlack", "black"),
    ENCERRADO_RENOVACAO(7, "ENCERRADO C/ RENOVAÇÃO", "labelBlack", "black"), ENCERRADO_PRAZO(8, "ENCERRADO FIM PRAZO", "labelBlack", "black"),
    CANCELADO(9, "CANCELADO", "labelRed", "red"), EXCLUIDO(10, "EXCLUÍDO", "labelRed", "red");

    private int id;
    private String descricao;
    private String descStyleClass;
    private String descColor;

    MaqStatusContratoEnum(int id, String descricao, String descStyleClass, String descColor) {
        this.id = id;
        this.descricao = descricao;
        this.descStyleClass = descStyleClass;
        this.descColor = descColor;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescStyleClass() {
        return descStyleClass;
    }

    public void setDescStyleClass(String descStyleClass) {
        this.descStyleClass = descStyleClass;
    }

    public String getDescColor() {
        return descColor;
    }

    public void setDescColor(String descColor) {
        this.descColor = descColor;
    }

    public static MaqStatusContratoEnum get(int id) {
        for (MaqStatusContratoEnum tipo : MaqStatusContratoEnum.values()) {
            if (tipo.getId() == id) {
                return tipo;
            }
        }
        return null;
    }
}

class Test {
    String a;
    String b;
}

public class Main {
    public static void main(String[] args) {
        MaqStatusContratoEnum cbxStatusContrato;
        var parameter = "10";
        int idStatusContratoParam = Integer.parseInt(parameter);
        MaqStatusContratoEnum statusContrato = MaqStatusContratoEnum.get(idStatusContratoParam);
        cbxStatusContrato = switch (statusContrato) {
            case null -> null;
            case AG_DECISAO_COMPRA -> MaqStatusContratoEnum.AG_DECISAO_COMPRA;
            case AG_RENOVAR -> MaqStatusContratoEnum.AG_RENOVAR;
            case ATIVO -> MaqStatusContratoEnum.ATIVO;
            default -> null;
        };
        System.out.println("O Status do Contrato é: " + cbxStatusContrato);
        Test t = new Test();
    }

}
