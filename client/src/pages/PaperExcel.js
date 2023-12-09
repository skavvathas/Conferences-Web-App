import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewer } from "../hooks/useReviewer";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const PaperExcel = () => {
    const { id } = useParams();
    const {user} = useAuthContext();
    const [data, setData] = useState([]);
    const [filename, setFilename] = useState([]);
    const {insertReviewer, isLoading, error} = useReviewer();
    const [reviewer, setReviewer] = useState({
        userId: "",
        conferenceId: "",
        email: "",
        name: ""
    });
    const navigate = useNavigate();


    const handleUpload = async (e) => {
        e.preventDefault();

        /*{data.map((row, index) => (
            await insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token);
        ))}*/

        const promises = data.map(row => 
            insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token)
        );
        await Promise.all(promises);

        navigate(`/conferences`);
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setFilename(file.name);

        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data, { sheetRows: 5 });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);
        setData(parsedData);

        console.log(parsedData);
    }

    return (
        <div>
            <Header/>
            <div className="main" style={{ height: '100vh' }}>
                Upload your excel
                <div class="input-group mb-3">
                    <input type="file" accept=".xlsx, .xls" class="form-control" id="inputGroupFile02"  onChange={handleFileUpload}/>
                    <label class="input-group-text" for="inputGroupFile02" >Upload</label>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PaperExcel