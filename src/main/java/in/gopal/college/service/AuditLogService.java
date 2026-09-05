package in.gopal.college.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import in.gopal.college.entity.AuditLog;
import in.gopal.college.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor
public class AuditLogService {
	
	 private final AuditLogRepository auditLogRepository;

	    public void log(
	            String action,
	            String entity,
	            Long entityId,
	            String description
	    ) {

	        Authentication authentication =
	                SecurityContextHolder.getContext().getAuthentication();

	        String username = "SYSTEM";

	        if (authentication != null &&
	                authentication.isAuthenticated()) {

	            username = authentication.getName();
	        }

	        AuditLog auditLog = new AuditLog();

	        auditLog.setUsername(username);
	        auditLog.setAction(action);
	        auditLog.setEntity(entity);
	        auditLog.setEntityId(entityId);
	        auditLog.setDescription(description);
	        auditLog.setTimestamp(LocalDateTime.now());

	        auditLogRepository.save(auditLog);
	    }

	    public List<AuditLog> getRecentLogs() {
	        return auditLogRepository.findTop50ByOrderByTimestampDesc();
	    }

	    public List<AuditLog> getLogsByUsername(String username) {
	        return auditLogRepository
	                .findByUsernameOrderByTimestampDesc(username);
	    }

}
