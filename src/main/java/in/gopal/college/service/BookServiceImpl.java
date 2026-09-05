package in.gopal.college.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import in.gopal.college.dto.BookDto;
import in.gopal.college.entity.Book;
import in.gopal.college.entity.Library;
import in.gopal.college.repository.BookRepository;
import in.gopal.college.repository.LibraryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{
	
	private final BookRepository bookRepository;
	private final ModelMapper mapper;
	private final  LibraryRepository libraryRepository;
	private final AuditLogService auditLogService;
	
	@Override
	public BookDto createBook(BookDto dto) {
		Book book = mapper.map(dto, Book.class);
		
		 // Find the existing library
        Library library = libraryRepository.findById(dto.getLibraryId())
                .orElseThrow(() -> new RuntimeException(
                        "Library not found with id: " + dto.getLibraryId()
                ));
        
        // Set the existing library
        book.setLibrary(library);
        
        // Save Book
		Book saved = bookRepository.save(book);
		
		auditLogService.log(
				"CREATED", 
				"BOOK",
				saved.getBookId(),
				"Created Book \"" + saved.getTitle()+ "\""
		);
		// Convert Book to BookDto
		return mapper.map(saved, BookDto.class);
	}
	
	@Override
	public BookDto getBookById(Long id) {
		Book book = bookRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Book not found"));
		return mapper.map(book, BookDto.class);
	}
	
	@Override
	public List<BookDto> getAllBook() {
		
		return bookRepository.findAll()
				.stream()
				.map(book -> mapper.map(book, BookDto.class))
				.toList();
	}
	
	@Override
	public void deleteBook(Long id) {
		Book book = bookRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Book not found"));
		bookRepository.deleteById(id);
		auditLogService.log(
				"DELETED", 
				"BOOK",
				book.getBookId(),
				"Created Book \"" + book.getTitle()+ "\""
		);
	}
}
