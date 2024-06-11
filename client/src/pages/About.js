import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, CardHeader, CardBody, Heading, Text, Flex } from '@chakra-ui/react'; // Import Card components from your UI library

const About = () => {
  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
        <Flex direction="column" align="center" justify="center" wrap="wrap" style={{ paddingTop: '100px' }}>
          <Card align='center' style={{backgroundColor: "#F8F8F8", border: '1px solid black'}}>
            <CardHeader align="center" justify="center">
              <Heading size='md'>Basic informations about the project</Heading>
              <Heading size='md'>Web based reccomendation system for scientific conferences</Heading>
            </CardHeader>
            <CardBody>
              <Text>The user can create a new conference</Text>
              <Text>The user can view his old conferences</Text>
              <Text>The user can add a new reviewer, to review a paper of the conference</Text>
              <Text>The user can add a paper for review</Text>
              <Text>The app will make a reccomendation for which reviewer could review which paper</Text>
            </CardBody>
          </Card>
        </Flex>
        </div>
        <Footer/>
    </div>
  )
}

export default About
