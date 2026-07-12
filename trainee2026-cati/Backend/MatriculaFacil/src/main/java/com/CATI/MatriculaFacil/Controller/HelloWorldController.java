    package com.CATI.MatriculaFacil.Controller;

    import com.CATI.MatriculaFacil.Services.HelloWorldService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.Map;

    @RestController//indica que essa classe é um controlador rest , combinando @controller e @responsebody
    //stateless->token , a cada nova requisição, recebe as informações que eu preciso para fazer aquela funcionalidade ,
    // statefull -> mantém o estado de cada cliente no servidor
    @RequestMapping("/hello-world")
    public class HelloWorldController {


        @GetMapping("/primeiroMetodo/{id}") //operação get
        public String helloWorld(@PathVariable String id) {
            return "o parâmetro é: " + id;

        }

        @GetMapping("/metodoComQueryParams")
        public String metodoComQueryParams(@RequestParam String id) {
            return "o parametro com Query Params é: " + id;
        }

        @GetMapping("/metodoComQueryParams2")
        public String metodoComQueryParams2(@RequestParam Map<String, String> allParams) {
            return "o parãmetro com Query Params 2 é: " + allParams.entrySet();
        }

        @PostMapping("/metodoComBodyParams")

        public String metodoComBodyParams(@RequestBody Usuario usuario) {
            return "metodoComBodyParams " + usuario.username;
        }

        record Usuario(String username){}

        @PostMapping("/metodoComHeaderParams")

        public String metodoComHeaderParams(@RequestHeader ("name") String name) {
            return "metodoComHeaders " + name;
        }

        @PostMapping("/metodoComListHeaderParams")

        public String metodoComListHeaderParams(@RequestHeader Map <String,String> headers) {
            return "metodoComHeaders " + headers.entrySet();
        }
        @GetMapping("/metodoResponseEntity/{id}")
        public ResponseEntity<Object> metodoResponseEntity(@PathVariable long id){ //quando precisa de mais de um status para requisição
                var usuario = new Usuario("Rafael");

                if (id > 5){
                    return ResponseEntity.status(HttpStatus.OK).body(usuario);
                }
                return ResponseEntity.badRequest().body("Número menor que 5");

        }


    }