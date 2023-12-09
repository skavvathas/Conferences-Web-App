import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// To register the user
export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove the user to local storage
        localStorage.removeItem('userConf');

        // update the auth context
        dispatch({type: 'LOGOUT'})

    }

    return { logout }
}
