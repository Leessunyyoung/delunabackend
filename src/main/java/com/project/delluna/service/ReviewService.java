package com.project.delluna.service;

import com.project.delluna.dto.ReviewDTO;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ReviewService {
	public List<ReviewDTO> listProcess(int ac_id);
	public void insertProcess(ReviewDTO dto);
	public void updateProcess(ReviewDTO dto);
	public void deleteProcess(int num);
}
