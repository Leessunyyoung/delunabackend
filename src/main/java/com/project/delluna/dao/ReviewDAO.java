package com.project.delluna.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.project.delluna.dto.ReviewDTO;


// interface를 매퍼로 등록하기 위해서 사용
@Mapper
// 외부 I/O처리 (퍼시스턴스 레이어, DB나 파일같은 외부 I/O작업을 처리함
@Repository
public interface ReviewDAO {
	public List<ReviewDTO> getReviewList(int ac_id);
	public void reviewSave(ReviewDTO dto);
	public void reviewUpdate(ReviewDTO dto);
	public void reviewDelete(int num);

}
