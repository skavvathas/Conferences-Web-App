import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

const ViewConferences = () => {
  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
            <h1>Your Conferences:</h1>
            <div className="list-group" style={{width: "70vh"}}>
                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                    The current link item
                </a>
                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                <a className="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ViewConferences
