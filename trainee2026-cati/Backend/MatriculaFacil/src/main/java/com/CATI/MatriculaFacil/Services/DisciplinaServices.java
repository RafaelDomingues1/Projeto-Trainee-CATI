package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.DTO.DisciplinaResponseDTO;
import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Exceptions.CodeFoundException;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DisciplinaServices {

    @Autowired //injeção de dependencia para o spring gerenciar quando o repository vai ser inserido
    private DisciplinaRepository disciplinaRepository;
    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private MatriculaServices matriculaServices;

    public DisciplinaEntity execute(DisciplinaEntity disciplinaEntity) {
        this.disciplinaRepository.findByCode(disciplinaEntity.getCode()).ifPresent((user) -> {
            throw new CodeFoundException();
        });

        return this.disciplinaRepository.save(disciplinaEntity); //não quero que uma matéria salva tenha o mesmo código, pode
        //ter o mesmo nome mas em horario diferente e código diferente

    }

    public List<DisciplinaResponseDTO> listar(UUID alunoid) {

        AlunoEntity aluno = alunoRepository.findById(alunoid)
                .orElseThrow( () -> new RuntimeException("Aluno não encontrado"));

        return disciplinaRepository.findAll()
                .stream()
                .map(disciplina ->converterParaDTO(aluno,disciplina)).toList();


    }

    private DisciplinaResponseDTO converterParaDTO(
            AlunoEntity aluno,
            DisciplinaEntity disciplina) {

        return new DisciplinaResponseDTO(

                disciplina.getName(),
                disciplina.getCode(),
                disciplina.getCredits(),
                disciplina.getVagas(),
                disciplina.getVagasDisponiveis(),
                disciplina.getHorarios()
                        .stream()
                        .map(h ->
                                h.getDiaDaSemana()
                                        + " "
                                        + h.getHoraInicio()
                                        + " - "
                                        + h.getHoraFim()
                        )
                        .toList(),
                disciplina.getMateriasObrigatorias()
                        .stream()
                        .map(DisciplinaEntity::getName)
                        .toList(),
                matriculaServices.calcularStatus(aluno, disciplina)
        );
    }
}

