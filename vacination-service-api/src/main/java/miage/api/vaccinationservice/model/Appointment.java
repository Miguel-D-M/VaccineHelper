package miage.api.vaccinationservice.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.awt.*;

@JsonPropertyOrder({"id","lastName","firstName","age","sex","num"})
public class Appointment {
    private long id;
    private String lastName;
    private String firstName;
    private Integer age;
    private String sex;
    private String num;
    private String comment;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Appointment(long id, String lastName, String firstName, Integer age, String sex, String num) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.sex = sex;
        this.num = num;
        this.comment = null;
    }
}
