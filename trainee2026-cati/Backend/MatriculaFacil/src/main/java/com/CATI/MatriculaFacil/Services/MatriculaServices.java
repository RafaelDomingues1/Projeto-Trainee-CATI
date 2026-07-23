package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.DTO.DisciplinaResponseDTO;
import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Entities.Horario;
import com.CATI.MatriculaFacil.Enums.StatusDisciplina;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MatriculaServices {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    DisciplinaRepository disciplinaRepository;
    @Transactional
    public void matricular(UUID alunoId, UUID disciplinaId) {

        AlunoEntity aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        DisciplinaEntity disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));


        if (aluno.getDisciplinasConcluidas().contains(disciplina)) {
            throw new RuntimeException("Disciplina já concluída.");
        }

        if(aluno.getDisciplinasMatriculadas().contains(disciplina)){
            throw new RuntimeException("Aluno já matriculado.");
        }

        for (DisciplinaEntity prerequisito : disciplina.getMateriasObrigatorias()){

            if(!aluno.getDisciplinasConcluidas().contains(prerequisito)){
                throw new RuntimeException(
                        "Pré requisito não concluído: " + prerequisito.getName()
                );
            }
        }

        if (disciplina.getVagasDisponiveis() <= 0){

            throw new RuntimeException(
                    "Não existem vagas"
            );
        }

        int totalCredits = calcularCreditosAtuais(aluno);

        if (totalCredits + disciplina.getCredits() > 24) {
            throw new RuntimeException(
                    "Limite de créditos excedido."
            );
        }

        if (possuiConflitoHorario(aluno, disciplina)) {

            throw new RuntimeException(
                    "A disciplina possui conflito de horário com uma matéria já inscrita."
            );
        }

        aluno.getDisciplinasMatriculadas().add(disciplina);

        disciplina.setVagasDisponiveis(disciplina.getVagasDisponiveis()-1);


        alunoRepository.save(aluno);

        disciplinaRepository.save(disciplina);


    }


    public List<DisciplinaResponseDTO> listarMatriculas(UUID alunoId){

        AlunoEntity aluno = alunoRepository.findById(alunoId).
                orElseThrow( () ->
                        new RuntimeException("Aluno não encontrado"));

        return aluno.getDisciplinasMatriculadas()
                .stream()
                .map(d ->new DisciplinaResponseDTO(

                        d.getName(),
                        d.getCode(),
                        d.getCredits(),
                        d.getVagas(),
                        d.getVagasDisponiveis(),
                        d.getHorarios()
                                .stream()
                                .map(h -> h.getDiaDaSemana()
                                        + " "
                                        + h.getHoraInicio()
                                        + "-"
                                        + h.getHoraFim())
                                .toList(),
                        d.getMateriasObrigatorias()
                                .stream()
                                .map(DisciplinaEntity::getName)
                                .toList(),
                        calcularStatus(aluno, d)
                ))
                .toList();
    }
    @Transactional // se falhar, a transição inteira é revertida
    public void cancelar (UUID alunoId, UUID disciplinaId) {

        AlunoEntity aluno = alunoRepository.findById(alunoId).
                orElseThrow( () -> new RuntimeException("Aluno não encontrado"));

                DisciplinaEntity disciplina = disciplinaRepository.findById(disciplinaId).
        orElseThrow( () -> new RuntimeException("Disciplina não encontrada"));

        if(!aluno.getDisciplinasMatriculadas()
                .contains(disciplina)) {

            throw new RuntimeException(
                    "Aluno não está matriculado nessa disciplina"
            );
        }

        aluno.getDisciplinasMatriculadas().remove(disciplina);

        disciplina.setVagasDisponiveis(
                disciplina.getVagasDisponiveis() + 1
        );
    }

    private int calcularCreditosAtuais(
            AlunoEntity aluno) {

        return aluno.getDisciplinasMatriculadas()
                .stream()
                .mapToInt(
                        DisciplinaEntity::getCredits
                )
                .sum();
    }

    private boolean possuiConflitoHorario(
            AlunoEntity aluno,
            DisciplinaEntity disciplinaNova) {

        return aluno.getDisciplinasMatriculadas()
                .stream()
                .anyMatch(matriculada ->

                        matriculada.getHorarios()
                                .stream()
                                .anyMatch(horarioAluno ->

                                        disciplinaNova.getHorarios()
                                                .stream()
                                                .anyMatch(horarioNovo ->

                                                        horarioAluno
                                                                .getDiaDaSemana()
                                                                == horarioNovo
                                                                .getDiaDaSemana()

                                                                &&

                                                                horarioAluno
                                                                        .getHoraInicio()
                                                                        .isBefore(
                                                                                horarioNovo
                                                                                        .getHoraFim()
                                                                        )

                                                                &&

                                                                horarioNovo
                                                                        .getHoraInicio()
                                                                        .isBefore(
                                                                                horarioAluno
                                                                                        .getHoraFim()
                                                                        )
                                                )
                                )
                );
    }

    public StatusDisciplina calcularStatus(AlunoEntity aluno, DisciplinaEntity disciplina){

        if(aluno.getDisciplinasConcluidas().contains(disciplina)) {

            return StatusDisciplina.CONCLUIDA;
        }

        if(aluno.getDisciplinasMatriculadas().contains(disciplina)) {

            return StatusDisciplina.INSCRITA;
        }

        if(aluno.getDisciplinasReprovadas().contains(disciplina)) {

            return StatusDisciplina.REPROVADA;
        }

        boolean possuiPrerequisitos =   aluno.getDisciplinasConcluidas().containsAll(disciplina.getMateriasObrigatorias());


        if(!possuiPrerequisitos) {
            return StatusDisciplina.INDISPONIVEL;
        }

        if (disciplina.getVagasDisponiveis() <= 0) {

            return StatusDisciplina.INDISPONIVEL;
        }

        int creditosAtuais =
                calcularCreditosAtuais(aluno);

        if (creditosAtuais
                + disciplina.getCredits() > 24) {

            return StatusDisciplina.INDISPONIVEL;
        }

            if (possuiConflitoHorario(
                    aluno,
                    disciplina)) {

                return StatusDisciplina.INDISPONIVEL;
            }


        return StatusDisciplina.DISPONIVEL;
    }

}


