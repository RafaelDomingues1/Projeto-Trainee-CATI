package com.CATI.MatriculaFacil.Repositories;

import com.CATI.MatriculaFacil.Entities.HorarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

public interface HorarioRepository extends JpaRepository <HorarioEntity, UUID> {
    Optional<HorarioEntity> findByDiaDaSemanaAndHoraInicio(
            DayOfWeek diaDaSemana,
            LocalTime horaInicio);
}
