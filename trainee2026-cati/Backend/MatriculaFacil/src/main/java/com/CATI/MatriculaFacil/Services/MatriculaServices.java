package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MatriculaServices {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    DisciplinaRepository disciplinaRepository;

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

        int totalCredits =0;

        for(DisciplinaEntity d : aluno.getDisciplinasMatriculadas()){

            totalCredits += d.getCredits();
        }

        if(totalCredits + disciplina.getCredits() > 24){

            throw new RuntimeException(
                    "Limite de créditos excedido. "
            );
        }


        //TODO verificar confllito de horário




        aluno.getDisciplinasMatriculadas().add(disciplina);

        disciplina.setVagasDisponiveis(disciplina.getVagasDisponiveis()-1);


        alunoRepository.save(aluno);

        disciplinaRepository.save(disciplina);


    }
}
