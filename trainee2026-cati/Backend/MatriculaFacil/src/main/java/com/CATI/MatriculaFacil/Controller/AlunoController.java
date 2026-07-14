package com.CATI.MatriculaFacil.Controller;


import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Services.AlunoServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aluno")


    public class AlunoController { //quando quer salvar informação coloca no body da requisição, precisa definir objeto o qual vai receber as informações

    @Autowired //toda vez que quero injetar dependencia
    private AlunoServices alunoServices;


    @PostMapping("/") //recebe e recupera infomações

    public ResponseEntity<Object> create(@Valid @RequestBody AlunoEntity alunoEntity) {
        try {
          var result =this.alunoServices.execute(alunoEntity);
          return ResponseEntity.ok().body(result);
        }catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
