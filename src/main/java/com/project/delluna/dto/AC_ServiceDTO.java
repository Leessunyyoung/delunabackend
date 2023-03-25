package com.project.delluna.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AC_ServiceDTO {

	private int ac_serv_id, ac_id;
	private String ac_serv_desc, ac_serv_image;
	
}
