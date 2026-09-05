package in.gopal.college.service;

import java.util.List;
import in.gopal.college.dto.RoomDto;

public interface RoomService {

	RoomDto createRoom(RoomDto dto);
	RoomDto getRoomById(Long id);
	List<RoomDto> getAllRooms();
	void deleteRoomById(Long id);
}
