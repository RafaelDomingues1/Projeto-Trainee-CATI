package com.CATI.MatriculaFacil.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration //essa classe vai ser uma classe de configuração que eu quero que o spring gerencie
public class SecurityConfig {


    @Autowired
    private SecurityFilter securityFilter;


    @Bean //indica que um méto do dentro da classe está sendo utilizado para indicar que um méto do está sendo utilizado
    //para definir algum objeto já gerenciado pelo spring
    SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception{
        http.csrf(csrf->csrf.disable())
                .authorizeHttpRequests(auth ->{
                    auth.requestMatchers("/aluno/").permitAll(); //na rota aluno permite todos
                    auth.requestMatchers("/auth/aluno").permitAll();//na rota auth aluno permite todos

                    auth.anyRequest().authenticated();

                })
                .addFilterBefore(securityFilter, BasicAuthenticationFilter.class);

        ;
        return http.build();

    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(); //criptografa as senhas para que quando elas forem geradas no banco de dados elas estejam ok
    }
}
