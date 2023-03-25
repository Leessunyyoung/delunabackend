package com.project.delluna.controller;

import com.project.delluna.config.auth.PrincipalDetails;
import com.project.delluna.dto.User;
import com.project.delluna.repository.UserRepository;
import com.project.delluna.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class LoginController {
    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Secured("ADMIN")
    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "어드민 페이지입니다.";
    }


    @PostMapping("/join")
    public String joinProc(@RequestBody User user){
        System.out.println("가입요청- " + "ID: " + user.getUsername() + ", PW: " + user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUserProcess(user);
        return "회원가입 완료";
    }

    // username(아이디) 중복검사
    @PostMapping("/join/checkid")
    @ResponseBody
    public boolean CheckUsername(String username){
    	System.out.println("username : " + username);
    	System.out.println("checkId : " + userService.CheckUsernameProcess(username));
        if (username.equals(userService.CheckUsernameProcess(username))){
            return true;
        }else {
            return false;
        }
    }

    // nickname(닉네임) 중복검사
    @PostMapping("/join/checknick")
    @ResponseBody
    public boolean CheckNickname(String nickname){
        if (nickname.equals(userService.CheckNicknameProcess(nickname))){
            return true;
        }else {
            return false;
        }
    }
    
    // email(이메일) 중복검사
    @PostMapping("/join/checkemail")
    @ResponseBody
    public boolean CheckEmail(String email){
        if (email.equals(userService.CheckEmailProcess(email))){
            return true;
        }else {
            return false;
        }
    }

    // 회원탈퇴
    @PostMapping("/user/delete")
    @ResponseBody
    public int DeleteUser(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestParam("password")String password){
        if (passwordEncoder.matches(password, principalDetails.getUser().getPassword())){
        	userService.DeleteUserProcess(principalDetails.getUser().getUsername());
            return 1;
            		
        }
        return 0;
    }
}
