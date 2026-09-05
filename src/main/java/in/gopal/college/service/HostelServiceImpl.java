package in.gopal.college.service;

import java.util.List;
import org.springframework.stereotype.Service;
import in.gopal.college.dto.HostelDto;
import in.gopal.college.entity.College;
import in.gopal.college.entity.Hostel;
import in.gopal.college.repository.CollegeRepository;
import in.gopal.college.repository.HostelRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostelServiceImpl implements HostelService {

	private final HostelRepository hostelRepository;
	private final CollegeRepository collegeRepository;
	private final AuditLogService auditLogService;

	@Override
	public HostelDto createHostelEntry(HostelDto dto) {
		Hostel hostel = new Hostel();
		hostel.setHostelName(dto.getHostelName());
		
		College college = collegeRepository.findById(dto.getCollegeId())
				.orElseThrow(() -> new RuntimeException(
						"College not found with this id: " + dto.getCollegeId()));
		hostel.setCollege(college);
		
		Hostel saved = hostelRepository.save(hostel);
		 auditLogService.log(
			        "CREATED",
			        "Hostel",
			        saved.getHostelId(),
			        "Created Hostel \"" + saved.getHostelName() + "\""
			    );
		 // Convert to DTO
        HostelDto response = new HostelDto();

        response.setHostelId(saved.getHostelId());
        response.setHostelName(saved.getHostelName());

        if (saved.getCollege() != null) {
            response.setCollegeId(saved.getCollege().getCollegeId());
        }

        return response;
	}

	@Override
	public HostelDto getHostelerById(Long id) {

		Hostel hostel = hostelRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Hosteler not found with this id"));
		 HostelDto dto = new HostelDto();

	        dto.setHostelId(hostel.getHostelId());
	        dto.setHostelName(hostel.getHostelName());

	        if (hostel.getCollege() != null) {
	            dto.setCollegeId(hostel.getCollege().getCollegeId());
	        }

	        return dto;
	}

	@Override
	public List<HostelDto> getAllHosteler() {

		//return hostelRepository.findAll().stream().map(hostel -> mapper.map(hostel, HostelDto.class)).toList();
		return hostelRepository.findAll()
                .stream()
                .map(hostel -> {

                    HostelDto dto = new HostelDto();

                    dto.setHostelId(hostel.getHostelId());
                    dto.setHostelName(hostel.getHostelName());

                    if (hostel.getCollege() != null) {
                        dto.setCollegeId(
                                hostel.getCollege().getCollegeId()
                        );
                    }

                    return dto;
                })
                .toList();
	}

	@Override
	public void deleteHostelerById(Long id) {
		Hostel hostel = hostelRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Hosteler not found with this id"));

		hostelRepository.deleteById(id);
		auditLogService.log(
		        "DELETED",
		        "Hostel",
		        hostel.getHostelId(),
		        "Deleted Hostel \"" + hostel.getHostelName() + "\""
		    );


	}

}
