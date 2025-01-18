import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyJob = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({});

  const getSingleData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/jobs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(res.data.jobs);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching job data");
    }
  }

  useEffect(() => {
    getSingleData();
  }, [id]);

  const applyJob = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/jobs/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res.data);
      toast.success("Applied Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error applying for the job");
    }
    console.log("token", token);
    console.log("id", id);
  }

  return (
    <>
      <h1>Apply Job</h1>
      {data && (
        <>
          <h2>{data.company}</h2>
          <h3>{data.role}</h3>
          <h3>Skills: {data.skills?.join(", ")}</h3>
          <h3>Experience: {data.experience}</h3>
          <h3>Package: {data.pay}</h3>
          <h3>Location: {data.location?.join(", ")}</h3>
        </>
      )}
      <button onClick={applyJob}>Apply</button>
      <ToastContainer />
    </>
  );
}

export default ApplyJob;
