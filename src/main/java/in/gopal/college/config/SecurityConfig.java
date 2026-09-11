package in.gopal.college.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import in.gopal.college.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthFilter jwtAuthFilter;
	private final CorsConfigurationSource corsConfigurationSource; 	
//	User Login → Generate Token → 
//	Client sends Token in Header → 
//	Filter validates token → 
//	Access Granted
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http.csrf(csrf-> csrf.disable())
		    .cors(cors -> cors.configurationSource(corsConfigurationSource)) //enable CORS
		    .authorizeHttpRequests(auth -> auth
	                .requestMatchers(
	                    "/swagger-ui/**",
	                    "/v3/api-docs/**",
	                    "/auth/**",
	                    "/uploads/**",
	                    "/api/applications/**",
	                    "/api/payment/**",
	                    "/api/search/**",
	                    "/api/college/**",
	                    "/api/libraries/**",
	                    "/api/hostel/**",
	                    "/api/room/**",
	                    "/api/dashboard/**",
	                    "/api/notifications/**",
	                    "/api/audit-logs/**"
	                ).permitAll()
	                
	                  // Profile requires login
	                .requestMatchers("/api/profile/**").authenticated()
	                // everything else requires authentication
	                .anyRequest().authenticated()
		    	)
			.addFilterBefore(jwtAuthFilter,UsernamePasswordAuthenticationFilter.class);
	
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
	    return config.getAuthenticationManager();
	}

}
