import React from 'react'
import { useAuth } from '../context/authContext';
const Logout = () => {
    const {setToken , setUser} = useAuth();
    const handleDelete = ()=>{
        localStorage.clear();
        setToken(null);
        setUser(null);
    }
  return (
    <>
        <button onClick={handleDelete}>Logout</button>
    </>
  )
}

export default Logout