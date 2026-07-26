package com.CATI.MatriculaFacil.DTO;

import com.CATI.MatriculaFacil.Enums.StatusDisciplina;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class DisciplinaResponseDTO {

    private UUID id;
    private String name;
    private String code;
    private Integer credits;
    private Integer vagas;
    private Integer vagasdisponiveis;
    private List<String> horarios;
    private List<String> prerequisitos;
    private StatusDisciplina status;

}
