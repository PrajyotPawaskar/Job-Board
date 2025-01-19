import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/register', { email, password, role });
      toast.success("Signup Successful");
      setEmail('');
      setPassword('');
      setRole('');
      navigate('/');
    } catch (error) {
      toast.error('Error during registration');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input type="radio" name="role" id="employee"
            value="employee" checked={role === 'employee'}
            onChange={(e) => setRole(e.target.value)} /> Employee
          <input type="radio" name="role" id="employer"
            value="employer" checked={role === 'employer'}
            onChange={(e) => setRole(e.target.value)} /> Employer
        </div>
        <button type="submit">Signup</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup;
