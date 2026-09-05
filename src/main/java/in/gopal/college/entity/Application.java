package in.gopal.college.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {
	


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Relation with College
    private Long collegeId;

    // Basic fields
    private String name;
    private String email;
    private String phone;
    private String course;

    private String qualification;
    private String previousSchool;
    private String marks;
    private String year;
    private String address;
    private String sop;
    
    @Column(name = "payment_status")
    private String paymentStatus; // PENDING, PAID, FAILED

    @Column(name = "order_id")
    private String orderId;

    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "amount")
    private Double amount;

    // 📸 File paths (stored in DB)
    private String photoPath;

    @ElementCollection
    private List<String> documentPaths;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable= false)
    private ApplicationStatus status;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    public void setDefaultStatus() {
        if (status == null) {
            status = ApplicationStatus.PENDING;
        }
        
        if(paymentStatus == null) {
        	paymentStatus = "PENDING";
        }
        
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

}
