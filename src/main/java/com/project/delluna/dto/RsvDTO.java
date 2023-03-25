package com.project.delluna.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RsvDTO {
	private int rsv_id,ac_id,rsv_user_max,rsv_user_min;//예약번호,숙소아이디,로그인코드,예약가격,인원최대,인원최소,예약시작날짜,예약끝날짜
	private String rsv_room_name,username,rsv_ac_name,rsv_check_in,rsv_check_out,rsv_price,rsv_start,rsv_end,rsv_ac_thumbnail;
				  //예약객실이름,숙소이름,체크인,체크아웃,숙소사진

}
