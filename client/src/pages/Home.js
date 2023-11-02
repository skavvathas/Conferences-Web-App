import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

// rendered in the /home route
export default function Home(){
  //const {user} = useAuthContext();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    

  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="main" style={{ height: '100vh' }}>
        <div className="container my-5">
          <div className="p-5 text-center bg-body-tertiary rounded-3">
            <svg className="bi mt-4 mb-3" width="100" height="100"></svg>
            <h1 className="text-body-emphasis">Conferences</h1>
            <p className="col-lg-8 mx-auto fs-5 text-muted">
              This is a custom jumbotron featuring an SVG image at the top, some longer text that wraps early thanks to a responsive <code>.col-*</code> className, and a customized call to action.
            </p>
            <div className="d-inline-flex gap-2 mb-5">
              <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                Create a new Conference
              </button>
              <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                Secondary link
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// user from useAuthContext
// AuthContext {user: {…}} (console)
/* user: 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI4ODU0N2MzZTU1NmY4ZmRkOGMyNmQiLCJpYXQiOjE2ODAzNzcxNTksImV4cCI6MTY4MDYzNjM1OX0.8lXzgC9zYaCz4-xhePZOmf04fq7K2Hn86IsimvXf2oA"
    user: 
      email: "skavvathas@gmail.com"
      firstName: "Spiros"
      lastName: "Kavvathas"
      password: "25f9e794323b453885f5181f1b624d0b"
      username: "skavvathas"
      __v: 0
      _id: "64288547c3e556f8fdd8c26d" */
// user.token for the token of the user
// user.user.firstName for the first name of the user
// use.user.username for the username
// etc
