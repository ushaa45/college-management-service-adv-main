package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.BookDto;

public interface BookService {

	BookDto createBook(BookDto dto);
	BookDto getBookById(Long id);
	List<BookDto> getAllBook();
	void deleteBook(Long id);
}
