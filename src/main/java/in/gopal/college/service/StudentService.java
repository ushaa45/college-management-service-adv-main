package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.StudentDto;

public interface StudentService {

	StudentDto createStudent(StudentDto dto);
	StudentDto getStudentById(Long id);
	List<StudentDto> getAllStudent();
	void deleteStudent(Long id);
}
