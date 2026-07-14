package com.CATI.MatriculaFacil.Exceptions;

public class UserFoundException extends RuntimeException{
    public UserFoundException(){
        super("Usuário já existe");
    }
}
