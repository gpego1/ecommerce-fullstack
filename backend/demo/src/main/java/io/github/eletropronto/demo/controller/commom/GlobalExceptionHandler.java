package io.github.eletropronto.demo.controller.commom;
import io.github.eletropronto.demo.controller.dto.errors.ErrorResponse;
import io.github.eletropronto.demo.controller.dto.errors.FieldErrorDTO;
import io.github.eletropronto.demo.exception.InvalidFieldException;
import io.github.eletropronto.demo.exception.OpeartionNotAllowedException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        List<FieldError> fieldErrors = e.getFieldErrors();
        List<FieldErrorDTO> errorsList = fieldErrors
                .stream()
                .map(fe -> new FieldErrorDTO(fe.getField(), fe.getDefaultMessage()))
                .collect(Collectors.toList());
        return new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Validation error",
                errorsList);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleOpeartionNotAllowedException(OpeartionNotAllowedException e){
        return ErrorResponse.conflict(e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleUnhandledErros(RuntimeException e){
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "", List.of());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleInvalidFieldException(InvalidFieldException e){
        return new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                "Invalid field",
                List.of()
        );
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleDeniedException(AccessDeniedException e){
        return new ErrorResponse(HttpStatus.FORBIDDEN.value(), "Access denied", List.of());
    }
}
