import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import {useConference} from "../hooks/useConference";
import {useNavigate} from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';

const JoinConference = () => {
  const {user} = useAuthContext();
  const {getConfByAuthor, isLoading, error} = useConference();
  const [conferences, setConferences] = useState();
  const navigate = useNavigate();
  const [id, setId] = useState();

  useEffect(()=>{

  },[])

  const handleClick = (conferenceId) => (e) => {
    e.preventDefault();
    navigate(`/conferencerecommendation/${conferenceId}`);
  };

  function handleChange(event){
    const {name, value} = event.target; //Destucturing
    // same with :
    // const newValue = event.target.value;
    // const inputName = event.target.name;

    setId(value);

    console.log("id-> ", id);
  }

  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
          <div class="container text-center">
            <h1 className="fw-semibold" style={{marginTop:"50px"}}>Put the conference id to enter the conference: </h1>
            <input
                onChange={handleChange}
                name="conferenceId"
                placeholder="Put the conference id"
                value={id}
                required
                className="form-control"
            />
            <Button
              as={RouterLink} // Render Button as RouterLink
              to={`/conferencerecommendation/${id}`} // Specify the destination route
              colorScheme="messenger"
              size="lg"
              marginTop="1rem"
            >
              Enter the conference
            </Button>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default JoinConference
