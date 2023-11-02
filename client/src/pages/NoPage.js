import { useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar"


export default function NoPage(){
  const {user} = useAuthContext();


  /*useEffect(() => {
    if(user){
        console.log(user);
    }
  }, [user])*/

  return (
    
    <div>
        <h1>404</h1>;
    </div>
  )
}
