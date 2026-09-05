package in.gopal.college.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.gopal.college.dto.RoomDto;
import in.gopal.college.service.RoomService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {
	
	private final RoomService roomService;
	@PostMapping
	public ResponseEntity<RoomDto> create(@RequestBody RoomDto dto){
		return ResponseEntity.ok(roomService.createRoom(dto));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<RoomDto> findById(@PathVariable Long id){
		return ResponseEntity.ok(roomService.getRoomById(id));
	}
	@GetMapping
	public ResponseEntity<List<RoomDto>> getAllRoom(){
		return ResponseEntity.ok(roomService.getAllRooms());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
	    roomService.deleteRoomById(id);
	    return ResponseEntity.ok("Deleted Successfully");
	}

}
