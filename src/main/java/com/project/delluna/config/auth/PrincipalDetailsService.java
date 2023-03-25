package com.project.delluna.config.auth;

import com.project.delluna.dto.User;
import com.project.delluna.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


// 1. AuthenticationProvider 에서 loadUserByUsername(String username)을 호출한다.
// 2. loadUserByUsername(String username)에서는 DB에서 username에 해당하는 데이터를 검색해서 UserDetails에 담아서 리턴해준다.
// 3. AuthenticationProvider에서 UserDetailes받아서 Authentication에 저장을 함으로써 결국 Security Session에 저장을 한다.
@Service
public class PrincipalDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    //SecurityConfig(시큐리티 설정)에서 loginProcessingUrl("/login")요청을 하면
    //loadUserByUsername(String username) 메소드가 실행된다.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserAccount(username);
        System.out.println("DB에서 유저 확인 중 PrincipalDetailsService > loadUserByUsername 실행");
        System.out.println("접근 권한: " + user.getAuthRole());
        System.out.println("ID: " + user.getUsername() + ", NICKNAME: " + user.getNickname() + ", EMAIL: " + user.getEmail());
        if (user == null){
        	throw new UsernameNotFoundException(username);
//            return null;
        }else {
            return  new PrincipalDetails(user);
        }
    }
}
