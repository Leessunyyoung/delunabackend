package com.project.delluna.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AccommodationDTO {
	private int ac_id, ac_type_number;
	private String ac_name, ac_thumbnail, ac_information, ac_notification, ac_address, ac_type_name, ac_address_main,
	ac_address_middle, ac_address_sub, ac_phone_number, ac_check_in, ac_check_out, ac_latitude, ac_longitude;
	private float ac_rating;
}
