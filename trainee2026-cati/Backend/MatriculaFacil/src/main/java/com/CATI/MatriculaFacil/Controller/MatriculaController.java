package com.CATI.MatriculaFacil.Controller;

import com.CATI.MatriculaFacil.DTO.MatriculaDTO;
import com.CATI.MatriculaFacil.Services.MatriculaServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/matricula")
public class MatriculaController {

    @Autowired
    private MatriculaServices matriculaServices;

    @Transactional //se a parte falhar, a operação é revertida
    @PostMapping("/")
    public ResponseEntity<?> matricular(@RequestBody MatriculaDTO dto,
                                        HttpServletRequest request){

        UUID alunoID = UUID.fromString(request.getAttribute("Aluno_id").toString());

        matriculaServices.matricular(alunoID,dto.getDisciplinaId());

        return  ResponseEntity.ok("Matrícula Realizada");

    }
    @GetMapping("/")
    public ResponseEntity<?> listarMatriculas(HttpServletRequest request){

        UUID alunoid = UUID.fromString(request.getAttribute("Aluno_id").toString());

       return ResponseEntity.ok(matriculaServices.listarMatriculas(alunoid));
    }

    @DeleteMapping("/{disciplinaId}")
    public ResponseEntity<?> cancelar(@PathVariable UUID disciplinaId,
                                      HttpServletRequest request) {

        UUID alunoId = UUID.fromString(
                request.getAttribute("Aluno_id").toString()
        );

        matriculaServices.cancelar(alunoId,disciplinaId);

        return ResponseEntity.ok("Matrícula cancelada");
    }

}
