import React from 'react'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim and validate fields properly
    if (![name, email, phoneno, education, skills, experience, location].every(field => field.trim() !== "")) {
      toast.error("Please fill in all the fields properly");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/profile/setprofile', {
        name: name.trim(),
        email: email.trim(),
        phoneno: phoneno.trim(),
        education: education.trim(),
        skills: skills.split(',').map(skill => skill.trim()).filter(Boolean), // Remove empty values
        experience: Number(experience.trim()),
        location: location.split(',').map(loc => loc.trim()).filter(Boolean),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success("Profile Set Successfully");
    } catch (error) {
      console.error("Error details:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Error setting profile");
    }
    console.log(name, email, phoneno, education, skills, experience, location);
  }

  return (
    <>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneno">Phone:</label>
              <input type="number" id="phoneno" name="phoneno"
                value={phoneno} onChange={(e) => setPhoneno(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="education">Education:</label>
              <input type="text" id="education" name="education"
                value={education} onChange={(e) => setEducation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="skills">Skills:</label>
              <input type="text" id='skills' name='skills'
                value={skills} onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="experience">Experience (in Years):</label>
              <input type="text" id='experience' name='experience'
                value={experience} onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location">Preferred locaitons:</label>
              <input type="text" id='location' name='location'
                value={location} onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type='submit'>Set Profile</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default SetProfile;
