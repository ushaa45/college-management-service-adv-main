package in.gopal.college.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.dto.ProfileDto;
import in.gopal.college.entity.User;
import in.gopal.college.repository.UserRepository;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
	private final UserRepository userRepository;

	@GetMapping
	public ResponseEntity<ProfileDto> getProfile(Authentication authentication) {
		
		if(authentication == null)
			return ResponseEntity.status(401).build();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProfileDto dto = new ProfileDto();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole().name());
        dto.setCreatedAt(
                user.getCreatedAt() != null
                        ? user.getCreatedAt().toString()
                        : null
        );

        return ResponseEntity.ok(dto);
    }
}
