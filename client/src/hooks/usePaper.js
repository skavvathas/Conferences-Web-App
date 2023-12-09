import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const usePaper = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const insertPaper = async (userId, conferenceId, title, abstract, token) => {
        setIsLoading(true)
        setError(null)

        console.log("UseConference: ", title);

        const response = await fetch('/api/paper/insertpaper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, conferenceId, title, abstract }) // in server side we use body.firstname, etc
        })
        const json = await response.json()

        console.log(json);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {

            // update loading state
            setIsLoading(false)
        }
    }

    const getPapersByConf = async (conferenceId, token) => {
        setIsLoading(true)
        setError(null)

        console.log("UseConference: ", conferenceId , " ", token);

        const response = await fetch(`/api/paper/${conferenceId}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        })
        const json = await response.json()

        console.log(json);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {

            // update loading state
            setIsLoading(false)

            return json;
        }
    }

    return { insertPaper, getPapersByConf, isLoading, error }
}