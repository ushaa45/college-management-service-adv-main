package in.gopal.college.dto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.gopal.college.entity.ApplicationStatus;

@Data
public class ApplicationDto {

	 private String name;
	    private String email;
	    private String phone;
	    private String course;

	    @Schema(type = "string", format = "binary")
	    private MultipartFile photo;

	    @Schema(type = "string", format = "binary")
	    private List<MultipartFile> documents;
	    
	    private ApplicationStatus status;  
}
