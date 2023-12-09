import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = () => {
  return (
    <div>
        <Header/>
        <div className="main" style={{ height: '100vh' }}>
          <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
              <h1 className="text-body-emphasis">About</h1>
              <p className="col-lg-8 mx-auto fs-5 text-muted" style={{height: "8vh"}}>
                Web-based Reccomendation System for Scientific Conferences.
              </p>
              <ul>
                <li>The user can create a new conference</li>
                <li>The user can view his old conferences</li>
                <li>The user can add a new reviewer, to review a paper of the conference</li>
                <li>The user can add a paper for review</li>
                <li>The app will make a reccomendation for which reviewer could review which paper</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default About
