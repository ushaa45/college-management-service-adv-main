package in.gopal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

public class CollegeManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CollegeManagementServiceApplication.class, args);
	}

}
