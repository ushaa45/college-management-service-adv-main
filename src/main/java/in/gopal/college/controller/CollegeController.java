package in.gopal.college.controller;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.gopal.college.dto.CollegeDto;
import in.gopal.college.entity.College;
import in.gopal.college.repository.CollegeRepository;
import in.gopal.college.service.CollegeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/api/college")
@RequiredArgsConstructor
public class CollegeController {
	private final CollegeService collegeService;
	private final CollegeRepository repository;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<CollegeDto> create(@Valid @RequestBody CollegeDto dto){
		System.out.println("I am college management");
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(collegeService.createCollege(dto));
				
	}
	
	@GetMapping("/pagination")
	public ResponseEntity<Page<CollegeDto>> getPage(
			@RequestParam int page,
			@RequestParam int size){
		return ResponseEntity.ok(collegeService.getCollegeWithPagination(page, size));		
	}
	@GetMapping("/{id}")
	public ResponseEntity<CollegeDto> getById(@PathVariable Long id){
		return ResponseEntity.ok(collegeService.getCollegeById(id));
	}

	@PreAuthorize("hasAnyRole('ADMIN','USER')")
	@GetMapping
	public ResponseEntity<List<CollegeDto>> getAll(){
		return ResponseEntity.ok(collegeService.getAllColleges());
	}
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String>delete(@PathVariable Long id){
		collegeService.deleteCollege(id);
		return ResponseEntity.ok("Delete Successfully");
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping(value = "/{id}", consumes = "multipart/form-data" )
	public ResponseEntity<CollegeDto> update(
	        @PathVariable Long id,
	        
	        @RequestParam String collegeName,
	        @RequestParam String address,
	        @RequestParam String email,
	        @RequestParam String phone,
	        @RequestParam String course,
	        @RequestParam String district,

	        @RequestPart(value = "logo", required = false)
	        MultipartFile logo) {

	    return ResponseEntity.ok(collegeService.updateCollege(
	            id,
	            collegeName,
	            address,
	            email,
	            phone,
	            course,
	            district,
	            logo
	        ));
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value = "/add", consumes = "multipart/form-data")
	public ResponseEntity<?> addCollege(
	        @RequestParam String collegeName,
	        @RequestParam String address,
	        @RequestParam String email,
	        @RequestParam String phone,
	        @RequestParam String course,
	        @RequestParam String district,
	        @RequestPart(value = "logo", required = false) MultipartFile logo)
	 {
	    try {
	        String logoPath = null;

	        if (logo != null && !logo.isEmpty()) {
	            String fileName = UUID.randomUUID() + "_" + logo.getOriginalFilename();
	            //String uploadDir = "uploads/";
	            String uploadDir = System.getProperty("user.dir") + File.separator + "uploads" + File.separator;
	            File dir = new File(uploadDir);
	            if (!dir.exists()) {
	            	dir.mkdirs();
	            }

	            File destination = new File(uploadDir + fileName);
	            //String path = uploadDir + fileName;
	            logo.transferTo(destination);

	            logoPath = "uploads/" + fileName;
	        }

	        College college = new College();
	        college.setCollegeName(collegeName);
	        college.setAddress(address);
	        college.setEmail(email);
	        college.setPhone(phone);
	        college.setCourse(course);
	        college.setDistrict(district);
	        college.setLogo(logoPath);

	        return ResponseEntity.ok(repository.save(college));

	    } catch (Exception e) {
	    	e.printStackTrace();
	        return ResponseEntity.status(500).body("Upload failed");
	    }
	}
	
}
	