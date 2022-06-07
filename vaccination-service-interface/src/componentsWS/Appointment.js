import SubmitForm from "./SubmitForm"
import Header from "./HeaderForm"
import React from 'react'

const Request = () => {

    // ADD REQUEST
    const addRequest = async (data) => {
    const res = await fetch('http://localhost:8080/appointments/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })}

   
  return (
    <div className="container">
      <a className='btn-goback' href='/'>Go back on the map</a>
      <Header />
      <SubmitForm onAdd={addRequest}/>
    </div>
  );
}

export default Request;
