package com.CATI.MatriculaFacil.Repositories;

import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DisciplinaRepository extends JpaRepository <DisciplinaEntity, UUID> {
    Optional<DisciplinaEntity> findByCode(String code);
}
