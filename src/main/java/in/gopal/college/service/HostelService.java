package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.HostelDto;

public interface HostelService {
	
	HostelDto createHostelEntry(HostelDto dto);
	HostelDto getHostelerById(Long id);
	List<HostelDto> getAllHosteler();
	void deleteHostelerById(Long id);

}
