import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewer } from "../hooks/useReviewer";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as XLSX from "xlsx";
import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, IconButton, Button, CardBody, CardFooter } from '@chakra-ui/react';

const ReviewersExcel = () => {
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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setFilename(file.name);

        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data, { sheetRows: 5 });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);
        setData(parsedData);

        console.log("the data: ", parsedData);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        /*{data.map((row, index) => (
            await insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token);
        ))}*/

        const promises = data.map(row =>
            insertReviewer(reviewer.conferenceId, row.email, row.name, user.token)
        );

        await Promise.all(promises);

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
                    <Heading style={{marginTop: "30px"}}>Add reviewers in conference {id} via excel</Heading>
                    <h3 style={{marginBottom: "30px"}}>The excel should have these columns: [name, email]</h3>
                    <div className="input-group mb-3">
                        <input type="file" accept=".xlsx, .xls" class="form-control" id="inputGroupFile02"  onChange={handleFileUpload}/>
                        <label class="input-group-text" for="inputGroupFile02" onClick={ handleUpload }>Upload</label>
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
                                
                                <td> {row.name} </td>
                                <td> {row.email} </td>
                              
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

export default ReviewersExcel