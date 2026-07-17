package com.CATI.MatriculaFacil.Controller;

import com.CATI.MatriculaFacil.DTO.MatriculaDTO;
import com.CATI.MatriculaFacil.Services.MatriculaServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/matricula")
public class MatriculaController {

    @Autowired
    private MatriculaServices matriculaServices;

    @PostMapping("/")
    public ResponseEntity<?> matricular(@RequestBody MatriculaDTO dto,
                                        HttpServletRequest request){

        UUID alunoID = UUID.fromString(request.getAttribute("Aluno_id").toString());

        matriculaServices.matricular(alunoID,dto.getDisciplinaId());

        return  ResponseEntity.ok("Matrícula Realizada");

    }


}
