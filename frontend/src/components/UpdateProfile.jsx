import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');

  const { token } = useAuth();

  // Fetch user profile data
  const getDataInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/profile/getinfo', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const profile = res.data.profile || {};
      setName(profile.name ?? '');
      setEmail(profile.email ?? '');
      setPhoneno(profile.phoneno ? String(profile.phoneno) : '');
      setEducation(profile.education ?? '');
      setSkills(profile.skills ? profile.skills.join(', ') : ''); // Convert array to string
      setExperience(profile.experience ? String(profile.experience) : '');
      setLocation(profile.location ? profile.location.join(', ') : ''); // Convert array to string
      console.log(res.data.profile);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields properly with explicit type checking
    const fields = [name, email, phoneno, education, skills, experience, location];

    const allFieldsValid = fields.every(field =>
      typeof field === 'string' && field.trim() !== ''
    );

    if (!allFieldsValid) {
      toast.error("Please fill in all the fields properly");
      return;
    }

    try {
      const res = await axios.put('http://localhost:3000/profile/update', {
        name: name.trim(),
        email: email.trim(),
        phoneno: phoneno.trim(),
        education: education.trim(),  // Handle trimming for education
        skills: skills.split(',').map(skill => skill.trim()).filter(Boolean),  // Convert skills string to array
        experience: Number(experience.trim()),  // Ensure number conversion
        location: location.split(',').map(loc => loc.trim()).filter(Boolean), // Convert location string to array
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

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
              <label htmlFor="location">Preferred Locations:</label>
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
  );
};

export default UpdateProfile;
