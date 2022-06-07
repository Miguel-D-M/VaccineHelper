package miage.api.vaccinationservice.server;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

import miage.api.vaccinationservice.model.Appointment;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"miage.api.vaccinationservice"})
public class VaccinationServiceApplication {

	public static void main(String[] args) throws IOException, ParseException {
		SpringApplication.run(VaccinationServiceApplication.class, args);

	}

}
