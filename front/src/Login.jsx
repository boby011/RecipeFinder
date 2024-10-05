import React, { useState } from 'react';
import './Reci.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      toast.error('Email and password are required.');
      return;
    }

    setLoading(true); 

    try {
      
      if (data.email === 'admin@gmail.com' && data.password === 'admin') {
        window.alert('Admin Login Success');
        localStorage.setItem('email', data.email);
        navigate('/adminnav/adminpage');
        return;
      }

      
      const response = await axios.post('http://localhost:3000/login', data);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.user.id);
        toast.success('Login successful');
        navigate('/usernav/userhome');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
     
        toast.error(error.response.data.message);
      } else {
        
        toast.error('Network error. Please try again.');
        console.error('Error:', error);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className='login-container'>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <input
              type="email"
              className='form-control'
              onChange={handleChange}
              name="email"
              placeholder='Email'
              value={data.email}
              required
              disabled={loading} 
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              className='form-control'
              onChange={handleChange}
              name="password"
              placeholder='Password'
              value={data.password}
              required
              disabled={loading} 
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
