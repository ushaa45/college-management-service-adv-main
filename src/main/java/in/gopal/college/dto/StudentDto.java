package in.gopal.college.dto;

import lombok.Data;

@Data
public class StudentDto {

	private Long studentId;

    private String name;
    private String email;
    private String phone;
    private String department;
    private Long collegeId;
}
