package in.gopal.college.dto;

import lombok.Data;

@Data
public class BookDto {

	private Long bookId;
    private String title;
    private String author;
    private String isbn;
    private Long libraryId;
}
