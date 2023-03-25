package com.project.delluna.repository;

import com.project.delluna.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface UserRepository {
    void saveUser(User user); // 회원가입
    User getUserAccount(String username); // 로그인
    List<User> getAll(); // 전체 멤버 가져오기
    String CheckUsername(String username); // username(아이디) 중복검사
    String CheckNickname(String nickname); // nickname 중복검사
    String CheckEmail(String email); // email 중복검사
    void DeleteUser(String username); // 회원탈퇴
}
