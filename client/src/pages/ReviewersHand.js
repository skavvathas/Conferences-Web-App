import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useReviewer } from "../hooks/useReviewer";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const ReviewersHand = () => {
    const { id } = useParams(); // conferenceId CHECK THE NAMES TO BE SAME 
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [reviewer, setReviewer] = useState({
        userId: "",
        conferenceId: "",
        email: "",
        name: ""
    });
    const {insertReviewer, isLoading, error} = useReviewer();

    function handleChange(event){
        const { name, value } = event.target; //Destucturing

        console.log("name: ", name, " value: ", value);

        setReviewer((prevValue) => {
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
        await insertReviewer(reviewer.userId, reviewer.conferenceId, reviewer.email, reviewer.name, user.token);
        console.log("345321");
        navigate(`/conferences`);
    }

    useEffect(() => {
        setReviewer(prevConf => ({
            ...prevConf,
            userId: user.user[0].userId,
            conferenceId: id,
        }));
    }, [])

    return (
        <div>
            <Header/>
                <div className="main" style={{height: "100vh"}}>
                    <h1>Add reviewers via excel</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="conferenceTitle" className="form-label">Reviewer name</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                name="name"
                                style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                                required
                                value={reviewer.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="conferenceAcronym" className="form-label">Reviewer email</label>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                name="email"
                                style={{ backgroundColor: "#f0f0f0", border: "1px solid #007bff"}}
                                value={reviewer.email}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            <Footer/>
        </div>
    )
}

export default ReviewersHand