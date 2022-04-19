package com.github.alkhanm.domstc.resources.controllers.exception;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

public record StandardError(
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT")
        Instant instant,
        int status,
        String entity,
        String operation,
        String error,
        String message,
        String path) {
}
