package com.project.delluna.config.auth;

import com.project.delluna.dto.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;


// Authentication 객체에 저장할 수 있는 유일한 타입
public class PrincipalDetails implements UserDetails {
    
    private User user;
    
    public PrincipalDetails() {
		// TODO Auto-generated constructor stub
	}
    
    public PrincipalDetails(User user){
        this.user = user;
    }
    
    @Override  // 권한
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<GrantedAuthority>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getAuthRole();
            }
        });
        return collection;
    }
    public User getUser() {
        return user;
    }

    @Override
    public String getPassword() {
        // 비밀번호
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // 이름(username 값)
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        // 계정만료여부 리턴-true(만료안됨)
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // 계정의 잠김여부 리턴-true(잠기지 않음)
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // 비밀번호 만료 여부 리턴-true(만료안됨)
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 계정의 활성화 여부 리턴-true(활성화됨)
        // 휴먼계정 설정할 때 사용함
        return true;
    }
}
