package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.LibraryDto;

public interface LibraryService {
	
	LibraryDto createLibraryCard(LibraryDto dto);
	LibraryDto getByLibraryId(Long id);
	List<LibraryDto> getAllLibDetails();
	void deleteLibDetails(Long id);

}
