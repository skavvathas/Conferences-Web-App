import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import {useConference} from "../hooks/useConference";
import {useNavigate} from "react-router-dom";

const ViewConferences = () => {
  const {user} = useAuthContext();
  const {getConfByAuthor, isLoading, error} = useConference();
  const [conferences, setConferences] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchData() {
      console.log("author: ", user.user.username);
      console.log("token: ", user.token);
      const data = await getConfByAuthor(user.user[0].username, user.token);
      console.log("17 ", data)
      setConferences(data);

      console.log("conferences: ", data);
    }

    fetchData();
  },[])

  const handleClick = (acronym, conferenceId) => (e) => {
    e.preventDefault();
    navigate(`/conferences/${acronym}/${conferenceId}`);
  };

  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
            <h1>Your Conferences:</h1>
            
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                Array.isArray(conferences) && conferences.length > 0 ? (
                  <div className="list-group" style={{ width: "70vh" }}>
                    {conferences.map(conference => (
                      <button
                        key={conference.idconference}
                        onClick={handleClick(conference.acronym, conference.conferenceId)}
                        className="list-group-item list-group-item-action">
                        {conference.title} - {conference.city} - {conference.acronym}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>No conferences to display.</div>
                )
              )}
        </div>
        <Footer/>
    </div>
  )
}

export default ViewConferences
