package com.project.delluna.dao;

import com.project.delluna.dto.ACTagDTO;
import com.project.delluna.dto.AC_ServiceDTO;
import com.project.delluna.dto.AccommodationDTO;
import com.project.delluna.dto.GRDTO;
import com.project.delluna.dto.ReviewDTO;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface AccommodationDAO {
	
	public List<AccommodationDTO> getList() throws Exception;
	public AccommodationDTO selectAC(int ac_id) throws Exception;
	public List<AC_ServiceDTO> selectServiceTags(int ac_id) throws Exception;
	public List<AC_ServiceDTO> selectServiceTags2() throws Exception;
	public List<GRDTO> selectGR(int ac_id) throws Exception;
	public List<GRDTO> selectGR2(int ac_id) throws Exception;
	public List<GRDTO> listGR() throws Exception;
	public List<ReviewDTO> selectRv() throws Exception;
	public List<ACTagDTO> selectACT() throws Exception;
	public List<AccommodationDTO> listAC_ACT(int ac_tag_number) throws Exception;
	
}
