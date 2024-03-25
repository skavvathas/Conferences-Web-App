import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Conf.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewer } from "../hooks/useReviewer";
import { usePaper } from "../hooks/usePaper";
import { Button, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardHeader, Container, Heading} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Conf = () => {
    const { user } = useAuthContext();
    const { acronym, conferenceId } = useParams();
    const { getReviewer, isLoading, error } = useReviewer();
    const { getPapersByConf } = usePaper();
    const [reviewers, setReviewers] = useState();
    const [papers, setPapers] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // take from backend the conference with id: id
        async function fetchData() {

            const data = await getReviewer(conferenceId, user.token);
            const data2 = await getPapersByConf(conferenceId, user.token);

            setReviewers(data);
            setPapers(data2);

            console.log("reviewers: ", data);
        }

        fetchData();

    }, [])

    const handleAddReviewersExcel = () =>{
        navigate(`/addreviewersexcel/${conferenceId}`);
    }

    const handleAddPaper = () =>{
        navigate(`/addpaper/${conferenceId}`);
    }

    const handleAddPaperExcel = () =>{
        navigate(`/addpaperexcel/${conferenceId}`);
    }

    const handleAddReviewersHand = () =>{
        navigate(`/addreviewershand/${conferenceId}`);
    }

    const handleAddPaperNew = () =>{
        navigate(`/addpapernew/${conferenceId}`);
    }

    const handleClick = (title, paperId) => (e) => {
        e.preventDefault();
        navigate(`/paper/${paperId}`);
    };

    return (
        <div>
            <Header/>
                <div className="main" className="centered" style={{marginBottom:"100px", height: "100vh"}}>
                    <div className="container text-center">
                        <h1 className="fw-semibold" style={{marginTop:"50px"}}>Conference acronym:  {acronym}</h1>
                        <h1 className="fw-semibold" style={{marginBottom:"50px"}}>Conference id:  {conferenceId}</h1>
                        <div className="row">
                            <div className="col">
                                <Card borderWidth="1px" borderColor="black" borderRadius="0px" width="80%">
                                    <CardHeader bg="cyan.200"><Heading>Papers</Heading></CardHeader>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        Array.isArray(papers) && papers.length > 0 ? (
                                        <Accordion allowToggle>
                                        {papers.map(paper => (
                                            <AccordionItem key={paper.paperId}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as={RouterLink} to={`/paper/${paper.paperId}`} flex='1' textAlign='left'>
                                                        {paper.title.length > 40 ? paper.title.substring(0, 40) + '...' : paper.title} {/* Displaying first 40 letters of title */}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                Abstract: {paper.abstract.length > 40 ? paper.abstract.substring(0, 40) + '...' : paper.abstract} {/* Displaying first 40 letters of abstract */}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))}
                                        </Accordion>
                                        ) : (
                                            <div>No papers to display.</div>
                                        )
                                    )}
                                </Card>
                            </div>
                            <div class="col">
                                <Card borderWidth="1px" borderColor="black" borderRadius="0px" width="80%">
                                    <CardHeader bg="cyan.200"><Heading>Reviewers</Heading></CardHeader>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        Array.isArray(reviewers) && reviewers.length > 0 ? (
                                        
                                        <Accordion allowToggle>
                                        {reviewers.map(reviewer => (
                                            <AccordionItem key={reviewer.reviewerId}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as={RouterLink} flex='1' textAlign='left'>
                                                            {reviewer.name}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    Email: {reviewer.email}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))}
                                        </Accordion>
                                        ) : (
                                            <div>No papers to display.</div>
                                        )
                                    )}
                                </Card>
                                
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="button-container" style={{marginBottom: "50px"}}>
                            <Button as={RouterLink} to={`/addpaper/${conferenceId}`} colorScheme='messenger'>Add paper (title-abstract)</Button>
                            <Button as={RouterLink} to={`/addpapernew/${conferenceId}`} colorScheme='messenger' >Add paper</Button>
                            <Button as={RouterLink} to={`/addpaperexcel/${conferenceId}`} colorScheme='messenger'>Add papers via excel (title-abstract)</Button>
                            <Button as={RouterLink} to={`/addpapercsv/${conferenceId}`} colorScheme='messenger'>Add papers via csv (title-abstract)</Button>
                            <Button as={RouterLink} to={`/addreviewersexcel/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers via excel</Button>
                            <Button as={RouterLink} to={`/addreviewershand/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers by hand</Button>
                            <Button as={RouterLink} to={`/addreviewerscsv/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers via csv file</Button>
                            <Button as={RouterLink} to={`/recommendation`} colorScheme='cyan'>See the recommendations</Button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Conf