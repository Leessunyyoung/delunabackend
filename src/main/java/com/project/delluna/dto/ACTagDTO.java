package com.project.delluna.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ACTagDTO {

	private int ac_tag_id, ac_id, ac_tag_number;
	private String ac_tag_main, ac_tag_sub;
	
}
