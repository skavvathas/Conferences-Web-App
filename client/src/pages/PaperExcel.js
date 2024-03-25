import { useState, useEffect } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePaper } from "../hooks/usePaper";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button, CardBody, CardFooter } from '@chakra-ui/react';

const PaperExcel = () => {
    const { id } = useParams();
    const {user} = useAuthContext();
    const [data, setData] = useState([]);
    const [filename, setFilename] = useState([]);
    // const {insertReviewer, isLoading, error} = useReviewer();
    const {insertPaper, isLoading, error} = usePaper();
    const [paper, setPaper] = useState({
        userId: "",
        conferenceId: "",
        title: "",
        abstract: ""
    });
    const navigate = useNavigate();

    function handleChange(event){
        const { name, value } = event.target; //Destucturing

        console.log("name: ", name, " value: ", value);

        setPaper((prevValue) => {
          return {
            ...prevValue, // Hold all the previous values the same
            [name]: value // except of [name] -> name = event.target.name and value = event.target.value
          };
        });
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        /*{data.map((row, index) => (
            await insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token);
        ))}*/

        const promises = data.map(row => 
            //insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token)
            insertPaper(id, row.title, row.abstract, user.token)
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

    useEffect(() => {
        setPaper(prevPaper => ({
            ...prevPaper,
            userId: user.user[0].userId,
            conferenceId: id,
        }));
    }, [])

    return (
        <div>
            <Header/>
            <div className="main" style={{ height: '100vh' }}>
                <Heading style={{marginTop: "30px"}}>Add papers in conference {id} via excel</Heading>
                <h3 style={{marginBottom: "30px"}}>The excel should have these columns: [title, abstract]</h3>
                <div class="input-group mb-3">
                    <input type="file" accept=".xlsx, .xls" class="form-control" id="inputGroupFile02"  onChange={handleFileUpload}/>
                    <label class="input-group-text" for="inputGroupFile02" >Upload</label>
                </div>
                {data.length > 0 && (
                    <table className="table">
                    <thead>
                        <tr className="table-info">
                        {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                        <tr key={index}>
                            <td> {row.title} </td>
                            <td> {row.abstract.length > 40 ? row.abstract.substring(0, 40) + '...' : row.abstract} </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                <Button type="submit" colorScheme='messenger' onClick={handleUpload}>Submit</Button>
            </div>
            <Footer/>
        </div>
    )
}

export default PaperExcel