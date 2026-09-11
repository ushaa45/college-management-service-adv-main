package in.gopal.college.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CollegeDto {
	private Long collegeId;

	@NotBlank(message = "College name is required")
    private String collegeName;
	@NotBlank(message = "Address is required")
    private String address;
	@Email(message = "Inavalid email format")
    private String email;
	@Pattern(regexp = "^[0-9]{10}$", message ="Phone no must be 10 digits")
    private String phone;
	private String district;
    private String course;
	private String websiteUrl;
	
    // ==========================================
    // COLLEGE WEBSITE INFORMATION
    // ==========================================

    private String notice;

    private String generalNotice;

    private String tender;

    private String objectives;

    private String vision;

    private String mission;

    private String libraryInfo;

    private String scholarshipInfo;

    private String alumniInfo;

    private String regularCourses;

    private String studentZone;

    private String quickLinks;

    private String logo;

}
