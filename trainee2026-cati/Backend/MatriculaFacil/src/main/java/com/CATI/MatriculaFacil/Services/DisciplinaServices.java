package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.DTO.DisciplinaResponseDTO;
import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Enums.StatusDisciplina;
import com.CATI.MatriculaFacil.Exceptions.CodeFoundException;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaServices {

    @Autowired //injeção de dependencia para o spring gerenciar quando o repository vai ser inserido
    private DisciplinaRepository disciplinaRepository;

    public DisciplinaEntity execute(DisciplinaEntity disciplinaEntity) {
        this.disciplinaRepository.findByCode(disciplinaEntity.getCode()).ifPresent((user) -> {
            throw new CodeFoundException();
        });

        return this.disciplinaRepository.save(disciplinaEntity); //não quero que uma matéria salva tenha o mesmo código, pode
        //ter o mesmo nome mas em horario diferente e código diferente

    }

    public List<DisciplinaResponseDTO> listar() {

        return disciplinaRepository.findAll()
                .stream()
                .map(d -> new DisciplinaResponseDTO(
                        d.getCode(),
                        d.getName(),
                        d.getCredits(),
                        d.getVagas(),
                        d.getVagasDisponiveis(),
                        d.getHorarios()
                                .stream()
                                .map(h -> h.getDiaDaSemana()
                                        + ""
                                        + h.getHoraInicio()
                                        + "-"
                                        + h.getHoraFim()).toList(),
                        d.getMateriasObrigatorias()
                                .stream()
                                .map(DisciplinaEntity::getName)
                                .toList()
                )).toList();
    }
}

