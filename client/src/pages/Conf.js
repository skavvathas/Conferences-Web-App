import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Conf.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewer } from "../hooks/useReviewer";
import { usePaper } from "../hooks/usePaper";
import { Button, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Center, Box, Card, CardHeader, Container, Heading, Flex} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Conf = () => {
    const { user } = useAuthContext();
    const { acronym, conferenceId } = useParams();
    const { getReviewer, isLoading, error } = useReviewer();
    const { getPapersByConf } = usePaper();
    const [reviewers, setReviewers] = useState();
    const [papers, setPapers] = useState();
    const [showAllPapers, setShowAllPapers] = useState(false);
    const [showAllReviewers, setShowAllReviewers] = useState(false);
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

    const initialPapers = papers ? papers.slice(0, 10) : [];
    const remainingPapers = papers ? papers.slice(10) : [];

    const initialReviewers = reviewers ? reviewers.slice(0, 10) : [];
    const remainingReviewers = reviewers ? reviewers.slice(10) : [];

    return (
        <Box>
            <Header />
            <Center>
                <Heading mb={4} style={{ marginTop: "50px" }} _hover={{ color: "blue.600" }}>Conference acronym: {acronym}</Heading>
            </Center>
            <Center>
                <Heading mb={4} _hover={{ color: "blue.600" }}>Conference id: {conferenceId}</Heading>
            </Center>
            <Flex direction="column" align="center" justify="center" wrap="wrap" style={{ paddingBottom: '100px' }}>
                <Flex direction={{ base: "column", md: "row" }} justify="center" align="center">
                    <div className="col">
                        <Card borderWidth="1px" borderColor="black" borderRadius="0px" margin={2}>
                            <CardHeader bg="cyan.200"><Heading>Papers</Heading></CardHeader>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                Array.isArray(papers) && papers.length > 0 ? (
                                    <Accordion allowToggle>
                                        {initialPapers.map(paper => (
                                            <AccordionItem key={paper.paperId}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as={RouterLink} to={`/paper/${paper.paperId}`} flex='1' textAlign='left'>
                                                            {paper.title.length > 40 ? paper.title.substring(0, 40) + '...' : paper.title}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    Abstract: {paper.abstract.length > 40 ? paper.abstract.substring(0, 40) + '...' : paper.abstract}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))}
                                        {showAllPapers && remainingPapers.map(paper => (
                                            <AccordionItem key={paper.paperId}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as={RouterLink} to={`/paper/${paper.paperId}`} flex='1' textAlign='left'>
                                                            {paper.title.length > 40 ? paper.title.substring(0, 40) + '...' : paper.title}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    Abstract: {paper.abstract.length > 40 ? paper.abstract.substring(0, 40) + '...' : paper.abstract}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))}
                                        {papers.length > 10 && !showAllPapers && (
                                            <Button onClick={() => setShowAllPapers(true)}>
                                                Show {papers.length - 10} more papers
                                            </Button>
                                        )}
                                    </Accordion>
                                ) : (
                                    <div>No papers to display.</div>
                                )
                            )}
                        </Card>
                    </div>
                    <div className="col">
                        <Card borderWidth="1px" borderColor="black" borderRadius="0px" margin={2}>
                            <CardHeader bg="cyan.200"><Heading>Reviewers</Heading></CardHeader>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                Array.isArray(reviewers) && reviewers.length > 0 ? (
                                    <Accordion allowToggle>
                                        {initialReviewers.map(reviewer => (
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
                                        {showAllReviewers && remainingReviewers.map(reviewer => (
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
                                        {reviewers.length > 10 && !showAllReviewers && (
                                            <Button onClick={() => setShowAllReviewers(true)}>
                                                Show {reviewers.length - 10} more reviewers
                                            </Button>
                                        )}
                                    </Accordion>
                                ) : (
                                    <div>No reviewers to display.</div>
                                )
                            )}
                        </Card>
                    </div>
                </Flex>
                <Flex direction="column" align="center" justify="center" wrap="wrap">
                    <div className="button-container" style={{ marginBottom: "50px" }}>
                        <Button as={RouterLink} to={`/addpaper/${conferenceId}`} colorScheme='messenger'>Add paper (title-abstract)</Button>
                        <Button as={RouterLink} to={`/addpapernew/${conferenceId}`} colorScheme='messenger'>Add paper</Button>
                        <Button as={RouterLink} to={`/addpaperexcel/${conferenceId}`} colorScheme='messenger'>Add papers via excel (title-abstract)</Button>
                        <Button as={RouterLink} to={`/addpapercsv/${conferenceId}`} colorScheme='messenger'>Add papers via csv (title-abstract)</Button>
                        <Button as={RouterLink} to={`/addreviewersexcel/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers via excel</Button>
                        <Button as={RouterLink} to={`/addreviewershand/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers by hand</Button>
                        <Button as={RouterLink} to={`/addreviewerscsv/${conferenceId}`} colorScheme='messenger' variant='outline'>Add reviewers via csv file</Button>
                        <Button as={RouterLink} to={`/recommendation/${conferenceId}`} colorScheme='cyan'>See the recommendations</Button>
                    </div>
                </Flex>
            </Flex>
            <Footer />
        </Box>
    )
}

export default Conf