import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useConference = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const insertConference = async (userId, author, title, acronym, webpage, city, country, firstday, lastday, primaryarea, secondaryarea, organizer, token) => {
        setIsLoading(true)
        setError(null)

        console.log("UseConference: ", author);

        const response = await fetch('/api/conference/insertConf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId, author, title, acronym, webpage, city, country, firstday, lastday, primaryarea, secondaryarea, organizer }) // in server side we use body.firstname, etc
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

    const getConfByAuthor = async (author, token) => {
        setIsLoading(true)
        setError(null)

        console.log("UseConference: ", author , " ", token);

        const response = await fetch(`api/conference/${author}`, {
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

    return { insertConference, getConfByAuthor, isLoading, error }
}