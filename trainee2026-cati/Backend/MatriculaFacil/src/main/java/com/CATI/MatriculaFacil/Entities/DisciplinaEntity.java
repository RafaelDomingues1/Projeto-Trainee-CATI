package com.CATI.MatriculaFacil.Entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "Disciplina")
public class DisciplinaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // se usa UUID pois tem 128 bits , meio overkill , mas não estoura
    @NotBlank(message = "O campo não pode estar em branco") //validação para não ficar em branco
    private String name;
    private String code;
    private Integer credits;
    private Integer vagas;
    private Integer vagasDisponiveis;

    @ManyToMany
    @JoinTable( name = "Disciplina_Prerequisito",
            joinColumns = @JoinColumn(name = "disciplina_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisito_id")
    )
    private List <DisciplinaEntity> materiasObrigatorias = new ArrayList<>();//uma disciplina pode ter varios pre requisitos e uma disciplina pode ter varios pre requisitos

    @ElementCollection
    @CollectionTable(
            name = "disciplina_horario",
            joinColumns = @JoinColumn(name = "disciplina_id")
    )
    private List<Horario> horarios = new ArrayList<>();
    @CreationTimestamp
    private LocalDateTime createdAt;

}
