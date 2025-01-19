import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', { email, password });
      setEmail('');
      setPassword('');
      toast.success("Login Successful");
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', JSON.stringify(res.data.user._id));
      navigate('/');
    } catch (error) {
      toast.error('Error during login');
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id='email' name='email'
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password'
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Signin