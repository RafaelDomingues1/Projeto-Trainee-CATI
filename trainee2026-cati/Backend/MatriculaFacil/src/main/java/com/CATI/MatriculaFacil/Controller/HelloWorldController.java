package com.CATI.MatriculaFacil.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController//indica que essa classe é um controlador rest , combinando @controller e @responsebody
//stateless->token , a cada nova requisição, recebe as informações que eu preciso para fazer aquela funcionalidade ,
// statefull -> mantém o estado de cada cliente no servidor
@RequestMapping("/hello-world")
public class HelloWorldController {
    @GetMapping
    public String helloWorld(){
        return "Hello World!";
    }

}
