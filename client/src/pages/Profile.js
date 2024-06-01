import React, {useEffect} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./Profile.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Button, ButtonGroup, Card, CardHeader, Center, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Profile = () => {
  const {user} = useAuthContext(); 

  useEffect(() => {
    console.log(user);
    console.log(user.user.username);
  },[])

  return (
    <div>
      <Header/>
        <div className="container d-flex justify-content-center" style={{marginTop: "30px", marginBottom: "250px", height: '100vh' }}>
          <Card
            maxW={{ base: "100%", sm: "300px" }}
            borderWidth="1px"
            borderRadius="sm"
            overflow="hidden"
            boxShadow="xl"
            height="500px"
            m={4}
            _hover={{ transform: "scale(1.05)" }} // Apply hover effect
          >
            <CardHeader bg="cyan.200" display="flex" justifyContent="center">
              <Image src="https://static.thenounproject.com/png/5034901-200.png" alt="image" borderRadius='lg'/>
            </CardHeader>
            
            <CardBody
                bg="grey.500" // Set background color of CardBody
                transition="background-color 0.3s" // Add transition for smooth color change
                _hover={{ bg: "blue.200" }} // Change background color on hover
            >
                <Heading size='lg' _hover={{ color: "blue.600" }}>{user.user[0].firstName} {user.user[0].lastName}</Heading>
                <Text>Username: {user.user[0].username} </Text>
                <Text>Email: {user.user[0].email}</Text>
              <ButtonGroup spacing='2' colorScheme='messenger'>
                {/*<Button as={RouterLink} to={link} variant='solid' colorScheme='blue'>
                  {bt}
      </Button>*/}
              </ButtonGroup>
            </CardBody>
          </Card>
        </div>
      <Footer/>
    </div>
  )
}

export default Profile