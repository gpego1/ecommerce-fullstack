package io.github.eletropronto.demo.exception;

public class OpeartionNotAllowedException extends RuntimeException {
    public OpeartionNotAllowedException(String message) {
        super(message);
    }
}
