import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Recommendation = () => {
  return (
    <div>
        <Header/>
          <div className="main" style={{ height: '100vh' }}>
            Reccommendation
          </div>
        <Footer/>
    </div>
  )
}

export default Recommendation