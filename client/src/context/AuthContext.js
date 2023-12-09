import { createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext();

// This code defines a React context named AuthContext and
// a context provider component named AuthContextProvider.

export const authReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // we run it 1 time at the beginning
    // we want if the user is logged in, when we refresh the page
    // to stay logged in and not log out us. We can achieve this
    // by checking the localStorage
    useEffect(() => {
        // we take from the localStrage the user, if it is there a value
        const user = JSON.parse(localStorage.getItem("userConf"));

        //if the user exists, we have a value for the user
        if(user){ 
          dispatch({type: 'LOGIN', payload: user});  
        }
    }, [])

    console.log("AuthContext", state);

    return(
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}