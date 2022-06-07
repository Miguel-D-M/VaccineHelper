package miage.api.vaccinationservice.service;
import miage.api.vaccinationservice.model.Appointment;

import java.util.List;

public interface appointmentService {
    List<Appointment> getAppointments();
    Appointment getAppointment(long id);
    void saveAppointment(Appointment appointment);

    void updateAppointment(Appointment appointment);

    void deleteAppointment (long id);

}
