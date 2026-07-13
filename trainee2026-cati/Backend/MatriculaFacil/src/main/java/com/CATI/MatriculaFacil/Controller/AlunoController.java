package com.CATI.MatriculaFacil.Controller;


import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aluno")


    public class AlunoController { //quando quer salvar informação coloca no body da requisição, precisa definir objeto o qual vai receber as informações




    @PostMapping("/") //recebe e recupera infomações

    public void create( @Valid @RequestBody AlunoEntity alunoEntity) {
        System.out.println("Aluno");
        System.out.println(alunoEntity.getEmail());

    }


}
