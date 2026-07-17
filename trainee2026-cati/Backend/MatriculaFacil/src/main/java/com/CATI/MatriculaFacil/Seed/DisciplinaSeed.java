package com.CATI.MatriculaFacil.Seed;

import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.List;

@Configuration // Spring vai inicializar com esses dados no BD
@Order(1)
public class DisciplinaSeed {

    @Bean
    CommandLineRunner iniciarBD(DisciplinaRepository disciplinaRepository){

        return args -> {

            if(disciplinaRepository.count() == 0){

                DisciplinaEntity calc1 = new DisciplinaEntity();
                calc1.setName("Cálculo 1");
                calc1.setCredits(4);
                calc1.setVagas(60);
                calc1.setCode("CAL101");


                DisciplinaEntity calc2 = new DisciplinaEntity();
                calc2.setName("Cálculo 2");
                calc2.setCredits(4);
                calc2.setVagas(40);
                calc2.setCode("CAL201");
                calc2.setMateriasObrigatorias(List.of(calc1));


                DisciplinaEntity calc3 = new DisciplinaEntity();
                calc3.setName("Cálculo 3");
                calc3.setCredits(4);
                calc3.setVagas(30);
                calc3.setCode("CAL301");
                calc3.setMateriasObrigatorias(List.of(calc2));


                DisciplinaEntity fis1 = new DisciplinaEntity();
                fis1.setName("Física 1");
                fis1.setCredits(4);
                fis1.setVagas(60);
                fis1.setCode("FIS101");


                DisciplinaEntity fis2 = new DisciplinaEntity();
                fis2.setName("Física 2");
                fis2.setCredits(4);
                fis2.setVagas(40);
                fis2.setCode("FIS201");
                fis2.setMateriasObrigatorias(List.of(fis1));


                DisciplinaEntity cap = new DisciplinaEntity();
                cap.setName("Construção de Algoritmos e Programação");
                cap.setCredits(8);
                cap.setVagas(120);
                cap.setCode("COMP101");


                DisciplinaEntity algoritmos = new DisciplinaEntity();
                algoritmos.setName("Algorítmos e Estrutura de Dados");
                algoritmos.setCredits(6);
                algoritmos.setVagas(80);
                algoritmos.setCode("COMP102");
                algoritmos.setMateriasObrigatorias(List.of(cap));


               DisciplinaEntity aed2 = new DisciplinaEntity();
               aed2.setName("Algorítmos e Estrutura de Dados 2");
               aed2.setCredits(4);
               aed2.setVagas(60);
               aed2.setCode("COMP201");
               aed2.setMateriasObrigatorias(List.of(algoritmos));



               disciplinaRepository.saveAll(List.of(calc1,
                       calc2,
                       calc3,
                       fis1,
                       fis2,
                       cap,
                       algoritmos,
                       aed2));




            }
        };
    }
}
