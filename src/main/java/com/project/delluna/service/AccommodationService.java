package com.project.delluna.service;

import com.project.delluna.dto.ACTagDTO;
import com.project.delluna.dto.AC_ServiceDTO;
import com.project.delluna.dto.AccommodationDTO;
import com.project.delluna.dto.GRDTO;
import com.project.delluna.dto.ReviewDTO;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccommodationService {
	
	public List<AccommodationDTO> listProcess() throws Exception;
	public AccommodationDTO selectACProcess(int ac_id) throws Exception;
	public List<AC_ServiceDTO> selectServiceTagsProcess(int ac_id) throws Exception;
	public List<AC_ServiceDTO> selectServiceTagsProcess2() throws Exception;
	public List<GRDTO> selectGRProcess(int ac_id) throws Exception;
	public List<GRDTO> selectGRProcess2(int ac_id) throws Exception;
	public List<GRDTO> listGRProcess() throws Exception;
	public List<ReviewDTO> reviewProcess() throws Exception;
	public List<ACTagDTO> ACTagProcess() throws Exception;
	public List<AccommodationDTO> listAC_ACTProcess(int ac_tag_number) throws Exception;
}
