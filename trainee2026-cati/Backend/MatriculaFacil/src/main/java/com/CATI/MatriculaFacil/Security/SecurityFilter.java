package com.CATI.MatriculaFacil.Security;


import com.CATI.MatriculaFacil.Services.JWTProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private JWTProvider jwtProvider;
    @Override
    protected void doFilterInternal(HttpServletRequest request, //tudo que vier da minha requisição eu vou receber
                                    HttpServletResponse response, //tudo que eu quiser mandar pra outras camadas eu mando no respose
                                    FilterChain filterChain) //outras configurações
            throws ServletException, IOException {
            SecurityContextHolder.getContext().setAuthentication(null); //seta como nulo pois vai que fique alguma sujeira
            String header = request.getHeader("Authorization");

                if (header != null) {

                   var subjectToken = this.jwtProvider.validateToken(header);

                   if(subjectToken.isEmpty()){
                       response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                       return;
                   }

                   request.setAttribute("Aluno_id",subjectToken);
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(subjectToken,null, Collections.emptyList());

                    SecurityContextHolder.getContext().setAuthentication(auth); //durante all o fluxo de requisições, o spring security
                                                                                //ir validando as informações



                }

                filterChain.doFilter(request,response);

    }
}
