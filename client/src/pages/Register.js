import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useRegister} from "../hooks/useRegister";

// rendered in the /register route
export default function Register() {

  const [regUser, setRegUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const {register, error, isLoading} = useRegister();
  const navigate = useNavigate();

  function handleChangeRegister(event){
    const { name, value } = event.target; //Destucturing
    // same with :
    // const newValue = event.target.value;
    // const inputName = event.target.name;

    setRegUser((prevValue) => {
      return {
        ...prevValue, // Hold all the previous values the same (firstName, lastName, etc)
        [name]: value // except of [name] -> name = event.target.name and value = event.target.value
      };
    });
  }

  async function isAllValid(event){
    //lastname firstname email->@ password->one number and 8 letter minimum
    if(regUser.firstName.length === 0 || regUser.lastName.length === 0 || regUser.username.length < 4){
      alert("Check the fields!");
      event.preventDefault();
    }

    if(!regUser.email.includes("@")){
      alert("The email must conclude '@'");
      event.preventDefault();
    }

    if(regUser.password.length < 8){
      alert("The length of password must be > 8");
      event.preventDefault();
    }

    if(!/\d/.test(regUser.password)){
      alert("The password must have a number");
      event.preventDefault();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Here we use the useRegister hook from /hooks/useRegister.js file
    await register(regUser.firstName, regUser.lastName, regUser.email, regUser.username, regUser.password);

    //navigate("/home")
  }

  return (
    <div>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{ border: "0.2rem solid black"}}>
              <div class="card-body p-5 text-center">
                <h1 className="mb-5">
                  Create Account
                </h1>
                <form action="" method="post" className="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      onChange={handleChangeRegister}
                      name="firstName"
                      placeholder="First Name"
                      value={regUser.firstName}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      onChange={handleChangeRegister}
                      name="lastName"
                      placeholder="Last Name"
                      value={regUser.lastName}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={handleChangeRegister}
                      name="email"
                      placeholder="Email"
                      value={regUser.email}
                      required
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={handleChangeRegister}
                      name="username"
                      placeholder="Username"
                      value={regUser.username}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      onChange={handleChangeRegister}
                      name="password" 
                      placeholder="Password" 
                      value={regUser.password} 
                      required 
                      type="password" 
                      className="form-control"
                    />
                  </div>

                  <button name="Submit" onClick={isAllValid} className="btn btn-primary" disabled={isLoading}>Register</button>
                  {error && <div style={{color: "red"}}>{error}</div>}
                </form>
                <h3 className="mb-3" style={{marginTop: "20px", fontSize: "1.2em"}}>
                  Or if you have acount:
                </h3>
                <Link to="/login"><button type="button" className="btn btn-outline-secondary">Login</button></Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  );
}