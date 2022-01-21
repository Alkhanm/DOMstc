package com.github.alkhanm.domstc.services.exceptions;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String msg){
        super(msg);
    }
}
