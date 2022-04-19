package com.github.alkhanm.domstc.resources.controllers.exception;

import com.github.alkhanm.domstc.services.exceptions.ResourceNotFoundException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice
public class DomstcHandlerException {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public StandardError resourceNotFound (ResourceNotFoundException ex, HttpServletRequest request){
        String error = "Recurso não encontrado";
        return new StandardError(Instant.now(), NOT_FOUND.value(), ex.entity, ex.operation, error, ex.getMessage(),  request.getRequestURI());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(BAD_REQUEST)
    public StandardError resourceMessageNotReadable (HttpMessageNotReadableException ex, HttpServletRequest request){
        String error = "O recurso não pode ser lido";
        return new StandardError(Instant.now(), BAD_REQUEST.value(), "", "", error, ex.getMessage(),  request.getRequestURI());
    }
}
