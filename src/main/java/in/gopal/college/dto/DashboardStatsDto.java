package in.gopal.college.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDto {

	 private long students;
	    private long colleges;
	    private long books;
	    private long rooms;
	    private long hostel;
	    private long applications;
	    private double paymentsTotal;
}
