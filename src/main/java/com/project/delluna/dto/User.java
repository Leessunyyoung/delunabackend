package com.project.delluna.dto;

import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Component
@ToString
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "login")
public class User {
    @Id // primary key
    @Column(name = "username")
    private String username;
    private String password;
    private String email;
    private String nickname;
    private String authRole;  //ROLE_USER, ROLE_ADMIN

    // OAuth2
//    private String provider;
//    private String providerId;
}
