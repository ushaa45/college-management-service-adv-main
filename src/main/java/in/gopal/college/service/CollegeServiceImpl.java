package in.gopal.college.service;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.gopal.college.dto.CollegeDto;
import in.gopal.college.entity.College;
import in.gopal.college.repository.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;


@Service
@RequiredArgsConstructor
public class CollegeServiceImpl implements CollegeService{

	private final CollegeRepository collegeRepository;
	private final ModelMapper mapper;
	private final AuditLogService auditLogService;
	//private static final Logger logger = LoggerFactory.getLogger(CollegeServiceImpl.class);
	
	@Override
	public CollegeDto createCollege(CollegeDto dto) {
		College college = mapper.map(dto,College.class);
		College saved = collegeRepository.save(college);
		auditLogService.log(
			    "CREATED",
			    "College",
			    saved.getCollegeId(),
			    "Created College \"" + saved.getCollegeName() + "\""
			);
		
		return mapper.map(saved, CollegeDto.class);
	}
	
	@Override
	public Page<CollegeDto> getCollegeWithPagination(int page, int size){
		Page<College> colleges = collegeRepository.findAll(PageRequest.of(page, size));
		return colleges.map(college -> mapper.map(college, CollegeDto.class));
		
	}
	
	@Override
	public CollegeDto getCollegeById(Long id) {
		College college = collegeRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("College not found"));
		
		return mapper.map(college, CollegeDto.class);
	}
	@Override
	public List<CollegeDto> getAllColleges() {
		
		return collegeRepository.findAll()
				.stream()
				.map(college -> mapper.map(college, CollegeDto.class))
				.toList();
	}
	@Override
	public void deleteCollege(Long id) {
		College saved = collegeRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("College not found"));
		collegeRepository.deleteById(id);
		auditLogService.log(
			    "DELETED",
			    "College",
			    saved.getCollegeId(),
			    "Deleted College \"" + saved.getCollegeName() + "\""
			);
		
		
	}

//	@Override
//	public CollegeDto updateCollege(Long id, CollegeDto dto) {
//		College existingCollege = collegeRepository.findById(id)
//	            .orElseThrow(() -> new RuntimeException("College not found"));
//
//	    // Copy DTO → Entity (only updates fields)
////		mapper.map(dto, existingCollege);
//
//		existingCollege.setCollegeName(dto.getCollegeName());
//		existingCollege.setAddress(dto.getAddress());
//		existingCollege.setEmail(dto.getEmail());
//		existingCollege.setPhone(dto.getPhone());
//		
//        College updatedCollege = collegeRepository.save(existingCollege);
//
//		
//	    // Convert Entity → DTO
//	    return mapper.map(updatedCollege, CollegeDto.class);
//	}
//
//	@Override
//	public CollegeDto updateCollege(Long id, String collegeName, String address, String email, String phone,
//			String course, String district, MultipartFile logo) {
//		// TODO Auto-generated method stub
//		//Find existing college
//		College college = collegeRepository.findById(id)
//				.orElseThrow(()-> new RuntimeException("College not found with this id " + id));
//		
//		//update normal fields
//		college.setCollegeName(collegeName);
//		college.setAddress(address);
//		college.setEmail(email);
//		college.setPhone(phone);
//		college.setCourse(course);
//		college.setDistrict(district);
//		
//		//update uploaded field
//		if(logo != null && !logo.isEmpty()) {
//			try {
//				String fileName = UUID.randomUUID() + "_" + logo.getOriginalFilename();
//				
//				String uploadDir = System.getProperty("user.dir")
//						+ File.separator
//						+ "uploads"
//						+ File.separator;
//				
//				File directory = new File(uploadDir);
//				
//				if(!directory.exists()) {
//					directory.mkdir();
//				}
//				
//				File destination = new File(uploadDir + fileName);
//				
//				logo.transferTo(destination);
//				
//				//save relative path in database
//				college.setLogo("uploads/" + fileName);
//			} catch (Exception e) {
//				 throw new RuntimeException("Failed to upload college logo", e);
//			}
//		}
//		
//	    // 4. Save updated college
//	    College updatedCollege = collegeRepository.save(college);
//	    
//	    auditLogService.log(
//			    "UPDATED",
//			    "College",
//			    updatedCollege.getCollegeId(),
//			    "Updated College \"" + updatedCollege.getCollegeName() + "\""
//			);
//		
//
//	    // 5. Convert Entity → DTO
//	    return mapper.map(updatedCollege, CollegeDto.class);
//	}

	@Override
	public CollegeDto updateCollege(Long id, String collegeName, String address, String email, String phone,
			String course, String district, String websiteUrl, String notice, String generalNotice, String tender,
			String objectives, String vision, String mission, String libraryInfo, String scholarshipInfo,
			String alumniInfo, String regularCourses, String studentZone, String quickLinks, MultipartFile logo) {
		

	    College college = collegeRepository.findById(id)
	            .orElseThrow(() ->
	                    new RuntimeException("College not found with this id " + id));

	    // ==========================================
	    // BASIC INFORMATION
	    // ==========================================

	    college.setCollegeName(collegeName);
	    college.setAddress(address);
	    college.setEmail(email);
	    college.setPhone(phone);
	    college.setCourse(course);
	    college.setDistrict(district);
	    college.setWebsiteUrl(websiteUrl);

	    // ==========================================
	    // WEBSITE INFORMATION
	    // ==========================================

	    college.setNotice(notice);
	    college.setGeneralNotice(generalNotice);
	    college.setTender(tender);

	    college.setObjectives(objectives);
	    college.setVision(vision);
	    college.setMission(mission);

	    college.setLibraryInfo(libraryInfo);
	    college.setScholarshipInfo(scholarshipInfo);
	    college.setAlumniInfo(alumniInfo);

	    college.setRegularCourses(regularCourses);
	    college.setStudentZone(studentZone);
	    college.setQuickLinks(quickLinks);

	    // ==========================================
	    // LOGO
	    // ==========================================

	    if (logo != null && !logo.isEmpty()) {

	        try {

	            String fileName =
	                    UUID.randomUUID() + "_" + logo.getOriginalFilename();

	            String uploadDir =
	                    System.getProperty("user.dir")
	                            + File.separator
	                            + "uploads"
	                            + File.separator;

	            File directory = new File(uploadDir);

	            if (!directory.exists()) {
	                directory.mkdirs();
	            }

	            File destination =
	                    new File(uploadDir + fileName);

	            logo.transferTo(destination);

	            college.setLogo("uploads/" + fileName);

	        } catch (Exception e) {

	            throw new RuntimeException(
	                    "Failed to upload college logo", e
	            );
	        }
	    }

	    // ==========================================
	    // SAVE
	    // ==========================================

	    College updatedCollege =
	            collegeRepository.save(college);

	    auditLogService.log(
	            "UPDATED",
	            "College",
	            updatedCollege.getCollegeId(),
	            "Updated College \"" +
	                    updatedCollege.getCollegeName() +
	                    "\""
	    );

	    return mapper.map(
	            updatedCollege,
	            CollegeDto.class
	    );
	}
	
	
}
