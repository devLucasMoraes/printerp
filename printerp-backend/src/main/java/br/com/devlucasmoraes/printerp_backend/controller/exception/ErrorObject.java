package br.com.devlucasmoraes.printerp_backend.controller.exception;

public record ErrorObject(String message, String field, Object parameter) {
}
