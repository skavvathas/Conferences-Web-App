import { useState, useEffect, useCallback } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { usePaper } from "../hooks/usePaper";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { usePost } from "../hooks/usePost";
import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button, CardBody, CardFooter } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
//import { BiLike, BiChat, BiShare } from '@chakra-ui/icons';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Paper = () => {
  const { paperId } = useParams(); // conferenceId CHECK THE NAMES TO BE SAME 
  const [post, setPost] = useState(); // state for the new post
  const [posts, setPosts] = useState(); // state for the list of posts in a paper
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { getPaper } = usePaper();
  const { insertPost, getUserByPaper } = usePost();
  const [paper, setPaper] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure()

  /*function handleChange(event){
  const { name, value } = event.target; //Destucturing

  console.log("name: ", name, " value: ", value);

  setPaper((prevValue) => {
      return {
      ...prevValue, // Hold all the previous values the same
      [name]: value // except of [name] -> name = event.target.name and value = event.target.value
      };
  });
  }*/

  function handleChangePost(event) {
    setPost(event.target.value);
    console.log(event.target.value);
  }

  /*async function handleSubmit(e) {
    e.preventDefault()

    await insertPost(post, user.user[0].userId, paperId, user.token, user.user[0].username); 
  }*/

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await insertPost(post, user.user[0].userId, paperId, user.token, user.user[0].username);

  }, [post, user.user, paperId, user.token]);


  useEffect(() => {

      async function fetchPaper() {
        console.log("enter");

        const data = await getPaper(paperId, user.token);

        console.log("))))paper: ", data)

        setPaper(data);

        console.log("reviewers: ", data);
      }

      async function fetchPosts() {

        let resData = await getUserByPaper(paperId, user.token);

        console.log("posts: ", resData);

        setPosts(resData);

      }

      fetchPaper();
      fetchPosts();

  }, [handleSubmit])

  return (
    <div>
        <Header/>
        <div className="main" style={{ minHeight: '100vh', marginBottom: "60px"}}>
          {paper && posts && paper[0] ? (
          <div>
            <div style={{marginTop: "40px"}}>
              <Heading>Title of paper: {paper[0].title}</Heading>
            </div>
            <div style={{marginTop: "40px"}}>
              <Heading>The abstract of paper: {paper[0].abstract}</Heading>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '30px' }}>
              <Button maxW='lg' onClick={onOpen} colorScheme='messenger' variant='outline'>Add a review</Button>
            </div>
            

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Review</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                  <ModalBody pb={6}>
                    <div class="input-group">
                      <span class="input-group-text">With textarea</span>
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        value={post}
                        onChange={handleChangePost}
                      ></textarea>
                      
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" colorScheme='blue' mr={3}>
                      Save the review
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            <div className="" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {posts.map((post, index) => (
                <Card maxW='lg' key={index} borderWidth="1px" borderColor="black" borderRadius="0px" style={{ marginBottom: '20px', width: '100%', maxWidth: '700px', }} >
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                        <Box>
                          <Heading size='sm'>{post.username}</Heading>
                          <Text></Text>
                        </Box>
                      </Flex>
                      <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                      />
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text>
                    {post.post}
                    </Text>
                  </CardBody>
      
                  <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                      '& > button': {
                        minW: '136px',
                      },
                    }}
                  >
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                      Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                      Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                      Share
                    </Button>
                  </CardFooter>
                </Card>
                
              ))}
            </div>
        </div>

          
      ) : (
        <p>Loading...</p>
      )}
        </div>
        <Footer/>
    </div>
  )
}

export default Paper