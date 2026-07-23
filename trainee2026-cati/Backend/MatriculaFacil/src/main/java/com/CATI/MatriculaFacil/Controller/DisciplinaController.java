package com.CATI.MatriculaFacil.Controller;


import com.CATI.MatriculaFacil.DTO.DisciplinaResponseDTO;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Services.DisciplinaServices;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {

    @Autowired
    private DisciplinaServices disciplinaServices;

    @PostMapping("/")
    public ResponseEntity<Object> create(@Valid @RequestBody DisciplinaEntity disciplinaEntity) {
        try {
            var result = this.disciplinaServices.execute(disciplinaEntity);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/")
    public ResponseEntity<List<DisciplinaResponseDTO>> listar(HttpServletRequest request){

        UUID alunoId = UUID.fromString(
                request.getAttribute("Aluno_id").toString()
        );

        return ResponseEntity.ok(disciplinaServices.listar(alunoId));
    }

}





