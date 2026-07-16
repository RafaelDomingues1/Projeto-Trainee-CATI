package com.CATI.MatriculaFacil.Services;

import com.CATI.MatriculaFacil.DTO.AuthAlunoDTO;
import com.CATI.MatriculaFacil.Entities.AlunoEntity;
import com.CATI.MatriculaFacil.Exceptions.UserFoundException;
import com.CATI.MatriculaFacil.Repositories.AlunoRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service//informar que é minha camada de serviço
public class AlunoServices {

    @Value("${security.token.secret}")//passar alguma propriedade do application proprierty
    private String secretKey;

    @Autowired // significa que tudo que tiver abaixo, o spring vai ser responsável por instanciar;
    private AlunoRepository alunoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;




    public AlunoEntity execute(AlunoEntity alunoEntity){
        this.alunoRepository.findByEmail(alunoEntity.getEmail()).ifPresent((user)-> {
            throw new UserFoundException();
        });
        var password = passwordEncoder.encode(alunoEntity.getPassword());
        alunoEntity.setPassword(password);

        return this.alunoRepository.save(alunoEntity);
    }
    public String AuthAluno(AuthAlunoDTO authAlunoDTO){
        var aluno = this.alunoRepository.findByEmail(authAlunoDTO.getEmail()).orElseThrow(
                ()->{
                    throw new UsernameNotFoundException("Email ou senha não encontrados");
                }); //se nao existir manda isso

        //se existir, deve verificar se senhas são igual
       var passwordMatches =  this.passwordEncoder.matches(authAlunoDTO.getPassword(), aluno.getPassword());
        //se não for igual -> retorna erro
       if(!passwordMatches){
           throw new BadCredentialsException("Email ou senha não encontrados");
           }
        //se for igual -> gerar o token
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var token = JWT.create().withIssuer("aluno")
                .withSubject(aluno.getId().toString())
                .sign(algorithm);
                return token
                ;
       }



    }


