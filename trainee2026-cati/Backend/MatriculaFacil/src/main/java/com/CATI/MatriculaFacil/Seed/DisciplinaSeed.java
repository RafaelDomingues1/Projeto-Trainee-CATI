package com.CATI.MatriculaFacil.Seed;

import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Entities.Horario;
import com.CATI.MatriculaFacil.Repositories.DisciplinaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Configuration // Spring vai inicializar com esses dados no BD
@Order(1)
public class DisciplinaSeed {

    private Horario criarHorario(

            DayOfWeek dia,
            int horaInicio,
            int horaFim) {

        Horario horario = new Horario();
        horario.setDiaDaSemana(dia);
        horario.setHoraInicio(LocalTime.of(horaInicio, 0));
        horario.setHoraFim(LocalTime.of(horaFim, 0));

        return horario;
    }
    @Bean
    CommandLineRunner iniciarBD(DisciplinaRepository disciplinaRepository){

        return args -> {

            if(disciplinaRepository.count() == 0){

                DisciplinaEntity calc1 = new DisciplinaEntity();
                calc1.setName("Cálculo 1");
                calc1.setCredits(4);
                calc1.setVagas(60);
                calc1.setVagasDisponiveis(60);
                calc1.setCode("CAL101");
                calc1.setHorarios(List.of(
                        criarHorario(DayOfWeek.MONDAY, 8, 10),
                        criarHorario(DayOfWeek.WEDNESDAY, 8, 10)));


                DisciplinaEntity calc2 = new DisciplinaEntity();
                calc2.setName("Cálculo 2");
                calc2.setCredits(4);
                calc2.setVagas(40);
                calc2.setVagasDisponiveis(35);
                calc2.setCode("CAL201");
                calc2.setMateriasObrigatorias(List.of(calc1));
                calc2.setHorarios(List.of(
                        criarHorario(DayOfWeek.TUESDAY, 8, 10),
                        criarHorario(DayOfWeek.THURSDAY, 8, 10)));


                DisciplinaEntity calc3 = new DisciplinaEntity();
                calc3.setName("Cálculo 3");
                calc3.setCredits(4);
                calc3.setVagas(30);
                calc3.setVagasDisponiveis(20);
                calc3.setCode("CAL301");
                calc3.setMateriasObrigatorias(List.of(calc2));
                calc3.setHorarios(List.of(
                        criarHorario(DayOfWeek.TUESDAY, 10, 12),
                        criarHorario(DayOfWeek.THURSDAY, 10, 12)));


                DisciplinaEntity fis1 = new DisciplinaEntity();
                fis1.setName("Física 1");
                fis1.setCredits(4);
                fis1.setVagas(60);
                fis1.setVagasDisponiveis(2);
                fis1.setCode("FIS101");
                fis1.setHorarios(List.of(
                        criarHorario(DayOfWeek.MONDAY, 8, 10),
                        criarHorario(DayOfWeek.WEDNESDAY, 8, 10)));


                DisciplinaEntity fis2 = new DisciplinaEntity();
                fis2.setName("Física 2");
                fis2.setCredits(4);
                fis2.setVagas(40);
                fis2.setVagasDisponiveis(30);
                fis2.setCode("FIS201");
                fis2.setMateriasObrigatorias(List.of(fis1));
                fis2.setHorarios(List.of(
                        criarHorario(DayOfWeek.MONDAY, 10, 12),
                        criarHorario(DayOfWeek.WEDNESDAY, 10, 12)));


                DisciplinaEntity cap = new DisciplinaEntity();
                cap.setName("Construção de Algoritmos e Programação");
                cap.setCredits(8);
                cap.setVagas(120);
                cap.setVagasDisponiveis(120);
                cap.setCode("COMP101");
                cap.setHorarios(List.of(
                        criarHorario(DayOfWeek.TUESDAY, 8, 12),
                        criarHorario(DayOfWeek.THURSDAY, 8, 12)));


                DisciplinaEntity algoritmos = new DisciplinaEntity();
                algoritmos.setName("Algorítmos e Estrutura de Dados");
                algoritmos.setCredits(6);
                algoritmos.setVagas(80);
                algoritmos.setVagasDisponiveis(0);
                algoritmos.setCode("COMP102");
                algoritmos.setMateriasObrigatorias(List.of(cap));
                algoritmos.setHorarios(List.of(
                        criarHorario(DayOfWeek.MONDAY, 10, 12),
                        criarHorario(DayOfWeek.WEDNESDAY, 10, 14)));


               DisciplinaEntity aed2 = new DisciplinaEntity();
               aed2.setName("Algorítmos e Estrutura de Dados 2");
               aed2.setCredits(4);
               aed2.setVagas(60);
               aed2.setVagasDisponiveis(30);
               aed2.setCode("COMP201");
               aed2.setMateriasObrigatorias(List.of(algoritmos));
               aed2.setHorarios(List.of(
                       criarHorario(DayOfWeek.MONDAY, 14, 16),
                       criarHorario(DayOfWeek.WEDNESDAY, 14, 16)));



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
