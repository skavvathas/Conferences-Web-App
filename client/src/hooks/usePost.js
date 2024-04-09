import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const usePost = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const insertPost = async (post, reviewerId, paperId, token, username) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/post/insertPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ post, reviewerId, paperId, username }) // in server side we use body.firstname, etc
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

    const getUserByPaper = async (paperId, token) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/post/getPosts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ paperId })
        })

        const json = await response.json();

        console.log("53->", json);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)

            return json;
        }
    }

    return { insertPost, getUserByPaper, isLoading, error }
}
