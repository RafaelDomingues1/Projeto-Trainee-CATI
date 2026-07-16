package com.CATI.MatriculaFacil.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor //cria um construtor com esses 2 argumentos
public class AuthAlunoDTO {

    private String password;
    private String email; //informações que eu vou precisar para fazer minha autenticação

}
