import { createContext, useReducer } from 'react'

export const PostsContext = createContext();


//The reducer function that specifies how the state gets updated. 
//It must be pure, should take the state and action as arguments, and should return the next state
export const postsReducer = (state, action) => {
  switch (action.type) {
    
    case 'SET_POSTS': 
      // Sets the posts array in the state to the value of action.payload.
      console.log("action.payload SET_POSTS: " + action.payload);
      return {
        posts: action.payload
      }
    case 'CREATE_POSTS':
      // Adds the new post in action.payload to the beginning of the posts array in the state.
      console.log("action.payload CREATE_POSTS: " + action.payload + " state.posts:  " + state.posts);
      return {
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        posts: state.posts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PostsContextProvider = ({ children }) => {
  // The useReducer hook takes two arguments: a reducer function (postsReducer) and an initial state ({posts: null}).
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null
  });

  console.log("State 38 line PostsContext:  " + state);

  return (
    <PostsContext.Provider value={{...state, dispatch}}>
      { children }
    </PostsContext.Provider>
  )
}


