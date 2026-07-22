package com.CATI.MatriculaFacil.Controller;


import com.CATI.MatriculaFacil.DTO.DisciplinaResponseDTO;
import com.CATI.MatriculaFacil.Entities.DisciplinaEntity;
import com.CATI.MatriculaFacil.Services.DisciplinaServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<List<DisciplinaResponseDTO>> listar(){

        return ResponseEntity.ok(disciplinaServices.listar());
    }

}





