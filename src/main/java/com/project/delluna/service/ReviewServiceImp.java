package com.project.delluna.service;

import com.project.delluna.dao.ReviewDAO;
import com.project.delluna.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// 비즈니스 로직이나 repository layer 호출하는 함수에 사용
@Service
public class ReviewServiceImp implements ReviewService {

	// 필요한 의존 객체의 "타입"에 해당하는 빈을 찾아 주입한다.
	// 생성자, setter, 필드
	@Autowired
	private ReviewDAO dao;

	public ReviewServiceImp() {

	}

	public void setDao(ReviewDAO dao) {
		this.dao = dao;
	}

	@Override
	public List<ReviewDTO> listProcess(int ac_id) {
		return dao.getReviewList(ac_id);
	}

	@Override
	public void insertProcess(ReviewDTO dto) {
		dao.reviewSave(dto);
	}

	@Override
	public void updateProcess(ReviewDTO dto) {
		dao.reviewUpdate(dto);
	}

	@Override
	public void deleteProcess(int num) {
		dao.reviewDelete(num);

	}

//	@Override
//	public ReviewDTO contentProcess(int num) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public ReviewDTO updateSelectProcess(int num) {
//		// TODO Auto-generated method stub
//		return null;
//	}


}
	
