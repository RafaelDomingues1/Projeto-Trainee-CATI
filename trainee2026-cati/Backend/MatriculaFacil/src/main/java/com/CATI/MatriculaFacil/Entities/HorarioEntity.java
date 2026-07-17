package com.CATI.MatriculaFacil.Entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Entity(name = "Horário")
public class HorarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O campo não pode estar em branco") //validação para não ficar em branco
    DayOfWeek diaDaSemana;
    @NotBlank (message = "O campo não pode estar em branco") //validação para não ficar em branco
    LocalTime horaInicio;
    @NotBlank (message = "O campo não pode estar em branco") //validação para não ficar em branco
    LocalTime horaFim;

    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    private DisciplinaEntity disciplina;

}
