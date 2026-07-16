package com.CATI.MatriculaFacil.Controller;

import com.CATI.MatriculaFacil.DTO.AuthAlunoDTO;
import com.CATI.MatriculaFacil.Services.AlunoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthAlunoController {

    @Autowired
    private AlunoServices alunoServices;

    @PostMapping("/aluno")
    public ResponseEntity<Object> create(@RequestBody AuthAlunoDTO authAlunoDTO){
        try{
          var result = this.alunoServices.AuthAluno(authAlunoDTO);
          return ResponseEntity.ok().body(result);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }


    }

}
