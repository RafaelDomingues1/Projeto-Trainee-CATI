package com.CATI.MatriculaFacil.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
public class PerfilDTO {

    private String name;
    private String email;
    private Integer credits;
    private List<String> disciplinasConcluidas;
    private List<String> disciplinasMatriculadas;


}
