import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// To register the user
export const useRecommendation = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const recommendation = async (conferenceId, token) => {
        setIsLoading(true)
        setError(null)

        console.log("Hiiiiiiii2222222");

        const response = await fetch('/api/recommendation/getRec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ conferenceId }) // in server side we use body.firstname, etc
        })

        const json = await response.json();

        console.log("useRec json: ", json);

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

    return { recommendation, isLoading, error }
}