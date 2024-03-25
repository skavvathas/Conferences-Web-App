import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Box, Button, ButtonGroup, Card, CardHeader, Center, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ConferenceCard = ({ imageUrl, title, description, link, bgColor, bt }) => {
    return (
        <Card
        maxW={{ base: "100%", sm: "300px" }}
        borderWidth="1px"
        borderRadius="sm"
        overflow="hidden"
        boxShadow="xl"
        m={4}
        _hover={{ transform: "scale(1.05)" }} // Apply hover effect
      >
        <CardHeader bg={bgColor}>
          <Image src={imageUrl} alt={title} borderRadius='lg' />
        </CardHeader>
        
        <CardBody
            bg="gray.100" // Set background color of CardBody
            transition="background-color 0.3s" // Add transition for smooth color change
            _hover={{ bg: "gray.200" }} // Change background color on hover
        >
            <Heading size='lg' _hover={{ color: "blue.600" }}>{title}</Heading>
            <Text>{description}</Text>
          <ButtonGroup spacing='2' colorScheme='messenger'>
            <Button as={RouterLink} to={link} variant='solid' colorScheme='blue'>
              {bt}
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    );
  };

const Conferences = () => {
  return (
    <Box>
      <Header/>
          <Center>
            <Heading mb={4} style={{ marginTop: "50px" }} _hover={{ color: "blue.600" }}>Create, View and Join a Conference</Heading>
          </Center>
          <Flex direction={{ base: "column", sm: "row" }} align="center" justify="center" wrap="wrap" style={{ height: '80vh' }}>
          <ConferenceCard
              imageUrl="/images/ethereum.png"
              title="Create a new Conference"
              description="Begin a new conference. Add papers, reviewers and make changes to your conference."
              link="/createconference"
              bgColor="#B2F5EA"
              bt="Create"
            />
          <ConferenceCard
              imageUrl="/images/ethereum2.png"
              title="View Conference"
              description="See the list with all your current conferences. Select the one that you want to view."
              link="/viewconferences"
              bgColor="#FBD38D"
              bt="View"
            />

            <ConferenceCard
              imageUrl="/images/ethereum1.png"
              title="Join a Conference"
              description="Join an existing conference. Write reviews in the papers that you want to join"
              link="/joinconference"
              bgColor="#E9D8FD"
              bt="Join"
            />
          </Flex>
      <Footer/>
    </Box>
  );
};

/*


const Conferences = () => {
  return (
    <Box>
      <Header/>
      <Box className="main" style={{ height: '100vh' }}>
        <Box className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
          <Heading className="card-header fw-bold bg-danger-subtle fs-2">View Conference</Heading>
          <Box className="card-body">
            <Heading className="card-title">See the list with all your current conferences.</Heading>
            <Box className="card-text">Select the one that you want to view.</Box>
            <Link as={RouterLink} to="/viewconferences" className="btn btn-dark">View</Link>
          </Box>
        </Box>
        <Box className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
          <Heading className="card-header fw-bold bg-info fs-2">Create a new Conference</Heading>
          <Box className="card-body">
            <Heading className="card-title ">Begin a new conference </Heading>
            <Box className="card-text">Add papers and reviewers to your conference.</Box>
            <Link as={RouterLink} to="/createconference" className="btn btn-dark">Create</Link>
          </Box>
        </Box>
        <Box className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
          <Heading className="card-header fw-bold bg-primary-subtle fs-2">Join a Conference</Heading>
          <Box className="card-body">
            <Heading className="card-title ">Join an existing conference </Heading>
            <Box className="card-text"></Box>
            <Link as={RouterLink} to="/joinconference" className="btn btn-dark">Join</Link>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}
/*

const Conferences = () => {
  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
            <div className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
                <h5 className="card-header fw-bold bg-danger-subtle fs-2">View Conference</h5>
                <div className="card-body">
                    <h5 className="card-title">See the list with all your current conferences.</h5>
                    <p className="card-text">Select the one that you want to view.</p>
                    <Link to="/viewconferences" className="btn btn-dark">View</Link>
                </div>
            </div>
            <div className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
                <h5 className="card-header fw-bold bg-info fs-2">Create a new Conference</h5>
                <div className="card-body">
                    <h5 className="card-title ">Begin a new conference </h5>
                    <p className="card-text">Add papers and reviewers to your conference.</p>
                    <Link to="/createconference" className="btn btn-dark">Create</Link>
                </div>
            </div>
            <div className="card" style={{ marginBottom: '10vh', marginTop: '5vh', borderRadius: "5px"}}>
                <h5 className="card-header fw-bold bg-primary-subtle fs-2">Join a Conference</h5>
                <div className="card-body">
                    <h5 className="card-title ">Join a existed conference </h5>
                    <p className="card-text"></p>
                    <Link to="/joinconference" className="btn btn-dark">Join</Link>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}*/

export default Conferences
