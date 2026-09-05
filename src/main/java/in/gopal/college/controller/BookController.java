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

import in.gopal.college.dto.BookDto;
import in.gopal.college.service.BookService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
	
	private final BookService bookService;
	@PostMapping
	public ResponseEntity<BookDto> create(@RequestBody BookDto dto){
		return ResponseEntity.ok(bookService.createBook(dto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<BookDto> findById(@PathVariable Long id) {
	    return ResponseEntity.ok(bookService.getBookById(id));
	}
	
	@GetMapping
	public ResponseEntity<List<BookDto>> getAll(){
		return ResponseEntity.ok(bookService.getAllBook());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String>delete(@PathVariable Long id){
		bookService.deleteBook(id);
		return ResponseEntity.ok("Delete Successfully");
	}

}
