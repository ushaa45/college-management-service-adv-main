package in.gopal.college.service;

import java.util.List;

import in.gopal.college.dto.NotificationDto;

public interface NotificationService {
	
	 NotificationDto createNotification(
	            String title,
	            String message
	    );

	    List<NotificationDto> getNotifications();

	    long getUnreadCount();

	    void markAsRead(Long id);

	    void markAllAsRead();
}
