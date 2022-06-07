package miage.api.vaccinationservice.service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import miage.api.vaccinationservice.model.Appointment;
import org.springframework.stereotype.Service;


@Service( "appointmentService" )
public class appointmentServiceImpl implements appointmentService{
    private static final AtomicLong counter = new AtomicLong();
    private static List<Appointment> appointments;
    static {
        appointments = populateDummyUsers();
    }
    @Override
    public  List<Appointment> getAppointments() {
        return appointments;
    }

    @Override
    public Appointment getAppointment(long id) {
        for(Appointment appointment: appointments){
            if(appointment.getId()==id){
                return appointment;
            }
        }
        return null;
    }

    @Override
    public void saveAppointment(Appointment appointment) {
        appointment.setId(counter.incrementAndGet());
        appointments.add(appointment);


    }

    @Override
    public void updateAppointment(Appointment appointment) {
        int index = appointments.indexOf(appointment);
        appointments.set(index,appointment);


    }


    @Override
    public void deleteAppointment(long id) {
        appointments.removeIf(appointment -> appointment.getId() == id);

    }
    private static List<Appointment> populateDummyUsers(){
        List<Appointment> appointments = new ArrayList<Appointment>();
        appointments.add(new Appointment(counter.incrementAndGet(),"Delabre", "Alexis",78,"M","+33789675423"));
        appointments.add(new Appointment(counter.incrementAndGet(),"Marie-Sainte", "Miguel",22,"M","+33789786453"));
        appointments.add(new Appointment(counter.incrementAndGet(),"Dupont", "Tom",71,"M","+33522675423"));
        appointments.add(new Appointment(counter.incrementAndGet(),"Gaudout", "Benoit",30,"M","+33789751324"));
        return appointments;
    }
}
