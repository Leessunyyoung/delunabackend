package com.project.delluna.controller;

//import java.lang.invoke.MethodHandles.Lookup.ClassOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.delluna.dto.ReviewDTO;
import com.project.delluna.service.ReviewService;


// 웹페이지의 제한된 자원을 외부 도메인에서 접근을 허용해주는 메커니즘
@CrossOrigin(origins = { "http://localhost:3000" })
//@CrossOrigin("*")

// @ResponseBody + @Controller
// JSON 형태로 객체 데이터를 반환한다.
@RestController
public class ReviewController {

	@Autowired
	private ReviewService service;
	private String rev_content;

	public ReviewController() {
		System.out.println("controller");
	}

	public void setService(ReviewService service) {
		this.service = service;
	}

	// 댓글 리스트
	@GetMapping("/detail/reviewlist/{ac_id}")
	public List<ReviewDTO> getReviewList(@PathVariable("ac_id") int ac_id ,ReviewDTO dto) throws Exception {
		return service.listProcess(ac_id);
	}

	// 댓글쓰기
	@PostMapping("/detail/review")
	public String writeMethod(@RequestBody ReviewDTO dto) {
		System.out.println(dto.getRev_id());
		System.out.println(dto.getAc_id());
		System.out.println(dto.getUsername());
		System.out.println(dto.getRev_content());
		System.out.println(dto.getRev_rating());

		service.insertProcess(dto);
		return null;
	}

	// 수정
	@PutMapping("/review/update/{rev_id}")
	public void updateMethod(@PathVariable("rev_id") int rev_id, @RequestBody ReviewDTO dto) {

		System.out.println("rev_content : " + rev_content);
		
		System.out.println(dto.getRev_id());
		System.out.println(dto.getRev_content());
		
		dto.setRev_id(rev_id);

		service.updateProcess(dto);
	}
	
	// 삭제
	@DeleteMapping("/review/delete/{rev_id}")
	public void deleteMethod(@PathVariable("rev_id") int rev_id) {
		System.out.println("rev_id" + rev_id);
		service.deleteProcess(rev_id);
		
	}

}
