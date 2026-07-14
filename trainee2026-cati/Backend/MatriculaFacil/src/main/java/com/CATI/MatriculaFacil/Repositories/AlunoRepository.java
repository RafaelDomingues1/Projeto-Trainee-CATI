package com.CATI.MatriculaFacil.Repositories;

import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AlunoRepository extends JpaRepository<AlunoEntity, UUID> {
     Optional<AlunoRepository> findByEmail(String email);
}
