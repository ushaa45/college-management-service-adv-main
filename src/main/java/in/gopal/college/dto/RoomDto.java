package in.gopal.college.dto;

import lombok.Data;

@Data
public class RoomDto {

	private Long roomId;
    private String roomNumber;
    private Integer capacity;
    private Long hostelId;
    private String hostelName;
}
