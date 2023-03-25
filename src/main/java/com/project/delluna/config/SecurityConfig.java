package com.project.delluna.config;

import com.project.delluna.config.jwt.JwtAuthenticationFilter;
import com.project.delluna.config.jwt.JwtAuthorizationFilter;
import com.project.delluna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {
    @Autowired
    private UserRepository userReposiroty;
    @Autowired
    private CorsConfig corsConfig;

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        // 세션끄기 : JWT를 사용하기 때문에 세션을 사용하지 않는다.
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.httpBasic().disable();
//        http.formLogin().disable();
        http.apply(new MyCustomerFilter()); // 커스텀 필터 등록

        http.authorizeRequests() // 페이지 권한 설정
                        .antMatchers("/user/**").authenticated() // 로그인만 되면 누구나 들어갈 수 있는 주소
                        .antMatchers("/admin/**").hasRole("ADMIN") // ADMIN 권한자만 접근 가능
                        .anyRequest().permitAll();

        http.formLogin() // Form 로그인 설정
                .loginPage("/login")
                .loginProcessingUrl("/loginProc")
                .defaultSuccessUrl("/");

//        http.oauth2Login() // 소설 로그인 설정
//                .loginPage("/login")
//                .userInfoEndpoint()
//                .userService(principalOauth2UserService);

        return http.build();
    }

    public class MyCustomerFilter extends AbstractHttpConfigurer<MyCustomerFilter, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http.addFilter(corsConfig.corsFilter()) // @CrossOrigin(인증 X), Security Filter에 등록 인증(O)
                    .addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userReposiroty));
        }
    }
}
