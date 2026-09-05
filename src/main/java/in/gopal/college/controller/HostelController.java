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

import in.gopal.college.dto.HostelDto;
import in.gopal.college.service.HostelService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hostel")
@RequiredArgsConstructor
public class HostelController {
	private final HostelService hostelService;

	@PostMapping
	public ResponseEntity<HostelDto> create (@RequestBody HostelDto dto){
		return ResponseEntity.ok(hostelService.createHostelEntry(dto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<HostelDto> findById(@PathVariable Long id){
		return ResponseEntity.ok(hostelService.getHostelerById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<HostelDto>> findAllHosteler(){
		return ResponseEntity.ok(hostelService.getAllHosteler());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String>delete(@PathVariable Long id){
		hostelService.deleteHostelerById(id);
		return ResponseEntity.ok("Deleted Successfully");
	}
}
