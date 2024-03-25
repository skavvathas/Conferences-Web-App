import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useReviewer } from "../hooks/useReviewer";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as Papa from "papaparse";
import { Button } from '@chakra-ui/react';

const CSVSelector = ({ onChange }) => {
  const handleFileChange = async (e) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];

        // 1. create url from the file
        const fileUrl = URL.createObjectURL(file);

        // 2. use fetch API to read the file
        const response = await fetch(fileUrl);

        // 3. get the text from the response
        const text = await response.text();

        // 4. parse the CSV using Papa Parse
        const { data } = Papa.parse(text, { header: true });

        // 5. call the onChange event with parsed CSV data
        onChange(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};

const ReviewersCsv = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [data, setData] = useState([]);
    const { insertReviewer } = useReviewer();
    const navigate = useNavigate();

    const handleUpload = async () => {
        try {
            // Insert each reviewer from the CSV data
            await Promise.all(data.map(row =>
                insertReviewer(id, row.name, row.email, user.token)
            ));

            // Navigate to conferences page after successful upload
            navigate(`/conferences`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCsvChange = (csvData) => {
        setData(csvData);
    };

    return (
        <div>
            <Header/>
            <div className="main" style={{height: "100vh"}}>
                <h1>Add reviewers in conference {id} via CSV</h1>
                <h3>The CSV should have these columns: [name, email]</h3>
                <CSVSelector onChange={handleCsvChange} />
                {data.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr className="table-info">
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Button type="submit" colorScheme='messenger' onClick={handleUpload}>Submit</Button>
            </div>
            <Footer/>
        </div>
    );
};

export default ReviewersCsv;
