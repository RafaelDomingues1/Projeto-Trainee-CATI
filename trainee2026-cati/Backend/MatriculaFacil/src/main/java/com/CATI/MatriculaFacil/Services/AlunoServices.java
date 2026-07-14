package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Exceptions.UserFoundException;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service//informar que é minha camada de serviço
public class AlunoServices {

    @Autowired // significa que tudo que tiver abaixo, o spring vai ser responsável por instanciar;
    private AlunoRepository alunoRepository;


    public AlunoEntity execute(AlunoEntity alunoEntity){
        this.alunoRepository.findByEmail(alunoEntity.getEmail()).ifPresent((user)-> {
            throw new UserFoundException();
        });

        return this.alunoRepository.save(alunoEntity);

    }

}
