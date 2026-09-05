package in.gopal.college.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.RequiredArgsConstructor;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

	private final JwtService jwtService; // your JWT util class
	private final CustomUserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");
		
		System.out.println("Request: " + request.getRequestURI());
	    System.out.println("Authorization: " + authHeader);

		// ✅ No token → continue
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = authHeader.substring(7);
		String username = null;
		try {
			username = jwtService.extractUsername(token);
			System.out.println("JWT username: " + username);
		} catch (Exception e) {
			System.out.println("JWT extraction failed: " + e.getMessage());
			filterChain.doFilter(request, response);
			return;
		}

		// ✅ If user not already authenticated
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			// ✅ Validate token
			if (jwtService.validateToken(token, userDetails)) {

				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());

				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				// 🔥 MOST IMPORTANT LINE
				SecurityContextHolder.getContext().setAuthentication(authToken);
				
				System.out.println("Authentication set for: " + username);
			}
		}

		filterChain.doFilter(request, response);
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String     path = request.getServletPath();
		return     path.equals("/auth/login") ||
		           path.equals("/auth/register") ||
		           path.equals("/auth/refresh") ||
		           path.startsWith("/swagger") ||
		           path.startsWith("/v3/api-docs") ||
		           path.startsWith("/api/payment") ||        
		          // path.startsWith("/api/applications") || 
		          // path.startsWith("/api/college/add") ||
		           path.startsWith("/api/dashboard") ||
		           path.startsWith("/api/profile") ||
		           path.equals("/auth/logout") ;
				   
	}
}