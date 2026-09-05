package in.gopal.college.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import in.gopal.college.repository.UserRepository;

import in.gopal.college.dto.AuthResponse;
import in.gopal.college.dto.LoginRequest;
import in.gopal.college.dto.RefreshRequest;
import in.gopal.college.dto.UserProfileDto;
import in.gopal.college.entity.ChangePasswordRequest;
import in.gopal.college.entity.RefreshToken;
import in.gopal.college.entity.Role;
import in.gopal.college.entity.User;
import in.gopal.college.security.CustomUserDetails;
import in.gopal.college.security.JwtService;
import in.gopal.college.service.RefreshTokenService;
//import in.gopal.college.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final RefreshTokenService refreshTokenService;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;   // ✅ ADD
	private final UserRepository userRepository;     // ✅ ADD
	private final AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){

        try {
            Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
             
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            String accessToken = jwtService.generateToken(user);
            String refreshToken = refreshTokenService.createRefreshToken(user).getToken();

            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody RefreshRequest request) {

	    refreshTokenService.deleteByToken(request.getRefreshToken());

	    return ResponseEntity.ok("Logged out successfully");
	}
//	@PostMapping("/register")
//	public String register(@RequestBody User user) {
//	    user.setPassword(passwordEncoder.encode(user.getPassword()));
//	    userRepository.save(user);
//	    return "User registered";
//	}
	@PostMapping("/register")
	@PreAuthorize("hasRole('ADMIN')")
	public String register(@RequestBody User user) {

	    // convert String → Enum
	    if (user.getRole() == null) {
	        user.setRole(Role.USER); // default
	    }

	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    userRepository.save(user);

	    return "User registered";
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?>refresh(@RequestBody RefreshRequest request){
		
		 // 1️⃣ Verify refresh token
        RefreshToken refreshToken =
                refreshTokenService.verify(request.getRefreshToken());

        // 2️⃣ Generate new access token
        String newAccessToken =
                jwtService.generateToken(refreshToken.getUser());

        // 3️⃣ Return response
        return ResponseEntity.ok(
                new AuthResponse(
                        newAccessToken,
                        request.getRefreshToken()
                )
        );
    }
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile() {

	    Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();

	    String username = authentication.getName();

	    User user = userRepository.findByUsername(username)
	            .orElseThrow(() -> new RuntimeException("User not found"));
	    
	    UserProfileDto profile = new UserProfileDto(
	            user.getId(),
	            user.getUsername(),
	            user.getRole(),
	            user.getCreatedAt()
	    );

	    return ResponseEntity.ok(profile);
	}
	
	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(
	        @RequestBody ChangePasswordRequest request) {

	    Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();
	    
	    String username = authentication.getName();

	    User user = userRepository.findByUsername(username)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
	        return ResponseEntity
	                .badRequest()
	                .body("Current password is incorrect");
	    }

	    if (request.getNewPassword() == null || request.getNewPassword().length() < 6) {
	        return ResponseEntity
	                .badRequest()
	                .body("New password must be at least 6 characters");
	    }

	    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
	    userRepository.save(user);

	    return ResponseEntity.ok("Password updated successfully");
	}
}
