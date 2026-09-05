package in.gopal.college.service;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import in.gopal.college.entity.Application;
import in.gopal.college.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ApplicationRepository repository;

    private final String KEY = "YOUR_KEY";
    private final String SECRET = "YOUR_SECRET";

    public String createOrder(Long applicationId) throws Exception {

        RazorpayClient client = new RazorpayClient(KEY, SECRET);

        int amount = 50000; // ₹500

        JSONObject options = new JSONObject();
        options.put("amount", amount);
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());

        Order order = client.orders.create(options);

        Application app = repository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setOrderId(order.get("id"));
        app.setPaymentStatus("PENDING");
        app.setAmount(amount / 100.0);

        repository.save(app);

        return order.toString();
    }

    public void verifyPayment(Map<String, String> data) throws Exception {

        String orderId = data.get("orderId");
        String paymentId = data.get("paymentId");
        String signature = data.get("signature");

        // ✅ Signature verification
        String payload = orderId + "|" + paymentId;

        String generatedSignature = hmacSHA256(payload, SECRET);

        if (!generatedSignature.equals(signature)) {
            throw new RuntimeException("Invalid payment signature");
        }

        Application app = repository.findByOrderId(orderId);

        if (app == null) {
            throw new RuntimeException("Application not found");
        }

        app.setPaymentId(paymentId);
        app.setPaymentStatus("PAID");

        repository.save(app);
    }

    private String hmacSHA256(String data, String key) throws Exception {
        javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
        javax.crypto.spec.SecretKeySpec secretKey =
                new javax.crypto.spec.SecretKeySpec(key.getBytes(), "HmacSHA256");

        mac.init(secretKey);
        byte[] hash = mac.doFinal(data.getBytes());

        return new String(org.apache.commons.codec.binary.Hex.encodeHex(hash));
    }
}
