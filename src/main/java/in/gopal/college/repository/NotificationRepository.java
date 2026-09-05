package in.gopal.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{
	
	List<Notification> findTop10ByOrderByCreatedAtDesc();
	long countByReadFalse();

}
