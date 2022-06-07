'use strict';



import React from "react";
import Appointment from "../../web-services-vaccines/src/componentsWS/Appointment";

class Friends extends React.Component {
    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.appointments && this.props.appointments.map(appointment => {
                        return <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.sex}</td>
                            <td>{appointment.age}</td>
                            <td>{appointment.comment}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        );
    }
  }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      firstName: '',
      id: '',
      lastName: '',
      sex :'',
      age :"",
      comment :"",

    };

    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // get all entities - GET
    fetch("http://localhost:8080/appointments/", {
      "method": "GET",
      "headers": {
          'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        appointments: response
      })
    })
    .catch(err => { console.log(err); 
    });
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch(`http://localhost:8080/appointments/${this.state.id}`, {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
        },
        "body": JSON.stringify({
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,

        })
        })
        .then(response => response.json())
        .then(response => { console.log(response);
        })
        .catch(err => { console.log(err); });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`http://localhost:8080/appointments/${this.state.id}`, {
      "method": "DELETE",
      "headers": {
          "content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Call Center Management</h1>
              <form className="d-flex flex-column">
                <legend className="text-center">Appointments</legend>
                  <label htmlFor="id">
                      ID:
                      <input
                          name="id"
                          id="id"
                          type="text"
                          className="form-control"
                          value={this.state.id}
                          onChange={(e) => this.handleChange({ id: e.target.value })}
                      />
                  </label>
                <label htmlFor="firstName">
                  First Name:
                  <input
                    name="firstName"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                  <label htmlFor="lastName">
                      Last Name:
                      <input
                          name="lastName"
                          id="name"
                          type="text"
                          className="form-control"
                          value={this.state.lastName}
                          onChange={(e) => this.handleChange({ name: e.target.value })}
                          required
                      />
                  </label>
                  <label htmlFor="Age">
                      Age:
                      <input
                          name="Age"
                          id="age"
                          type="text"
                          className="form-control"
                          value={this.state.age}
                          onChange={(e) => this.handleChange({ name: e.target.value })}
                          required
                      />
                  </label>
                  <label htmlFor="Sex">
                      Sex:
                      <input
                          name="Sex"
                          id="sex"
                          type="text"
                          className="form-control"
                          value={this.state.sex}
                          onChange={(e) => this.handleChange({ name: e.target.value })}
                          required
                      />
                  </label>
                <label htmlFor="notes">
                  Comment:
                  <input
                    name="notes"
                    id="notes"
                    type="text"
                    className="form-control"
                    value={this.state.notes}
                    onChange={(e) => this.handleChange({ notes: e.target.value })}
                    required
                    />
                </label>

                <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                    Update
                </button>
                <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                    Delete
                </button>
              </form>
              <Appointment appointment={this.state.appointments} />
            </div>
          </div>
        </div>
    );
  }
}

let domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);