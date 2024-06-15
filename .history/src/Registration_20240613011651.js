import React, { Fragment, useState } from 'react'

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

  return (
    <Fragment>
         <div>Registration</div>
         <label>Name</label>
         <input type='text' id='txtName' placeholder='Enter Name' onChange={(e) => handleNameChange(e.target.value)} /><br></br>
         <label>Phone Number</label>
         <input type='text' id='txtPhoneNo' placeholder='Enter Phone No' onChange={(e) => handlePhoneNoChange(e.target.value)} /><br></br>
         <label>Address</label>
         <input type='text' id='txtAddress' placeholder='Enter Address' onChange={(e) => handleAddressChange(e.target.value)} /><br></br>
         <button>Save</button>
    </Fragment>
  )
}

export default Registration;
