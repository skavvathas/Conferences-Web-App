import React, {useState, useEffect} from 'react'
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthContext } from "../hooks/useAuthContext";
import {useConference} from "../hooks/useConference";
import {useNavigate} from "react-router-dom";

const CreateConference = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [conf, setConf] = useState({
        userId: "",
        author: "",
        title: "",
        acronym: "",
        webpage: "",
        city: "",
        country: "",
        firstday: "",
        lastday: "",
        primaryarea: "",
        secondaryarea: "",
        organizer: ""
    });
    const {insertConference, isLoading, error} = useConference();

    function handleChangeConf(event){
        const { name, value } = event.target; //Destucturing

        console.log("name: ", name, " value: ", value);

        setConf((prevValue) => {
          return {
            ...prevValue, // Hold all the previous values the same
            [name]: value // except of [name] -> name = event.target.name and value = event.target.value
          };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        //navigate("/home")
        console.log("###########");
        // Here we use the useRegister hook from /hooks/useRegister.js file
        await insertConference(conf.userId, conf.author, conf.title, conf.acronym, conf.webpage, conf.city, conf.country, conf.firstday, conf.lastday, conf.primaryarea, conf.secondaryarea, conf.organizer, user.token);
        console.log("345321");
        navigate(`/viewconferences`);
    }

    useEffect(() => {
        setConf(prevConf => ({
            ...prevConf,
            userId: user.user[0].userId,
            author: user.user[0].username,
        }));
    }, [])

    return (
    <div>
        <Header/>
        <div className="main">
            <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card shadow-2-strong" style={{ border: "0.2rem solid black"}}>
              <div className="card-body p-5 text-center">
                <h1 className="mb-5">
                  Create Conference
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="conferenceTitle" className="form-label">Conference title</label>
                        <input
                            onChange={handleChangeConf}
                            className="form-control"
                            name="title"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            required
                            value={conf.title}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferenceAcronym" className="form-label">Acronym</label>
                        <input
                            type="text"
                            className="form-control"
                            name="acronym"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.acronym}
                        />
                    </div>

                    <div className="mb-3">
                        <label for="conferenceWebpage" className="form-label">Web page</label>
                        <input
                            type="text"
                            className="form-control"
                            name="webpage"
                            placeholder="If there is no web page write: none"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.webpage}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferenceCity" className="form-label">City of Conference</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="city" 
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.city}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferenceCountry" className="form-label">Country</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="country" 
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.country}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferenceFirstDay" className="form-label">First Day</label>
                        <input
                            type="date"
                            className="form-control"
                            name="firstday"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.firstday}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferenceLastDay" className="form-label">Last Day</label>
                        <input
                            type="date"
                            className="form-control"
                            name="lastday"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.lastday}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="conferencePrimaryArea" className="form-label">Primary Area</label>
                        <select 
                            name="conferencePrimaryArea" 
                            name="primaryarea" 
                            className="form-control" 
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.primaryarea} 
                        >
                            <option value=""></option>
                            <option value="6">Accounting and Finance</option>
                            <option value="8">Art and Humanities</option>
                            <option value="11">Biological Sciences</option>
                            <option value="5">Business and Management</option>
                            <option value="3">Chemistry</option>
                            <option value="23">Civil Engineering</option>
                            <option value="1">Computing</option>
                            <option value="12">Earth and Environmental Sciences</option>
                            <option value="15">Economics</option>
                            <option value="16">Education Science</option>
                            <option value="17">Energy</option>
                            <option value="2">Engineering</option>
                            <option value="13">Genomics and Bioinformatics</option>
                            <option value="10">Health Sciences</option>
                            <option value="7">Language and Linguistics</option>
                            <option value="14">Materials Science</option>
                            <option value="19">Mathematics and Statistics</option>
                            <option value="24">Mechanical Engineering</option>
                            <option value="4">Physics</option>
                            <option value="9">Social Sciences</option>
                            <option value="18">Technology</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="conferenceSecondaryArea" className="form-label">Secondary Area</label>
                        <select 
                            name="conferenceSecondaryArea" 
                            name="secondaryarea" 
                            className="form-control" 
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.secondaryarea} 
                        >
                            <option value=""></option>
                            <option value="6">Accounting and Finance</option>
                            <option value="8">Art and Humanities</option>
                            <option value="11">Biological Sciences</option>
                            <option value="5">Business and Management</option>
                            <option value="3">Chemistry</option>
                            <option value="23">Civil Engineering</option>
                            <option value="1">Computing</option>
                            <option value="12">Earth and Environmental Sciences</option>
                            <option value="15">Economics</option>
                            <option value="16">Education Science</option>
                            <option value="17">Energy</option>
                            <option value="2">Engineering</option>
                            <option value="13">Genomics and Bioinformatics</option>
                            <option value="10">Health Sciences</option>
                            <option value="7">Language and Linguistics</option>
                            <option value="14">Materials Science</option>
                            <option value="19">Mathematics and Statistics</option>
                            <option value="24">Mechanical Engineering</option>
                            <option value="4">Physics</option>
                            <option value="9">Social Sciences</option>
                            <option value="18">Technology</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="conferenceOrganizer" className="form-label">Organizer</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="organizer"
                            style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                            onChange={handleChangeConf}
                            value={conf.organizer}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
                </div>
                </div>
                </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CreateConference