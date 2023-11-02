import React, {useState} from "react";
import { Link } from 'react-router-dom';

// rendered in the /select route
const Select = () => {
    return (
        <div className="center">
            <h1>Your personal space for conferences management</h1>
            <Link to="/login"><button type="button" className="btn btn-outline-info" style={{margin: "20px"}}>Login</button></Link>
            <Link to="/register"><button type="button" class="btn btn-outline-success">Register</button></Link>
        </div>
    );
}

export default Select;