package in.gopal.college.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "audit_log")
@Getter
@Setter
public class AuditLog {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String username;

	    @Column(nullable = false)
	    private String action;

	    @Column(nullable = false)
	    private String entity;

	    private Long entityId;

	    @Column(length = 500)
	    private String description;

	    @Column(nullable = false)
	    private LocalDateTime timestamp;

	    @PrePersist
	    public void onCreate() {
	        if (timestamp == null) {
	            timestamp = LocalDateTime.now();
	        }
	    }
}
