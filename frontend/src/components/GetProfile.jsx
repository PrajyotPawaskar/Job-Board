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
      toastShown.current = false; // Reset toast control on success
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
        <h2>Name: {data?.name}</h2>
        <h3>Email: {data?.email}</h3>
        <h3>Phone: {data?.phoneno}</h3>
        <h3>Education: {data?.education}</h3>
        <h3>Skills: {data?.skills?.join(", ")}</h3>
        <h3>Experience: {data?.experience}</h3>
        <h3>Location: {data?.location?.join(", ")}</h3>
        <h3>Applied Jobs:</h3>
        <ul>
          {data?.myJobs?.length > 0 ? (
            data.myJobs.map((job, index) => (
              <li key={index}>
                <strong>Company:</strong> {job.company} | <strong>Role:</strong> {job.role} | <strong>Pay:</strong> {job.pay}
              </li>
            ))
          ) : (
            <p>No jobs applied yet.</p>
          )}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}

export default GetProfile;
