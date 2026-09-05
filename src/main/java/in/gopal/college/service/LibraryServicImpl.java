package in.gopal.college.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import in.gopal.college.dto.LibraryDto;
import in.gopal.college.entity.College;
import in.gopal.college.entity.Library;
import in.gopal.college.repository.CollegeRepository;
import in.gopal.college.repository.LibraryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LibraryServicImpl implements LibraryService {

	private final LibraryRepository libraryRepository;
	private final CollegeRepository collegeRepository;
	private final ModelMapper mapper;

	@Override
	public LibraryDto createLibraryCard(LibraryDto dto) {

		// Library library = mapper.map(dto, Library.class);
		Library library = new Library();
		library.setLibraryName(dto.getLibraryName());
		College college = collegeRepository.findById(dto.getCollegeId())
				.orElseThrow(() -> new RuntimeException("College not found with this id: " + dto.getCollegeId()));
		
		
		library.setCollege(college);
		
		Library saved = libraryRepository.save(library);
		return mapper.map(saved, LibraryDto.class);
	}

	@Override
	public LibraryDto getByLibraryId(Long id) {
		Library library = libraryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Library Details not found with this id" + id));
		return mapper.map(library, LibraryDto.class);
	}

	@Override
	public List<LibraryDto> getAllLibDetails() {

		return libraryRepository.findAll().stream().map(library -> mapper.map(library, LibraryDto.class)).toList();
	}

	@Override
	public void deleteLibDetails(Long id) {
		libraryRepository.deleteById(id);

	}

}
