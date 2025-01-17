import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const GetJobs = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (token) getJobsInfo();
  }, [token]);

  const getJobsInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs/getjobs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setJobs(response.data.jobs);
      console.log(response.data.jobs);
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <>
      <h1>Jobs</h1>
      <div>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index}>
              <h2>{job.company}</h2>
              <h3>{job.role}</h3>
              <h3>Skills: {job.skills.join(", ")}</h3>
              <h3>Experience: {job.experience}</h3>
              <h3>Package: {job.pay}</h3>
              <h3>Location: {job.location.join(", ")}</h3>
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </>
  );
};

export default GetJobs;
