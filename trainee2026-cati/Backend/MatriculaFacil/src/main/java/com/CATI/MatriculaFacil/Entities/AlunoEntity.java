    package com.CATI.MatriculaFacil.Entities;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Email;
    import jakarta.validation.constraints.NotBlank;
    import lombok.Data;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.validator.constraints.Length;

    import java.time.LocalDateTime;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.UUID;

    @Data  //cria os getters e setters para todos os atributos da entidade
    @Entity(name = "Aluno")
    public class AlunoEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;
        @NotBlank (message = "O campo não pode estar em branco") //validação para não ficar em branco
        private String name;
        private Integer credits;
        @Email(message = "O campo (email) deve conter um e-mail válido") //validação para o email conter um email válido
        private String email;

        @Length (min = 10, max = 100, message = "A senha deve conter entre 10 e 100 caracteres")
        private String password;

        @ManyToMany
        @JoinTable(
                name = "aluno_disciplina_concluida",
                joinColumns = @JoinColumn(name = "aluno_id"),
                inverseJoinColumns = @JoinColumn(name = "disciplina_id")
        )
        private List<DisciplinaEntity> disciplinasConcluidas = new ArrayList<>(); //um aluno pode ter varias disciplinas, e as disciplinas podem ter varios alunos

        @ManyToMany
        @JoinTable(
                name = "aluno_disciplina_matriculada",
                joinColumns = @JoinColumn(name = "aluno_id"),
                inverseJoinColumns = @JoinColumn(name = "disciplina_id")
        )
        private List<DisciplinaEntity> disciplinasMatriculadas = new ArrayList<>();

        @ManyToMany
        @JoinTable(
                name = "aluno_disciplina_reprovada",
                joinColumns = @JoinColumn(name = "aluno_id"),
                inverseJoinColumns = @JoinColumn(name = "disciplina_id")
        )
        private List<DisciplinaEntity> disciplinasReprovadas = new ArrayList<>();


        @CreationTimestamp
        private LocalDateTime createdAt;
    }
