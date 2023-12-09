import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';

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
            <div className="card">
                <h5 className="card-header fw-bold bg-info fs-2">Create a new Conference</h5>
                <div className="card-body">
                    <h5 className="card-title ">Begin a new conference </h5>
                    <p className="card-text">Add papers and reviewers to your conference.</p>
                    <Link to="/createconference" className="btn btn-dark">Create</Link>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Conferences
