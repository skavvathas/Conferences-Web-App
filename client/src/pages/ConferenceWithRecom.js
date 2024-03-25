import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

const ConferenceWithRecom = () => {
  const {user} = useAuthContext();
  const { id } = useParams();
  const [conferenceData, setConferenceData] = useState(null); // State to hold the response
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // take from backend the conference with id: id
    async function fetchData() {
      try {
        console.log("Fetching conference ", user.token);
        console.log("id: ", id);

        const response = await fetch(`/api/conference/id/${id}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${user.token}` }
        });

        const json = await response.json();
        setConferenceData(json); // Set the fetched data into state
        setIsLoading(false); // Update loading status
        console.log("29: ", json);

      } catch (error) {
        console.error('Error fetching conference data:', error);
        setIsLoading(false); // Update loading status even in case of error
      }
    }

    fetchData();

  }, [id]); // Dependency added to re-fetch data when id changes

  return (
    <div>
      <Header />
      <div className="main" style={{ height: '100vh' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : conferenceData ? (
          <div>
            {/* Render conference data */}
            <p>Conference Title: {conferenceData[0].title}</p>
            <p>Conference Organizer: {conferenceData[0].organizer}</p>
            {/* Add more data as needed */}
            <h1>The papers you should review are:</h1>
            
          </div>
        ) : (
          <p>No data available for this conference ID</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ConferenceWithRecom;

