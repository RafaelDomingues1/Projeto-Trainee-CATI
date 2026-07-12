package com.CATI.MatriculaFacil.Entities;

import lombok.Data;

import java.util.UUID;

@Data  //cria os getters e setters para todos os atributos da entidade
public class AlunoEntity {

    private UUID id;
    private String name;
    private String username;
    private String email;
    private String password;

}
