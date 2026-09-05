package in.gopal.college.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.RefreshToken;
import in.gopal.college.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	Optional<RefreshToken> findByToken(String token);
	void deleteByUserId(Long userId);
	void deleteByToken(String token);
	void deleteByUser(User user);
	Optional<RefreshToken> findByUser(User user);
}
