import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetProfile = () => {
  const [data, setData] = useState({});
  const { token } = useAuth();
  const toastShown = useRef(false); // Prevent duplicate toasts

  const getProfileInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/profile/getinfo', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(res.data.profile);
      toastShown.current = false; // Reset the toast control after a successful call
      console.log(res.data);
    } catch (error) {
      if (!toastShown.current) {
        toast.error(error.response?.data?.message || "Error fetching profile");
        toastShown.current = true;
      }
    }
    
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <>
      <h1>Your Profile</h1>
      <div>
        <h2>{data?.name}</h2>
        <h3>{data?.email}</h3>
        <h3>{data?.phone}</h3>
        <h3>{data?.education}</h3>
        <h3>{data?.skills?.join(", ")}</h3>
        <h3>{data?.experience}</h3>
        <h3>{data?.location}</h3>
        <ToastContainer />
      </div>
    </>
  )
}

export default GetProfile;
