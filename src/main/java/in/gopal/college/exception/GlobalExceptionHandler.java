package in.gopal.college.exception;

import java.time.LocalDateTime;

import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
				new ErrorResponse(
						ex.getMessage(),
						HttpStatus.NOT_FOUND.value(),
						LocalDateTime.now()
						)
				);
		
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?>handleGeneric(Exception ex){
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
				new ErrorResponse(
						ex.getMessage(),
						500,
						LocalDateTime.now()
						)
				);
	}
	
}
