package com.CATI.MatriculaFacil.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class PerfilDTO {

    private String nome;
    private String email;
    private Integer creditos;
    private List<String> disciplinasConcluidas;
    private List<String> disciplinasMatriculadas;


}
