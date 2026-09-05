package in.gopal.college.service;

import java.util.List;

//import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import in.gopal.college.dto.RoomDto;
import in.gopal.college.entity.Hostel;
import in.gopal.college.entity.Room;
import in.gopal.college.repository.HostelRepository;
import in.gopal.college.repository.RoomRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

	private final RoomRepository roomRepository;
	private final HostelRepository hostelRepository;
	private final AuditLogService auditLogService;
	//private final ModelMapper mapper;
	@Override
	public RoomDto createRoom(RoomDto dto) {
		
		Room room = new Room();
		
		
		room.setRoomNumber(dto.getRoomNumber());
		room.setCapacity(dto.getCapacity());
		
		Hostel hostel =	hostelRepository.findById(dto.getHostelId())
						.orElseThrow(() -> new RuntimeException(
								"Hostel not found with this Id : " + dto.getHostelId()));
		room.setHostel(hostel);
		
		Room saved = roomRepository.save(room);
		
		auditLogService.log(
			    "CREATED",
			    "Room",
			    saved.getRoomId(),
			    "Created Room " + saved.getRoomNumber()
			);
		
		// Convert Entity → DTO
        RoomDto response = new RoomDto();

        // Set hostelId manually
        response.setRoomId(saved.getRoomId());
        response.setRoomNumber(saved.getRoomNumber());
        response.setCapacity(saved.getCapacity());
        
        if(saved.getHostel() != null) {
        	response.setHostelId(
        			saved.getHostel().getHostelId());
        }

        return response;
	}
	@Override
	public RoomDto getRoomById(Long id) {
		
		Room room = roomRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Room not found"));
		
//		RoomDto response = mapper.map(room, RoomDto.class);
//
//        if (room.getHostel() != null) {
//            response.setHostelId(
//                    room.getHostel().getHostelId()
//            );
//        }
//
//        return response;
		return toDto(room);
	}
	@Override
	public List<RoomDto> getAllRooms() {
		
//		 return roomRepository.findAll()
//	                .stream()
//	                .map(room -> {
//
//	                    RoomDto dto = mapper.map(room, RoomDto.class);
//
//	                    if (room.getHostel() != null) {
//	                        dto.setHostelId(
//	                                room.getHostel().getHostelId()
//	                        );
//	                    }
//
//	                    return dto;
//	                })
//	                .toList();
		return roomRepository.findAll()
				.stream()
				.map(this::toDto)
				.toList();
	}
	
	@Override
	public void deleteRoomById(Long id) {
		 Room room = roomRepository.findById(id)
		            .orElseThrow(() ->
		                    new RuntimeException(
		                            "Room not found with this id: " + id
		                    ));

		roomRepository.deleteById(id);
		
		auditLogService.log(
			    "DELETED",
			    "Room",
			    room.getRoomId(),
			    "Deleted Room " + room.getRoomNumber()
			);
		
	}
	
	private RoomDto toDto(Room room) {
		RoomDto dto = new RoomDto();

        dto.setRoomId(room.getRoomId());
        dto.setRoomNumber(room.getRoomNumber());
        dto.setCapacity(room.getCapacity());

        if (room.getHostel() != null) {
            dto.setHostelId(
                room.getHostel().getHostelId()
            );
            dto.setHostelName(room.getHostel().getHostelName());
        }

        return dto;
	}

}
