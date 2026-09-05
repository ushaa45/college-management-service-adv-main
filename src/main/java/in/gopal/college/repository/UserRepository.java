package in.gopal.college.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);
	
}
