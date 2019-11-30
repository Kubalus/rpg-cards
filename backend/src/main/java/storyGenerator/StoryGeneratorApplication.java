package storyGenerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StoryGeneratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoryGeneratorApplication.class, args);
	}

}
