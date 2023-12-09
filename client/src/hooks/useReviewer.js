import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useReviewer = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const insertReviewer = async (userId, conferenceId, email, name, token) => {
        setIsLoading(true)
        setError(null)

        //console.log("UseConference: ", author);
        console.log("REVIEWER use: ", userId, " ", conferenceId, " ", email, " ", name);

        const response = await fetch('/api/reviewer/insertReviewer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId, conferenceId, email, name}) // in server side we use body.firstname, etc
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

    const getReviewer = async (conferenceId, token) => {
        setIsLoading(true)
        setError(null)

        console.log("***UseConference****: ", conferenceId);

        const response = await fetch(`/api/reviewer/${conferenceId}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        })
        const json = await response.json()

        console.log("reviewers: ", json);

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

    return { insertReviewer, getReviewer, isLoading, error }
}