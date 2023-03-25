package com.project.delluna.controller;

import com.project.delluna.dto.AC_ServiceDTO;
import com.project.delluna.dto.AccommodationDTO;
import com.project.delluna.dto.GRDTO;
import com.project.delluna.service.AccommodationService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;

//@CrossOrigin("*")
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/")
public class AccommodationController {

	@Autowired
	private AccommodationService accommodationService;
	
	@GetMapping("/")
	public Map<String, Object> mainList() throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("dto", accommodationService.listProcess());
		map.put("tagdto", accommodationService.selectServiceTagsProcess2());
		map.put("grdto", accommodationService.listGRProcess());
		map.put("rvdto", accommodationService.reviewProcess());
		map.put("rvtdto", accommodationService.ACTagProcess());
//		System.out.println(map);
		return map;
	}

	@GetMapping("/detail/{ac_id}")
	public Map<String, Object> findAC(@PathVariable("ac_id") int ac_id) throws Exception {
		Map<String, Object> ac_info = new HashMap<>();
		
		System.out.println("ac_id : " + ac_id);
		System.out.println("ac_dto : " + accommodationService.selectACProcess(ac_id));
		System.out.println("ac_serv_dto : " + accommodationService.selectServiceTagsProcess(ac_id));
		
		//숙소 정보
		AccommodationDTO ac_dto = accommodationService.selectACProcess(ac_id);
		
		//숙소 서비스 태그 정보
		List<AC_ServiceDTO> ac_serv_dto = accommodationService.selectServiceTagsProcess(ac_id);
		
		//객실 정보
		List<GRDTO> gr_dto = accommodationService.selectGRProcess(ac_id);
		
		List<GRDTO> gr_dto2 = accommodationService.selectGRProcess2(ac_id);
		
		System.out.println("gr_dto2 : " + accommodationService.selectGRProcess2(ac_id));
		ac_info.put("ac_dto", ac_dto);
		ac_info.put("ac_serv_dto", ac_serv_dto);
		ac_info.put("gr_dto", gr_dto);
		ac_info.put("gr_dto2", gr_dto2);
		
		return ac_info;
	}
	
	@GetMapping("/mainViewAll/{ac_tag_number}")
	public Map<String, Object> getListInMiddlePage(@PathVariable("ac_tag_number") int ac_tag_number) throws Exception {
		Map<String, Object> map = new HashMap<>();
		System.out.println("ac_tag_number : " + ac_tag_number);
		//숙소 정보
		
		if (ac_tag_number == 0) {
			map.put("dto", accommodationService.listProcess());			
		} else {
			map.put("dto", accommodationService.listAC_ACTProcess(ac_tag_number));
		}		
		map.put("tagdto", accommodationService.selectServiceTagsProcess2());
		map.put("grdto", accommodationService.listGRProcess());
		map.put("rvdto", accommodationService.reviewProcess());
		map.put("rvtdto", accommodationService.ACTagProcess());
		
		return map;
	}
}
