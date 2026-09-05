package in.gopal.college.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.dto.StudentDto;
import in.gopal.college.service.StudentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
	private final StudentService studentService;
	
	@PostMapping
	public ResponseEntity<StudentDto> create(@RequestBody StudentDto dto){
		return ResponseEntity.ok(studentService.createStudent(dto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<StudentDto> getById(@PathVariable Long id){
		return ResponseEntity.ok(studentService.getStudentById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<StudentDto>> getAll(){
		return ResponseEntity.ok(studentService.getAllStudent());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id){
	    studentService.deleteStudent(id);
	    return ResponseEntity.ok("Student Deleted Successfully");
	}
	
//	@PutMapping("/{id}")
//	public ResponseEntity<StudentDto> update(@PathVariable Long id;
//	@RequestBody StudentDto dto){
//	    return ResponseEntity.ok(studentService.updateStudent(id, dto));
//		
//	}
	

}
