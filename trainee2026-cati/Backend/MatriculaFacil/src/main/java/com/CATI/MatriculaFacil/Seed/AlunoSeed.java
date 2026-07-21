package com.CATI.MatriculaFacil.Seed;

import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;


@Configuration
@Order(2)
public class AlunoSeed {

    @Bean
    CommandLineRunner iniciarAluno(
            AlunoRepository alunoRepository,
            DisciplinaRepository disciplinaRepository,
            PasswordEncoder passwordEncoder){

        return args -> {

            if(alunoRepository.count() == 0){

                DisciplinaEntity calc1 = disciplinaRepository.findByCode("CAL101").orElseThrow();
                DisciplinaEntity calc2 = disciplinaRepository.findByCode("CAL201").orElseThrow();

                DisciplinaEntity fis1 = disciplinaRepository.findByCode("FIS101").orElseThrow();

                DisciplinaEntity cap = disciplinaRepository.findByCode("COMP101").orElseThrow();

                DisciplinaEntity algoritmos = disciplinaRepository.findByCode("COMP102").orElseThrow();



                AlunoEntity rafael = new AlunoEntity();

                rafael.setName("Rafael Domingues");
                rafael.setEmail("rafael@gmail.com");
                rafael.setPassword(passwordEncoder.encode("1234567890"));
                rafael.setCredits(0);

                rafael.setDisciplinasConcluidas(
                        List.of(calc1, fis1, cap)
                );

                rafael.setDisciplinasMatriculadas(
                        List.of(calc2)
                );



                AlunoEntity maria = new AlunoEntity();

                maria.setName("Maria Silva");
                maria.setEmail("maria@gmail.com");
                maria.setPassword(passwordEncoder.encode("9876543210"));
                maria.setCredits(0);

                maria.setDisciplinasConcluidas(List.of());

                maria.setDisciplinasMatriculadas(List.of());



                AlunoEntity joao = new AlunoEntity();

                joao.setName("João Souza");
                joao.setEmail("joao@gmail.com");
                joao.setPassword(passwordEncoder.encode("joaoOcara1020"));
                joao.setCredits(0);

                joao.setDisciplinasConcluidas(
                        List.of(calc1, fis1)
                );

                joao.setDisciplinasMatriculadas(
                        List.of(algoritmos)
                );



                alunoRepository.saveAll(
                        List.of(rafael, maria, joao)
                );

            }

        };

    }

}