import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const UpdateProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState();
  const [location, setLocation] = useState('');
  const { token } = useAuth();

  const getDataInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/profile/getinfo',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      if (res.status === 200) {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setEducation(res.data.education);
        setSkills(res.data.skills);
        setExperience(res.data.experience);
        setLocation(res.data.location);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataInfo();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:3000/profile/update', {
        name,
        email,
        phone,
        education,
        skills,
        experience,
        location
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      if (res.status === 200) {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
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
              <label htmlFor="phone">Phone:</label>
              <input type="number" id="phone" name="phone"
                value={phone} onChange={(e) => setPhone(e.target.value)}
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

export default UpdateProfile