package in.gopal.college.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import in.gopal.college.dto.NotificationDto;
import in.gopal.college.entity.Notification;
import in.gopal.college.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	


    private final NotificationRepository notificationRepository;
    private final ModelMapper mapper;

    @Override
    public NotificationDto createNotification(
            String title,
            String message) {

        Notification notification = new Notification();

        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);

        Notification saved =
                notificationRepository.save(notification);

        return mapper.map(saved, NotificationDto.class);
    }

    @Override
    public List<NotificationDto> getNotifications() {

        return notificationRepository
                .findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(notification ->
                        mapper.map(
                                notification,
                                NotificationDto.class
                        ))
                .toList();
    }

    @Override
    public long getUnreadCount() {

        return notificationRepository.countByReadFalse();
    }

    @Override
    public void markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Notification not found"
                        ));

        notification.setRead(true);

        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead() {

        List<Notification> notifications =
                notificationRepository.findAll();

        notifications.forEach(
                notification -> notification.setRead(true)
        );

        notificationRepository.saveAll(notifications);
    }

}
