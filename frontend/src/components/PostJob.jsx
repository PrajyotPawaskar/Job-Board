import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostJob = () => {
  const { token } = useAuth();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [pay, setPay] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/jobs/postjob',
        {
          company,
          role,
          skills: skills.split(',').map(skill => skill.trim()),
          experience,
          pay,
          location: location.split(',').map(loc => loc.trim()),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.status === 200) {
        toast.success("Job Posted Successfully");
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error("Error posting job");
    }
  };

  return (
    <>
      <div>
        <h1>Post Job:</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company">Company name:</label>
            <input type="text" id='company' name='company'
              value={company} onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Role name:</label>
            <input type="text" id='role' name='role'
              value={role} onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="skills">Skills:</label>
            <input type="text" id='skills' name='skills'
              value={skills} onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="experience">Experience:</label>
            <input type="text" id='experience' name='experience'
              value={experience} onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pay">Pay:</label>
            <input type="text" id='pay' name='pay'
              value={pay} onChange={(e) => setPay(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id='location' name='location'
              value={location} onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit">Post Job</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PostJob;
