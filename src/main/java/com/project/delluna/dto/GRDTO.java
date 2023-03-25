package com.project.delluna.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GRDTO {
	
	private int gr_id, ac_id, gr_person_max, gr_person_min;
	private String gr_name, gr_price, gr_inform, gr_p_image;
	
}
