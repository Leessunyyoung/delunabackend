package com.project.delluna.service;

import com.project.delluna.dao.AccommodationDAO;
import com.project.delluna.dto.ACTagDTO;
import com.project.delluna.dto.AC_ServiceDTO;
import com.project.delluna.dto.AccommodationDTO;
import com.project.delluna.dto.GRDTO;
import com.project.delluna.dto.ReviewDTO;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@NoArgsConstructor
public class AccommodationServiceImp implements AccommodationService {
	
	@Autowired
	private AccommodationDAO dao;
	
	@Override
	public List<AccommodationDTO> listProcess() throws Exception {
		return dao.getList();
	}

	@Override
	public AccommodationDTO selectACProcess(int ac_id) throws Exception {
		return dao.selectAC(ac_id);
	}

	@Override
	public List<AC_ServiceDTO> selectServiceTagsProcess(int ac_id) throws Exception {
		return dao.selectServiceTags(ac_id);
	}
	
@Override
	public List<AC_ServiceDTO> selectServiceTagsProcess2() throws Exception {
		return dao.selectServiceTags2();
	}
	
	@Override
	public List<ReviewDTO> reviewProcess() throws Exception {
		return dao.selectRv();
	}

	@Override
	public List<GRDTO> listGRProcess() throws Exception {
		return dao.listGR();
	}

	@Override
	public List<ACTagDTO> ACTagProcess() throws Exception {
		return dao.selectACT();
	}

	@Override
	public List<GRDTO> selectGRProcess(int ac_id) throws Exception {
		return dao.selectGR(ac_id);
	}

		@Override
	public List<GRDTO> selectGRProcess2(int ac_id) throws Exception {
		return dao.selectGR2(ac_id);
	}

	@Override
	public List<AccommodationDTO> listAC_ACTProcess(int ac_tag_number) throws Exception {
		return dao.listAC_ACT(ac_tag_number);
	}
	

	
}
