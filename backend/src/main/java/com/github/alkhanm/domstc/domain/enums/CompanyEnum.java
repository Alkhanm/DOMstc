package com.github.alkhanm.domstc.domain.enums;

public enum CompanyEnum {
    NATURA("NATURA"),
    AVON ("AVON"),
    HINODE("HINODE"),
    BOTICARIO("BOTICARIO"),
    NENHUMA("NENHUMA");

    private final String value;

    CompanyEnum(String enumValue) {
        value = enumValue;
    }

    @Override
    public String toString(){
        return value;
    }
}
