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
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/*const PaperNew = () => {
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

        const promises = data.map(row => 
            insertReviewer(reviewer.userId, reviewer.conferenceId, row.email, row.name, user.token)
        );
        await Promise.all(promises);

        navigate(`/conferences`);
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');

    const recognizeText = async () => {
        console.log("Hey: ", selectedImage);
        
        const result = await Tesseract.recognize(selectedImage);

        console.log("51: ", result.data);

        setRecognizedText(result.data.text);
        
    };

    const handleImageUpload = async (event) => {
        const image = event.target.files[0];
        console.log("image: ", image);
        setSelectedImage(URL.createObjectURL(image));

        console.log("62: ", selectedImage);

        
    };

    return (
        <div>
            <Header/>
            <div className="main" style={{ height: '100vh' }}>
                Upload your excel
                <div class="input-group mb-3">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {selectedImage && <img src={selectedImage} alt="Selected" />}
                </div>

                <div>
                    <h2>Recognized Text:</h2>
                    <button className="btn btn-success button1 btn-lg" onClick={recognizeText}>Analyze</button>
                    <p>{recognizedText}</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}*/


const PaperNew = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [abstract, setAbstract] = useState('');
    const [title, setTitle] = useState('');

    const extractTextFromPDF = async (pdfFile) => {
        const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(pdfFile));
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Get the first page
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map(item => item.str).join(' ');
        setText(textItems);
    };

    const handleFileChange = (event) => {
        const pdfFile = event.target.files[0];
        setFile(pdfFile);
        extractTextFromPDF(pdfFile);
    };

    const handleChange = () => {
        console.log("text: ", text);
        extractTitle()
        extractAbstract()
        console.log("text: ", text);
    }

    /*const extractAbstract = () => {
        setText(text.toLowerCase());
    };*/

    const extractAbstract = () => {
        const startIndicator = "Abstract";
        const endIndicator = "Introduction"; // Adjust based on your document structure

        const startIndex = text.indexOf(startIndicator);
        const endIndex = text.indexOf(endIndicator, startIndex);

        let abstractText = '';
        if (startIndex !== -1 && endIndex !== -1) {
            abstractText = text.substring(startIndex + startIndicator.length, endIndex).trim();
        } else if (startIndex !== -1) {
            abstractText = text.substring(startIndex + startIndicator.length).trim();
        }

        setAbstract(abstractText.toLowerCase());
    };

    /*const extractTitle = () => {
        // Split the text into words
        const words = text.split(/\s+/);

        console.log("words: ", words);
        
        // Take the first 10 words, or fewer if there aren't enough words
        const titleWords = words.slice(0, 10);
    
        // Join the words back into a string
        const titleText = titleWords.join(' ').trim();
    
        setTitle(titleText);
    };*/

    /*const extractTitle = () => {
        const endIndicator = "Abstract"; // End indicator for the title
    
        const endIndex = text.indexOf(endIndicator);
        let titleText = '';
    
        if (endIndex !== -1) {
            // Extract the title from the start of the text up to the word "Abstract"
            titleText = text.substring(0, endIndex).trim();
        } else {
            // If "Abstract" is not found, consider the entire text as the title
            // or handle this case based on your requirements
            titleText = text.trim();
        }

         // Removing specific characters from titleText
         titleText = titleText.replace(/—|-|\.\.|\. \.|\. /g, "");
    
        setTitle(titleText);
    };*/

    const extractTitle = () => {
        const endIndicator = "Abstract"; // End indicator for the title
        const asteriskIndicator = "∗"; // Indicator for additional text to be removed
        const asteriskIndicator2 = "*";
    
        let endIndex = text.indexOf(endIndicator);
        let asteriskIndex = text.indexOf(asteriskIndicator);
        let asteriskIndex2 = text.indexOf(asteriskIndicator2);
        let titleText = '';
    
        // Check for the presence of "∗" and adjust the endIndex accordingly
        if (asteriskIndex !== -1) {
            endIndex = asteriskIndex;
        }

        if (asteriskIndex2 !== -1) {
            endIndex = asteriskIndex2;
        }
    
        if (endIndex !== -1) {
            // Extract the title from the start of the text up to the endIndex
            titleText = text.substring(0, endIndex).trim();
        } else {
            // If neither "Abstract" nor "∗" is found, consider the entire text as the title
            titleText = text.trim();
        }
    
        // Removing specific characters from titleText
        titleText = titleText.replace(/—|-|\.\.|\. \.|\. /g, "");
    
        setTitle(titleText);
    };
    

    return (
        <div>
            <Header/>
            <div className="main" style={{ height: '100vh' }}>
                {/* Other components */}
                
                    <div style={{marginTop: "30px", marginBottom: "30px"}}>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <div>
                        <h3>The title:</h3>
                        <p> {title} </p>
                    </div>
                    <div>
                        <h3>The abstract:</h3>
                        <p> {abstract} </p>
                    </div>
                    <button className="btn btn-success button1 btn-lg" onClick={handleChange}>Add</button>
                    {/* Pagination controls, etc. */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                
            </div>
            <Footer/>
        </div>
    );
};

export default PaperNew