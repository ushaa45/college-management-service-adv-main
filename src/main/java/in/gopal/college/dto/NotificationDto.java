package in.gopal.college.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NotificationDto {
	private Long id;

    private String title;

    private String message;

    private boolean read;

    private LocalDateTime createdAt;

}
