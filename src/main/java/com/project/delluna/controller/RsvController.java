package com.project.delluna.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.delluna.dto.RsvDTO;
import com.project.delluna.service.RsvService;


@CrossOrigin(origins = { "http://localhost:3000" })

@RestController
public class RsvController {
	@Autowired
	private RsvService service;
	
	public RsvController() {
		System.out.println("rsvcontroller");
	}
	public void setService(RsvService service){
		this.service =service;
	}
	

	@GetMapping("/detail/rsvlist")
	public Map<String, Object> rsvList(RsvDTO dto) throws Exception {
		Map<String, Object> rsv_list = new HashMap<>();
		
		List<RsvDTO> rsv_dto = service.listProcess(dto);
		
		rsv_list.put("rsv_dto",rsv_dto);
		
		return rsv_list;
	}
	
	@GetMapping("/detail/rsvlist/{username}")
	public Map<String, Object> rsvList(@PathVariable("username") String username) throws Exception {
		Map<String, Object> rsv_list = new HashMap<>();
		
		List<RsvDTO> rsv_dto = service.listProcess(username);
		
		rsv_list.put("rsv_dto",rsv_dto);
		
		return rsv_list;
	}
	

	@PostMapping("/detail/rsvinsert")
	public String writeMethod(@RequestBody RsvDTO dto) {
		System.out.println("rsv_id" + dto.getAc_id());
		System.out.println("rsv_room_name" + dto.getRsv_room_name());
		System.out.println("rsv_check_in" + dto.getRsv_check_in());
		System.out.println("rsv_check_out" + dto.getRsv_check_out());
		
		service.insertrsv(dto);
		return null;
	}
		
	@DeleteMapping("/detail/rsvdelete/{rsv_id}")
	public void deleteMethod(@PathVariable("rsv_id") int rsv_id) {
		System.out.println("rsv_id" + rsv_id);
		service.delete(rsv_id);
	}
	
}
