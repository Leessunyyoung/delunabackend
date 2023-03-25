package com.project.delluna.service;

import com.project.delluna.dto.User;
import com.project.delluna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // 유저 전체 조회
    public List<User> getAllProcess(){
        return userRepository.getAll();
    }
    
    // 유저 정보 저장
    public void saveUserProcess(User user) {
    	userRepository.saveUser(user);
    }
    
    // username(아이디) 중복검사
    public String CheckUsernameProcess(String username){
            return userRepository.CheckUsername(username);
    }

    // Nickname 중복검사
    public String CheckNicknameProcess(String nickname){
            return userRepository.CheckNickname(nickname);
    }

    // email 중복검사
    public String CheckEmailProcess(String email){
            return userRepository.CheckEmail(email);
    }

    
    // 회원탈퇴
    public void DeleteUserProcess(String username){
        userRepository.DeleteUser(username);
    }
}
