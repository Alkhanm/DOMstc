package com.github.alkhanm.domstc.services.exceptions;

public class InvalidRequestException extends RuntimeException{
    public InvalidRequestException(String msg){
        super(msg);
    }
}
