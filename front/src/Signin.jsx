import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Reci.css';

export const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/insert', formData);
            if (response.data.emailExists) {
                toast.error('Email exists');
            } else {
                toast.success('Registration successful');
                setFormData({
                    name: '',
                    username: '',
                    password: '',
                    email: '',
                });
                navigate('/login');
            }
        } catch (error) {
            toast.error('Registration failed.');
        }
    };

    return (
        <>
            <div className="signup-container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <h2 className="signup-title">Sign Up</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Signup;
