package com.project.delluna.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.delluna.dao.RsvDAO;
import com.project.delluna.dto.RsvDTO;

import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class RsvServiceImp implements RsvService{
	
	@Autowired
	private RsvDAO dao;

	public void setdao(RsvDAO dao) {
		this.dao = dao;
	}

	@Override
	public List<RsvDTO> listProcess(RsvDTO dto) {
		return dao.getRsvList(dto);
	}
	@Override
	public List<RsvDTO> listProcess(String username) {
		return dao.getRsvList(username);
	}

	@Override
	public void insertrsv(RsvDTO dto) {
		dao.insertrsv(dto);
	}

	@Override
	public void delete(int num) {
		dao.rsvDelete(num);
	}

}
