package in.gopal.college.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor
public class RecentApplicationDto {
	private Long id;
	private String name;
	private String email; 
	private String course; 
	private String paymentStatus;	

}
