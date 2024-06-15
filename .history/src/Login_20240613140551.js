import React, { Fragment, useState } from "react";
import axios from "axios";

function Login(){


    return(
        <Fragment>
            <input type='text' id='txtName' placeholder='Enter Name' onChange={(e) => handleNameChange(e.target.value)} /><br></br>
            <label>Phone Number</label>
            <input type='text' id='txtPhoneNo' placeholder='Enter Phone No' onChange={(e) => handlePhoneNoChange(e.target.value)} /><br></br>
            <button onClick={() => handleLogin()}>Login</button>
        </Fragment>
    )
}


export default Login;