package com.CATI.MatriculaFacil.Exceptions;

import com.CATI.MatriculaFacil.DTO.ErrorMessageDTO;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;


@ControllerAdvice
public class ExceptionHandlerController {

    private MessageSource messageSource; // faz o mapeamento da mensagem

    public ExceptionHandlerController(MessageSource messageSource) { //fazer isso para o spring não colocar isso como nulo
        this.messageSource = messageSource;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorMessageDTO>> handleMethodNotValidException(MethodArgumentNotValidException exception){

        List<ErrorMessageDTO> dto = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(err->{ // vai ter acesso a todos os erros que capturar

            String message = messageSource.getMessage(err, LocaleContextHolder.getLocale());
               ErrorMessageDTO  error =  new ErrorMessageDTO(message , err.getField());
                dto.add(error);

        });

        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorMessageDTO>
    handleRuntimeException(
            RuntimeException exception
    ) {

        ErrorMessageDTO erro =
                new ErrorMessageDTO(
                        exception.getMessage(),
                        null
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(erro);
    }
}


