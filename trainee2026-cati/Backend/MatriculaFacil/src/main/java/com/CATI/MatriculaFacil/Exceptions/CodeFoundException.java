package com.CATI.MatriculaFacil.Exceptions;

public class CodeFoundException extends RuntimeException {
    public CodeFoundException()
    {
        super("Uma matéria com esse código já existe");
    }
}
