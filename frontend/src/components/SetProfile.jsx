import React from 'react'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SetProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState();
  const [location, setLocation] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/profile/setprofile', {
        name,
        email,
        phone,
        education,
        "skills": skills.split(',').map(skill => skill.trim()),
        experience,
        "location": location.split(',').map(loc => loc.trim()),
      },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success("Profile Set Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error setting profile");
    }
  }

  return (
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
            <label htmlFor="location">Preffered locaitons:</label>
            <input type="text" id='location' name='location'
              value={location} onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type='submit'>Set Profile</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default SetProfile