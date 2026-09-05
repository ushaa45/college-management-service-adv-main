package in.gopal.college.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.gopal.college.dto.ApplicationDto;
import in.gopal.college.dto.RecentApplicationDto;
import in.gopal.college.entity.Application;
import in.gopal.college.entity.ApplicationStatus;
import in.gopal.college.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
	


    private final ApplicationRepository repository;
    private final ModelMapper modelMapper;
    private final AuditLogService auditLogService;

    public Application saveApplication(
            Long collegeId,
            String name,
            String email,
            String phone,
            String course,
            String qualification,
            String previousSchool,
            String marks,
            String year,
            String address,
            String sop,
            MultipartFile photo,
            List<MultipartFile> documents
    ) throws IOException {

        // Create folder if not exists
    	String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
        	dir.mkdirs();
        }

        Application app = new Application();
        app.setCollegeId(collegeId);
        app.setName(name);
        app.setEmail(email);
        app.setPhone(phone);
        app.setCourse(course);
        app.setQualification(qualification);
        app.setPreviousSchool(previousSchool);
        app.setMarks(marks);
        app.setYear(year);
        app.setAddress(address);
        app.setSop(sop);
        app.setStatus(ApplicationStatus.PENDING);

        // 📸 Save photo
        if (photo != null && !photo.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();
            File file = new File(uploadDir + fileName);
            photo.transferTo(file);
            app.setPhotoPath(file.getAbsolutePath());
        }

        // 📄 Save documents
        List<String> docPaths = new ArrayList<>();
        if (documents != null && !documents.isEmpty()) {
            for (MultipartFile doc : documents) {
                if (!doc.isEmpty() && !doc.isEmpty()) {
                    String fileName = UUID.randomUUID() + "_" + doc.getOriginalFilename();
                    File file = new File(uploadDir + fileName);
                    doc.transferTo(file);
                    docPaths.add(file.getAbsolutePath());
                }
            }
        }

        app.setDocumentPaths(docPaths);

        //return repository.save(app);
        Application savedApplication = repository.save(app);
        
        auditLogService.log(
        	    "STATUS_CHANGED",
        	    "Application",
        	    savedApplication.getId(),
        	    "Application status changed to "
        	        + savedApplication.getStatus()
        	);
        return savedApplication;
    }
    
    public List<RecentApplicationDto> getRecentApplications() {

        List<Application> applications =
                repository.findTop5ByOrderByIdDesc();

        return applications.stream()
                .map(app -> new RecentApplicationDto(
                        app.getId(),
                        app.getName(),
                        app.getEmail(),
                        app.getCourse(),
                        app.getPaymentStatus()
                ))
                .toList();
    }
    
    // -------------------------
    // Get application by ID
    // -------------------------

    public Application getApplicationById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));
    }


    // -------------------------
    // Update application status
    // -------------------------
    
    public ApplicationDto updateStatus(Long id, ApplicationStatus status) {

        Application application = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        
        // move it to payment pending
        if (status == ApplicationStatus.APPROVED) {
            application.setStatus(ApplicationStatus.PAYMENT_PENDING);
            application.setPaymentStatus("PENDING");
        } else {
            application.setStatus(status);
        }

        Application savedApplication = repository.save(application);
        
        auditLogService.log(
                "STATUS_CHANGED",
                "Application",
                savedApplication.getId(),
                "Application status changed to "
                        + savedApplication.getStatus()
        );

        return modelMapper.map(savedApplication, ApplicationDto.class);
    }

    public List<Application> getAllApplications() {
        return repository.findAll();
    }
    
    public List<Application> getPendingPayments() {
        return repository.findByStatusAndPaymentStatus(
                ApplicationStatus.PAYMENT_PENDING,
                "PENDING"
        );
    }
}
