package com.project.delluna.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.delluna.dto.RsvDTO;


@Service
public interface RsvService {
	public List<RsvDTO> listProcess(RsvDTO dto);
	public List<RsvDTO> listProcess(String username);
	public void insertrsv(RsvDTO dto);
	public void delete(int num);
}
