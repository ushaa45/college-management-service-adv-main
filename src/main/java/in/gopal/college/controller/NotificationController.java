package in.gopal.college.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.dto.NotificationDto;
import in.gopal.college.service.NotificationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
	
	private final NotificationService notificationService;
	
	@GetMapping
	public ResponseEntity<List<NotificationDto>> getNotifications(){
		
		return ResponseEntity.ok(notificationService.getNotifications());
	}
	
	@GetMapping("/unread-count")
	public ResponseEntity<Long> getUnreadCount(){
		
		return ResponseEntity.ok(notificationService.getUnreadCount());
	}
	
	 @PutMapping("/{id}/read")
	    public ResponseEntity<String> markAsRead(
	            @PathVariable Long id) {

	        notificationService.markAsRead(id);

	        return ResponseEntity.ok(
	                "Notification marked as read"
	        );
	    }
	
	@PutMapping("/read-all")
	public ResponseEntity<String> markAsRead(){
		
		notificationService.markAllAsRead();
		return ResponseEntity.ok("All notifications marked as read");
	}
	
	@PostMapping("/test")
	public ResponseEntity<NotificationDto> createTest() {

	    return ResponseEntity.ok(
	        notificationService.createNotification(
	            "New Application",
	            "A new student application has been received."
	        )
	    );
	}

}
