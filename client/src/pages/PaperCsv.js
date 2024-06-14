import { useState } from 'react';
import './Home.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { usePaper } from "../hooks/usePaper";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Heading } from '@chakra-ui/react';
import * as Papa from "papaparse";

const CSVSelector = ({ onChange }) => {
  const handleFileChange = async (e) => {
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        const response = await fetch(fileUrl);
        const text = await response.text();
        
        // Parse CSV using Papa Parse with header row
        const { data } = Papa.parse(text, { header: true });
        
        // Call the onChange event with parsed CSV data
        onChange(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};

const PaperCsv = () => {
    const { id } = useParams();
    const {user} = useAuthContext();
    const [data, setData] = useState([]);
    const {insertPaper, isLoading, error} = usePaper();
    const navigate = useNavigate();

    const handleUpload = async () => {
        try {
            // Insert each paper from the CSV data
            await Promise.all(data.map(row =>
                insertPaper(id, row.title, row.abstract, user.token)
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
            <Flex direction="column" align="center" justify="center" wrap="wrap" style={{ paddingBottom: '100px' }}>
                <Heading style={{marginTop: "30px"}}>Add papers in conference {id} via CSV</Heading>
                <h3>The CSV should have these columns: [title, abstract]</h3>
                <Flex justify="center" align="center" style={{marginLeft: "20%", marginRight: "20%"}}>
                    {data.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr className="table-info">
                                    <th>Title</th>
                                    <th>Abstract</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.title}</td>
                                        <td>{row.abstract && row.abstract.length > 60 ? row.abstract.substring(0, 60) + '...' : row.abstract}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Flex>
                <CSVSelector onChange={handleCsvChange} />
                <Button type="submit" colorScheme='messenger' onClick={handleUpload}>Submit</Button>
            </Flex>
            <div style={{paddingTop: "80%"}}>
                <Footer />
            </div>
            
        </div>
    );
};

export default PaperCsv;
