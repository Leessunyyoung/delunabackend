package com.project.delluna.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.project.delluna.config.auth.PrincipalDetails;
import com.project.delluna.dto.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//POST    http://localhost:8090/login

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authManager;

	public JwtAuthenticationFilter(AuthenticationManager authManager) {
		this.authManager = authManager;
	}

	// http://localhost:8090/login 요청을 하면 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("login 요청");

		try {
			ObjectMapper om = new ObjectMapper();
			// username, password를 request로 받아서, class에 저장 -> user.class 객체를 앞에 선언한 user에 리턴
			User user = om.readValue(request.getInputStream(), User.class);
			System.out.println("로그인 요청한 회원- " + "ID: " + user.getUsername() + " PW: " + user.getPassword());

			// 객체 토큰값 저장
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
					user.getUsername(), user.getPassword());
			System.out.println("객체 토큰값 저장: " + authenticationToken);

			// 인증 단계
			Authentication authentication = authManager.authenticate(authenticationToken);
			System.out.println("인증 단계: " + authentication);

			// 인증 된 값 가져옴
			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			System.out.println("로그인 완료(인증 완료)! 로그인 된 회원 닉네임: " + principalDetails.getUser().getNickname());
			return authentication;

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		System.out.println("JwtAuthenticationFilter > successfulAuthentication 실행(로그인 인증 완료)");
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

		// RSA방식은 아니고 Hash방식
		String jwtToken = JWT.create().withSubject("mycos")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 3 * 1L))) // 3분
				.withClaim("username", principalDetails.getUser().getUsername())
				.withClaim("authRole", principalDetails.getUser().getAuthRole())
				.sign(Algorithm.HMAC512("mySecurityCos"));
		System.out.println("발급된 Token: " + jwtToken);

		// Authorization : 토큰값 - 토큰값은 헤더로 보냄
		response.addHeader("Authorization", "Bearer " + jwtToken);

		final Map<String, Object> body = new HashMap<String, Object>();
		// HashMap - 이름값은 바디로 보냄
		body.put("username", principalDetails.getUser().getUsername());

		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	}

}
