package in.gopal.college.controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import in.gopal.college.entity.Application;
import in.gopal.college.entity.ApplicationStatus;
import in.gopal.college.repository.ApplicationRepository;
import in.gopal.college.service.AuditLogService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final ApplicationRepository applicationRepository;
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;
    
    private final AuditLogService auditLogService;

    @PostMapping("/create-order/{appId}")
    public ResponseEntity<?> createOrder(@PathVariable Long appId) {

        try {
        	 Application app = applicationRepository
                     .findById(appId)
                     .orElseThrow(() -> new RuntimeException("Application not found"));
        	
        	 // Payment is allowed only for APPROVED applications
        	 
        	 if (app.getStatus() != ApplicationStatus.PAYMENT_PENDING) {
        		    return ResponseEntity
        		            .badRequest()
        		            .body("Payment is available only for applications awaiting payment");
        		}
        	 
        	 // Do not create another order if already paid
        	 if ("PAID".equals(app.getPaymentStatus())) {
                 return ResponseEntity
                         .badRequest()
                         .body("Payment is already completed");
             }
        	 
            int amount = 50000; // ₹500 in paise

            RazorpayClient razorpay =
                    new RazorpayClient(keyId, keySecret);

            JSONObject options = new JSONObject();
            options.put("amount", amount);
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = razorpay.orders.create(options);

//            Application app = applicationRepository
//                    .findById(appId)
//                    .orElseThrow();

            app.setOrderId(order.get("id"));
            app.setAmount((double) amount);
            app.setPaymentStatus("PENDING");

            applicationRepository.save(app);

            return ResponseEntity.ok(order.toJson().toString());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body("Payment error: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, String> data) {
    	
    	try {

        String paymentId = data.get("paymentId");
        String orderId = data.get("orderId");
        String signature = data.get("signature");
        
        if (paymentId == null || orderId == null || signature == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Payment details are missing");
        }
        
        Application app =
                applicationRepository.findByOrderId(orderId);

        if (app == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid order");
        }
        
     // Application must be approved
        if (app.getStatus() != ApplicationStatus.PAYMENT_PENDING) {
            return ResponseEntity
                    .badRequest()
                    .body("Application is not awaiting payment");
        }

        // Already paid
        if ("PAID".equals(app.getPaymentStatus())) {
            return ResponseEntity
                    .badRequest()
                    .body("Payment is already completed");
        }

        // Razorpay signature verification
        String payload = orderId + "|" + paymentId;

        boolean isValid = Utils.verifySignature(
                payload,
                signature,
                keySecret
        );

        if (!isValid) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid payment signature");
        }

     // Payment verified successfully
        app.setPaymentId(paymentId);
        app.setPaymentStatus("PAID");
        app.setStatus(ApplicationStatus.PAID);
        
        Application application = applicationRepository.save(app);
        
        auditLogService.log(
        	    "PAYMENT_VERIFIED",
        	    "Application",
        	    application.getId(),
        	    "Payment verified successfully. Payment ID: " + paymentId
        	);

        return ResponseEntity.ok("Payment successful");
    }catch (Exception e) {
    	  e.printStackTrace();

          return ResponseEntity
                  .status(500)
                  .body("Payment verification failed: " + e.getMessage());
      }
	}
    
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingPayments() {

    	return ResponseEntity.ok(
    	        applicationRepository.findByStatusAndPaymentStatus(
    	            ApplicationStatus.PAYMENT_PENDING,
    	            "PENDING"
    	        )
    	    );
    }
    
    @GetMapping("/recent")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getRecentPayments() {

        List<Application> recent =
                applicationRepository.findTop10ByPaymentStatusOrderByIdDesc("PAID");

        return ResponseEntity.ok(
                recent.stream().map(app -> Map.of(
                        "id", app.getId(),
                        "applicantName", app.getName(),
                        "amount", app.getAmount(),
                        "status", app.getPaymentStatus(),
                        "paymentId", app.getPaymentId() != null ? app.getPaymentId() : ""
                )).toList()
        );
    }
}