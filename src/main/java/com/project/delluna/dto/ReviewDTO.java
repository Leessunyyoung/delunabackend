package com.project.delluna.dto;

import org.springframework.stereotype.Component;

// 개발자가 직접 작성한 Class를 Bean으로 등록하기 위한 어노테이션
@Component
public class ReviewDTO {
	private int rev_id, ac_id, rev_rating;
	private String rev_writer, rev_content, rev_created_date,username;
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public ReviewDTO() {
		// TODO Auto-generated constructor stub
	}

	public int getRev_id() {
		return rev_id;
	}

	public void setRev_id(int rev_id) {
		this.rev_id = rev_id;
	}

	public int getAc_id() {
		return ac_id;
	}

	public void setAc_id(int ac_id) {
		this.ac_id = ac_id;
	}

	public int getRev_rating() {
		return rev_rating;
	}

	public void setRev_rating(int rev_rating) {
		this.rev_rating = rev_rating;
	}

	public String getRev_writer() {
		return rev_writer;
	}

	public void setRev_writer(String rev_writer) {
		this.rev_writer = rev_writer;
	}

	public String getRev_content() {
		return rev_content;
	}

	public void setRev_content(String rev_content) {
		this.rev_content = rev_content;
	}

	public String getRev_created_date() {
		return rev_created_date;
	}

	public void setRev_created_date(String rev_created_date) {
		this.rev_created_date = rev_created_date;
	}


}
