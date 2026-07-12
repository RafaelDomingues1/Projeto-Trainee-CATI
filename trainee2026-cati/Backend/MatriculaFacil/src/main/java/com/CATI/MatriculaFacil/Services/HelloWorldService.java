package com.CATI.MatriculaFacil.Services;

import org.springframework.stereotype.Service;

//aqui ficam as regras de negócio
@Service //mostra para o spring que isso é uma classe de services
public class HelloWorldService {

    public String helloWorld(String name) {

        return "Hello, World! " + name;
    }
}
