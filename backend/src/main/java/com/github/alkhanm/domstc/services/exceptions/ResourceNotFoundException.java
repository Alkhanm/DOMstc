package com.github.alkhanm.domstc.services.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public final String entity;
    public final String operation;
    public ResourceNotFoundException(String msg, String entity, String operation){
        super(msg);
        this.entity = entity;
        this.operation = operation;
    }
}
