package miage.api.vaccinationservice.server.controller;

import miage.api.vaccinationservice.util.CustomErrorType.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import miage.api.vaccinationservice.model.Appointment;
import miage.api.vaccinationservice.service.appointmentService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000/request")
@RestController
public class appointmentController {

    public static final Logger logger = LoggerFactory.getLogger(appointmentController.class);
    @Autowired
    appointmentService appointmentService;

    //------------------------- [GET] appointment ------------------------------------------
    @RequestMapping(value = "/appointments/", method = RequestMethod.GET)
    public ResponseEntity<?> getAppointment() {
        List<Appointment> appointments = appointmentService.getAppointments();
        if ( appointments == null){
            return new ResponseEntity(new CustomErrorType("No appointment"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(appointments,HttpStatus.OK);

    }

    //------------------------ [POST]  appointment-------------------
    @RequestMapping(value="/appointments/",method = RequestMethod.POST)
    public ResponseEntity<String> createAppointment(@RequestBody Appointment appointment, UriComponentsBuilder ucBuilder){
        appointmentService.saveAppointment(appointment);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/appointments/{id}").buildAndExpand(appointment.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }



    //------------------------- [PUT]  appointment ---------------------

    @RequestMapping(value="/appointments/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Appointment> updateAppointment(@PathVariable("id") long id, @RequestBody Appointment appointment){
        Appointment currentA = appointmentService.getAppointment(id);
        currentA.setFirstName(appointment.getFirstName());
        currentA.setLastName(appointment.getLastName());
        currentA.setSex(appointment.getSex());
        currentA.setAge(appointment.getAge());
        currentA.setNum(appointment.getNum());
        currentA.setComment(appointment.getComment());
        appointmentService.updateAppointment(currentA);
        return new ResponseEntity<>( currentA, HttpStatus.OK);
    }


    //------------------------- [DELETE] appointment ---------------------
    @RequestMapping (value="/appointments/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Appointment> deleteAppointment(@PathVariable("id") long id){
        appointmentService.deleteAppointment(id);
        return  new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }


}
