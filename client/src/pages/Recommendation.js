import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Heading } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRecommendation } from "../hooks/useRecommendation";
import { useAuthContext } from "../hooks/useAuthContext";
import * as XLSX from 'xlsx';

const Recommendation = () => {
  const { recommendation, isLoading, error } = useRecommendation();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [data, setData] = useState(); // Declare data state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {

    const fetchData = async () => { // Define an asynchronous function
      try {
        console.log("Fetching data...");
        const newData = await recommendation(id, user.token);
        setData(newData);
        console.log("Data fetched:", newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Update loading state after data is fetched
      }
    };

    fetchData()
  }, []);

  const generateCSVContent = () => {
    const header = ['Name', 'Email', 'Assignment 1', 'Assignment 2', 'Assignment 3'].join(',');
    const csvRows = data[0].map(item => {
      const values = [
        item.name,
        item.email,
        item.assignment1,
        item.assignment2,
        item.assignment3
      ];
      return values.join(',');
    });
    return [header, ...csvRows].join('\n');
  };

    // Function to trigger download
  const downloadCSV = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /*const generateExcelContent = () => {
    let excelContent = '<table>';
    // Adding header row
    excelContent += '<tr><th>Name</th><th>Email</th><th>Assignment 1</th><th>Assignment 2</th><th>Assignment 3</th></tr>';
    // Adding data rows
    data[0].forEach((item, index) => {
      excelContent += `<tr><td>${item.name}</td><td>${item.email}</td><td>${item.assignment1}</td><td>${item.assignment2}</td><td>${item.assignment3}</td></tr>`;
    });
    
    excelContent += '</table>';

    console.log("1111. excelContent: ", excelContent);

    return excelContent;
  };*/
  
  const downloadExcel = () => {

    const dataWithoutConferenceId = data[0].map(obj => {
      const { conferenceId, ...rest } = obj;
      
      return rest;
    });
    
    console.log(dataWithoutConferenceId);

    const reverseData = dataWithoutConferenceId.map(obj => {
      const reversedKeys = Object.keys(obj).slice(-2).concat(Object.keys(obj).slice(0, -2));
      const reversedObject = {};
      reversedKeys.forEach(key => {
          reversedObject[key] = obj[key];
      });
      return reversedObject;
    });

    // Convert filteredData to Excel worksheet
    const worksheet = XLSX.utils.json_to_sheet(reverseData);
    console.log("worksheet: ", worksheet);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'assignments_excel.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <Box>
      <Header />
      <Flex
        direction={{ base: "column", sm: "row" }}
        align="center"
        justify="center"
        wrap="wrap"
        style={{ minHeight: '100vh', paddingBottom: '100px' }}
      >
        {loading ? (
          // Render loading state if data is still being fetched
          <p>Loading...</p>
        ) : (
          // Render table and button when data is loaded
          <>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
              <Heading style={{marginBottom: '40px'}}>The assignments for every reviewer: </Heading>
              <Table variant="simple"  colorScheme='teal'>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Assignment 1</Th>
                    <Th>Assignment 2</Th>
                    <Th>Assignment 3</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data[0].map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.assignment1}</Td>
                      <Td>{item.assignment2}</Td>
                      <Td>{item.assignment3}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <h5 style={{ marginTop: '30px'}}>If the assignment rows are void, Please  check back later.</h5>
            </div>

            <div>
              <Button colorScheme='blue' style={{ marginRight: '10px' }} onClick={downloadCSV}>Export the assignments in CSV</Button>
              <Button colorScheme='green' onClick={downloadExcel}>Export the assignments in Excel</Button>
            </div>
          </>
        )}
      </Flex>
      <Footer />
    </Box>
  );
  
}

export default Recommendation