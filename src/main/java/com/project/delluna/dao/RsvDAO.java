package com.project.delluna.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.project.delluna.dto.RsvDTO;



@Mapper
@Repository
public interface RsvDAO {
	public List<RsvDTO> getRsvList(RsvDTO dto);
	public List<RsvDTO> getRsvList(String username);
	public void insertrsv(RsvDTO dto);
	public void rsvDelete(int num);

}
