import {useState} from 'react'
import React from 'react'


const AddRequest = ({onAdd}) => {

    const [firstName,setName] = useState("")
    const [lastName,setLastname] = useState("")
    const [num,setPhone] = useState("")
    const [sex,setSex] = useState("")
    const [age,setAge] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!firstName){
            alert('please add text')
            return
        }

        // FETCH THE SPRING BOOT API
        onAdd({lastName,firstName,age,sex,num})
        alert('Your request has been sent.')

        setName('')
        setLastname('')
        setPhone('')
        setSex('')
        setAge('')

    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Name</label>
                <input type='text' placeholder='Your  first name' value={firstName} onChange={(e)=> setName(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Last name</label>
                <input type='text' placeholder='Your last name' value={lastName} onChange={(e)=> setLastname(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Gender</label>
                <input type='text' placeholder='(M ou F)' value={sex} onChange={(e)=> setSex(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Age</label>
                <input type='text' placeholder='...' value={age} onChange={(e)=> setAge(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Phone</label>
                <input type='text' placeholder='+33 6 10 20 30 40' value={num} onChange={(e)=> setPhone(e.target.value)}></input>
            </div>
            {/* <div className="form-control form-control-check">
                <label>Set reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}></input>
            </div> */}
            <input type="submit" value="CALL ME ASAP" className="btn btn-block"></input>
        </form>
    )
}

export default AddRequest
