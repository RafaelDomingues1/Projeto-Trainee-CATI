    package com.CATI.MatriculaFacil.Entities;

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.validation.constraints.Email;
    import jakarta.validation.constraints.NotBlank;
    import lombok.Data;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.validator.constraints.Length;

    import java.time.LocalDateTime;
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

        @CreationTimestamp
        private LocalDateTime createdAt;
    }
