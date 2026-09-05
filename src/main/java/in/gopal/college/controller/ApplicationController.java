package in.gopal.college.controller;
import java.io.IOException;
import java.util.Arrays;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import in.gopal.college.entity.Application;
import in.gopal.college.entity.ApplicationStatus;
import in.gopal.college.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import in.gopal.college.dto.RecentApplicationDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
	
	 private final ApplicationService service;

	    @PostMapping(value = "/{id}", consumes = "multipart/form-data")
	    public ResponseEntity<?> apply(
	    		@PathVariable Long id,

	            @RequestParam String name,
	            @RequestParam String email,
	            @RequestParam String phone,
	            @RequestParam String course,

	            @RequestParam(required = false) String qualification,
	            @RequestParam(required = false) String previousSchool,
	            @RequestParam(required = false) String marks,
	            @RequestParam(required = false) String year,
	            @RequestParam(required = false) String address,
	            @RequestParam(required = false) String sop,

	            @RequestPart(required = false)
	            @Schema(type = "string", format = "binary")
	            MultipartFile photo,

	            @RequestPart(required = false)
	            @Schema(type = "string", format = "binary")
	            MultipartFile[] documents
	    ) {
	        try {
	            Application saved = service.saveApplication(
	                    id, name, email, phone, course,
	                    qualification, previousSchool, marks, year,
	                    address, sop, photo, documents != null ? Arrays.asList(documents) : null
	            );

	            return ResponseEntity.ok(saved);

	        } catch (IOException e) {
	        	e.printStackTrace();
	            return ResponseEntity.status(500).body("File upload failed");
	        }
	    }
	    
	    // =====================================================
	    // GET SINGLE APPLICATION
	    // =====================================================

	    @GetMapping("/{id}")
	    public ResponseEntity<?> getApplication(
	            @PathVariable Long id) {

	        try {

	            Application application =
	                    service.getApplicationById(id);

	            return ResponseEntity.ok(application);

	        } catch (RuntimeException e) {

	            return ResponseEntity
	                    .notFound()
	                    .build();
	        }
	    }
	    
	    @GetMapping("/recent")
	    public ResponseEntity<List<RecentApplicationDto>> getRecentApplications() {

	        return ResponseEntity.ok(
	                service.getRecentApplications()
	        );
	    }
	    
	    @PutMapping("/{id}/status")
	    @PreAuthorize("hasRole('ADMIN')")
	    @SecurityRequirement(name = "bearerAuth")
	    public ResponseEntity<?> updateStatus(
	            @PathVariable Long id,
	            @RequestParam ApplicationStatus status) {

	        return ResponseEntity.ok(
	                service.updateStatus(id, status)
	        );
	    }
	    
	    @GetMapping
	    @PreAuthorize("hasRole('ADMIN')")
	    public ResponseEntity<List<Application>> getAllApplications() {

	        return ResponseEntity.ok(
	                service.getAllApplications()
	        );
	    }

}
