package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.CollegeDto;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;


public interface CollegeService {

	CollegeDto createCollege(CollegeDto dto);
	Page<CollegeDto> getCollegeWithPagination(int page, int size);
	CollegeDto getCollegeById(Long id);
	List<CollegeDto> getAllColleges();
	void deleteCollege(Long id);
	CollegeDto updateCollege(Long id, CollegeDto dto);
	CollegeDto updateCollege(Long id, String collegeName, String address, String email, String phone, String course,
			String district, MultipartFile logo);
	

}
