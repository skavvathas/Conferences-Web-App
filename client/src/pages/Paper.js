import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { usePaper } from "../hooks/usePaper";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button, CardBody, CardFooter } from '@chakra-ui/react';

const Paper = () => {
  const { id } = useParams(); // conferenceId CHECK THE NAMES TO BE SAME 
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [paper, setPaper] = useState({
      userId: "",
      conferenceId: "",
      title: "",
      abstract: ""
  });
  const {insertPaper, isLoading, error} = usePaper();

  function handleChange(event){
    const { name, value } = event.target; //Destucturing

    console.log("name: ", name, " value: ", value);

    setPaper((prevValue) => {
      return {
        ...prevValue, // Hold all the previous values the same
        [name]: value // except of [name] -> name = event.target.name and value = event.target.value
      };
    });
  }

  /*async function handleSubmit(e) {
    e.preventDefault()
    //navigate("/home")
    console.log("########### user-token: ", user.token);
    // Here we use the useRegister hook from /hooks/useRegister.js file
    await insertPaper(paper.title, paper.abstract, user.token);
    console.log("345321");
    navigate(`/conferences`);
  }*/

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("########### user-token: ", user.token);
    // Here we use the useRegister hook from /hooks/useRegister.js file
    try {
        await insertPaper(id, paper.title, paper.abstract, user.token);
        console.log("345321");
        navigate(`/conferences`);
    } catch (error) {
        console.error("Error inserting paper:", error);
        // Display error message to the user
        // For example:
        // setError("Error inserting paper: " + error.message);
    }
  }

  useEffect(() => {
    setPaper(prevConf => ({
        ...prevConf,
        userId: user.user[0].userId,
        conferenceId: id,
    }));
  }, [])

  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
          <Heading style={{marginTop: "30px"}}>Add a single paper</Heading>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="conferenceTitle" className="form-label">Paper title</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="title"
                style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                value={paper.title}
                required
              />
            </div>
            <div className="mb-3">
              <label for="conferenceAcronym" className="form-label">Abstract</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                name="abstract"
                style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                value={paper.abstract}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
        <Footer/>
    </div>
  )
}

export default Paper