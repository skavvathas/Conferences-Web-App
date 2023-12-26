import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Conf.css";
import {useNavigate} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import {useReviewer} from "../hooks/useReviewer";
import {usePaper} from "../hooks/usePaper";

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

    return (
        <div>
            <Header/>
                
                <div className="main" className="centered" style={{marginBottom:"100px"}}>
                    <h1 className="fw-semibold" style={{marginTop:"100px"}}>Conference:  {acronym}</h1>
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                                <h4 class="text-center">Papers</h4>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    Array.isArray(papers) && papers.length > 0 ? (
                                    <div className="list-group container text-center" style={{ width: "70vh" }}>
                                        {papers.map(paper => (
                                        <button
                                            key={paper.paperId}
                                            //onClick={handleClick(conference.acronym, conference.conferenceId)}
                                            className="list-group-item list-group-item-action">
                                            {paper.title}
                                        </button>
                                        ))}
                                    </div>
                                    ) : (
                                        <div>No papers to display.</div>
                                    )
                                )}
                            </div>
                            <div class="col">
                                <h4>Reviewers</h4>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    Array.isArray(reviewers) && reviewers.length > 0 ? (
                                    <div className="list-group container text-center" style={{ width: "70vh" }}>
                                        {reviewers.map(reviewer => (
                                        <button
                                            key={reviewer.reviewerId}
                                            //onClick={handleClick(conference.acronym, conference.conferenceId)}
                                            className="list-group-item list-group-item-action">
                                            {reviewer.name} - {reviewer.email}
                                        </button>
                                        ))}
                                    </div>
                                    ) : (
                                        <div>No reviewers to display.</div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor: "#e6ecf0"}}>
                        <div className="button-container" style={{marginBottom: "50px"}}>
                            <button className="btn btn-success button1 btn-lg" onClick={handleAddPaper}>Add paper (title-abstract)</button>
                            <button className="btn btn-success button1 btn-lg" onClick={handleAddPaperNew}>Add paper</button>
                            <button className="btn btn-success button1 btn-lg" onClick={handleAddPaperExcel}>Add papers via excel (title-abstract)</button>
                        </div>
                        <div className="button-container" style={{marginBottom: "50px"}}>
                            <button className="btn btn-dark button1 btn-lg" onClick={handleAddReviewersExcel}>Add reviewers via excel</button>
                            <button className="btn btn-dark button1 btn-lg" onClick={handleAddReviewersHand}>Add reviewers by hand</button>
                        </div>
                        <div className="button-container" style={{marginBottom: "50px"}}>
                            <button className="btn btn-warning button1 btn-lg">See the recommendations</button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Conf