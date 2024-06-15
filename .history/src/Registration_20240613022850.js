import React, { Fragment, useState } from 'react'
import axios from 'axios';

function Registration() {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = (value) =>{
        setName(value)
    }

    const handlePhoneNoChange = (value) =>{
        setPhoneNo(value)
    }

    const handleAddressChange = (value) =>{
        setAddress(value)
    }

    const handleSave = () => {
        const data = {
            Name: name,
            PhoneNo: phoneNo,
            Address: address,
            IsActive: 1
        };
        const url = 'https://localhost:44387/api/Test/Registration';
        axios.post(url,data).then((result) =>{
            alert(result.data);
        }).catch((error)=>{
            alert(error);
        })


    }

  return (
    <Fragment>
         <div>Registration</div>
         <label>Name</label>
         <input type='text' id='txtName' placeholder='Enter Name' onChange={(e) => handleNameChange(e.target.value)} /><br></br>
         <label>Phone Number</label>
         <input type='text' id='txtPhoneNo' placeholder='Enter Phone No' onChange={(e) => handlePhoneNoChange(e.target.value)} /><br></br>
         <label>Address</label>
         <input type='text' id='txtAddress' placeholder='Enter Address' onChange={(e) => handleAddressChange(e.target.value)} /><br></br>
         <button onClick={() => handleSave()}>Save</button>
    </Fragment>
  )
}

export default Registration;
