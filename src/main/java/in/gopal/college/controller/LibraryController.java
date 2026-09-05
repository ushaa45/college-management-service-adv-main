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

import in.gopal.college.dto.LibraryDto;
import in.gopal.college.service.LibraryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/libraries")
@RequiredArgsConstructor
public class LibraryController {
	
	private final LibraryService libraryService;
	
	@PostMapping
	public ResponseEntity<LibraryDto> create(@RequestBody LibraryDto dto){
		return ResponseEntity.ok(libraryService.createLibraryCard(dto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<LibraryDto> getById(@PathVariable Long id){
		return ResponseEntity.ok(libraryService.getByLibraryId(id));
	}
	
	@GetMapping
	public ResponseEntity<List<LibraryDto>> getAll(){
		return ResponseEntity.ok(libraryService.getAllLibDetails());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String>delete(@PathVariable Long id){
		libraryService.deleteLibDetails(id);
		return ResponseEntity.ok("Library Details deleted for this id");
	}

}
