import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useConference } from "../hooks/useConference";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardHeader, Container, Heading, Flex} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

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
    <Box>
        <Header/>
          <Flex direction={{ base: "column", sm: "row" }} align="center" justify="center" wrap="wrap" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
            <Card borderWidth="1px" borderColor="black" borderRadius="0px">
              <CardHeader bg="cyan.200"><Heading>Your Conferences</Heading></CardHeader>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                Array.isArray(conferences) && conferences.length > 0 ? (
                  <Accordion allowToggle>
                    {conferences.map(conference => (
                      <AccordionItem key={conference.id}>
                        <h2>
                        <AccordionButton>
                          <Box as={RouterLink} to={`/conferences/${conference.acronym}/${conference.conferenceId}`} flex='1' textAlign='left'>
                            {conference.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          Conference City: {conference.city}
                          <br />
                          Conference Acronym: {conference.acronym}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div>No conferences to display.</div>
                )
              )}
            </Card>
          </Flex>
        <Footer style={{position: 'absolute', bottom: '0', width: '100%' }} />
    </Box>
  )
}

{/*<button
                        key={conference.idconference}
                        onClick={handleClick(conference.acronym, conference.conferenceId)}
                        className="list-group-item list-group-item-action">
                        {conference.title} - {conference.city} - {conference.acronym}
                    </button>*/}

export default ViewConferences
