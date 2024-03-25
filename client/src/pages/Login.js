import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

// rendered in the /login route
export default function Login() {
  //const router = useRouter();
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  });
  const {login, error, isLoading} = useLogin();
  const navigate = useNavigate();

  function handleChangeLogin(event){
    const { name, value } = event.target; //Destucturing
    // same with :
    // const newValue = event.target.value;
    // const inputName = event.target.name;

    setLogUser((prevValue) => {
      return {
        ...prevValue, // Hold all the previous values the same (username or password)
        [name]: value // except of [name] -> name = event.target.name and value = event.target.value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    navigate("/home")
    // Here we use the useRegister hook from /hooks/useRegister.js file
    await login(logUser.username, logUser.password); 
  }



  return (
    <div className="login">

      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{ border: "0.2rem solid black"}}>
              <div class="card-body p-5 text-center">
                <h1 className="mb-5">
                  Log In
                </h1>
                <form action="" method="post" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      onChange={handleChangeLogin}
                      name="username"
                      placeholder="Username"
                      value={logUser.username}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={handleChangeLogin}
                      name="password"
                      placeholder="Password"
                      value={logUser.password}
                      required
                      type="password"
                      pattern="[a-z0-9]{1,15}"
                      title="Password should be digits (0 to 9) or alphabets (a to z)."
                      className="form-control"
                    />
                  </div>
                  <button href="/home" className="btn btn-outline-info" type="submit">Login</button>
                  {/*error && <div>{error}</div>*/}
                </form>
                <h3 className="mb-3" style={{marginTop: "20px", fontSize: "1.2em"}}>
                  Or if you don't have acount:
                </h3>
                <Link to="/register"><button type="button" className="btn btn-outline-secondary">Register</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
      
    </div>
  );
}
