package in.gopal.college.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import in.gopal.college.entity.RefreshToken;
import in.gopal.college.entity.User;
import in.gopal.college.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	 private final RefreshTokenRepository refreshTokenRepository;

	    private final long refreshTokenDurationMinutes = 10080; // 7 days

	    // ✅ FIX: Transaction added here
	    @Transactional
	    public RefreshToken createRefreshToken(User user) {

//	        // 🔥 delete needs transaction
//	        refreshTokenRepository.deleteByUser(user);
//
//	        RefreshToken refreshToken = new RefreshToken();
//	        refreshToken.setUser(user);
//	        refreshToken.setToken(UUID.randomUUID().toString());
//	        refreshToken.setExpiryDate(
//	                LocalDateTime.now().plusMinutes(refreshTokenDurationMinutes)
//	        );
//	        return refreshTokenRepository.save(refreshToken);
	    	
	    	RefreshToken refreshToken = refreshTokenRepository
	                .findByUser(user)
	                .orElse(new RefreshToken());

	        refreshToken.setUser(user);
	        refreshToken.setToken(UUID.randomUUID().toString());
	        refreshToken.setExpiryDate(
	                LocalDateTime.now().plusMinutes(refreshTokenDurationMinutes)
	        );

	        return refreshTokenRepository.save(refreshToken);
	    }

	    public RefreshToken verify(String token) {

	        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
	                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

	        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
	            refreshTokenRepository.delete(refreshToken);
	            throw new RuntimeException("Refresh token expired");
	        }

	        return refreshToken;
	    }

	    @Transactional
	    public void deleteByUserId(Long userId) {
	        refreshTokenRepository.deleteByUserId(userId);
	    }

	    @Transactional
	    public void deleteByToken(String token) {
	        refreshTokenRepository.deleteByToken(token);
	    }

	    @Transactional
	    public void deleteByUser(User user) {
	        refreshTokenRepository.deleteByUser(user);
	    }
	    
}
