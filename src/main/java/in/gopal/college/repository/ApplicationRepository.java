package in.gopal.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import in.gopal.college.entity.Application;
import in.gopal.college.entity.ApplicationStatus;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

	Application findByOrderId(String orderId);
	
	List<Application> findTop5ByOrderByIdDesc();
	
	 List<Application> findByStatusAndPaymentStatus(
	            ApplicationStatus status,
	            String paymentStatus
	    );

	 @Query("SELECT COALESCE(SUM(a.amount), 0) FROM Application a WHERE a.paymentStatus = 'PAID'")
	 Double sumPaidAmount();

	 List<Application> findTop10ByPaymentStatusOrderByIdDesc(String paymentStatus);

	
}
