import React, {useEffect} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
  const {user} = useAuthContext(); 

  useEffect(() => {
    console.log(user);
    console.log(user.user.username);
  },[])

  return (
    <div>
      <Header/>
      <div className="container d-flex justify-content-center" style={{marginTop: "30px", marginBottom: "100px", height: '100vh' }}>
        <div className="card2 p-3 py-4">
          <div className="text-center">
            <img src="https://i.imgur.com/stD0Q19.jpg" width="100" className="rounded-circle"/>
            <h3 className="mt-2">{user.user.firstName} {user.user.lastName}</h3>
            <span className="mt-1 clearfix">{user.user.email}</span>
            
            <div className="row mt-3 mb-3">
              <div>
                <h5>Conferences</h5>
                <span className="num">10</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Profile