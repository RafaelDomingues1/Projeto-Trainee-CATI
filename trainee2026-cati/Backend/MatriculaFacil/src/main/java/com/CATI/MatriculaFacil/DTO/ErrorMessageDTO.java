package com.CATI.MatriculaFacil.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor // cria um construtor com argumentos
public class ErrorMessageDTO {

    private String message;
    private String field; //ideia é pegar tudo isso de erro e pegar somente a mensagem e qual o campo que ele está dando erro
}
