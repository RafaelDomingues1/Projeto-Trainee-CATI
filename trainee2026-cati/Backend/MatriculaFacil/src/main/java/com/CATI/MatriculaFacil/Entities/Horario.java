package com.CATI.MatriculaFacil.Entities;


import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@Embeddable // essa classe não é uma entidade independente, mas seus dados podem fazer parte de outra entidade
public class Horario {


    @NotNull(message = "O campo não pode estar em branco") //validação para não ficar em branco
    DayOfWeek diaDaSemana;
    @NotNull (message = "O campo não pode estar em branco") //validação para não ficar em branco
    LocalTime horaInicio;
    @NotNull (message = "O campo não pode estar em branco") //validação para não ficar em branco
    LocalTime horaFim;


}
