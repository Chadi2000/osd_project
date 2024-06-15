import React, { Fragment } from 'react'

function Registration() {
  return (
    <Fragment>
         <div>Registration</div>
         <label>Name</label>
         <input type='text' id='txtName' placeholder='Enter Name'  /><br></br>
         <label>Phone Number</label>
         <input type='text' id='txtPhoneNo' placeholder='Enter Phone No' /><br></br>
         <label>Address</label>
         <input type='text' id='txtAddress' placeholder='Enter Address' /><br></br>
         <button>Save</button>
    </Fragment>
  )
}

export default Registration;
