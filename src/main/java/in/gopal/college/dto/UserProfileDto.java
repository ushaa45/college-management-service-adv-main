package in.gopal.college.dto;

import java.time.LocalDateTime;

import in.gopal.college.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDto {

	private Long id;
    private String username;
    private Role role;
    private LocalDateTime createdAt;
}
