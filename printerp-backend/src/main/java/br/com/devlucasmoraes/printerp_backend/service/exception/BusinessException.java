package br.com.devlucasmoraes.printerp_backend.service.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
