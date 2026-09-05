package in.gopal.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import in.gopal.college.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
	
	List<AuditLog> findTop50ByOrderByTimestampDesc();

    List<AuditLog> findByUsernameOrderByTimestampDesc(String username);

}
