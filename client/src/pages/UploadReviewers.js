import React from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

const UploadReviewers = () => {
  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
            Select an Excel with the reviewers inside
            <div className="input-group">
                <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default UploadReviewers