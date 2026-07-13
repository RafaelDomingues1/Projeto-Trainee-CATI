package com.CATI.MatriculaFacil.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity(name = "Disciplina")
public class DisciplinaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // se usa UUID pois tem 128 bits , meio overkill , mas não estoura
    private String name;
    private String code;
    private Integer credits;
    private Integer vagas;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
