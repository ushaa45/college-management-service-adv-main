package in.gopal.college.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.dto.DashboardStatsDto;
import in.gopal.college.repository.ApplicationRepository;
import in.gopal.college.repository.BookRepository;
import in.gopal.college.repository.CollegeRepository;
import in.gopal.college.repository.HostelRepository;
import in.gopal.college.repository.RoomRepository;
import in.gopal.college.repository.StudentRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
	
	 private final StudentRepository studentRepository;
	    private final CollegeRepository collegeRepository;
	    private final BookRepository bookRepository;
	    private final RoomRepository roomRepository;
	    private final HostelRepository hostelRepository;
	    private final ApplicationRepository applicationRepository;
	    
	    @GetMapping("/starts")
	    public ResponseEntity<DashboardStatsDto> getStarts(){
	    	
	    	DashboardStatsDto stats = new DashboardStatsDto(studentRepository.count(),
	    													collegeRepository.count(),
	    													bookRepository.count(),
	    													roomRepository.count(),
	    													hostelRepository.count(),
	    													applicationRepository.count(),
	    									                applicationRepository.sumPaidAmount());
	    													
	    	
	    	return ResponseEntity.ok(stats);
	    }

}
