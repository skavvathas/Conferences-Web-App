import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';

// rendered in the /home route
export default function Home(){
  //const {user} = useAuthContext();
  const [posts, setPosts] = useState([]);
  const {user} = useAuthContext(); 

  useEffect(() => {
    

  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <div className="main" style={{ height: '100vh' }}>
        <div className="container my-5">
          <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">Hello {user.user[0].username} ({user.user[0].userId})</h1>
            <p className="col-lg-8 mx-auto fs-5 text-muted" style={{height: "20vh"}}>
              Welcome to the Web-based Reccomendation System for Scientific Conferences!
            </p>
            <div className="d-inline-flex gap-2 mb-5">
              <Link to="/createconference" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill">
                Create a new Conference
              </Link>
              <Link to="/viewconferences" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                View your Conferences
              </Link>
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
