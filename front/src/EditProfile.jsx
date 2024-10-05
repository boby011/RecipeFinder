import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Reci.css';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
  });
  
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !id) {
      toast.error('Missing token or user ID');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/findOne/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response || error.message);
        toast.error('Failed to fetch user data.try again.');
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/updateProfile/${id}`, {
        name: userData.name,
        username: userData.username,
        email: userData.email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Profile updated successfully');
      navigate('/usernav/profile');
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
      toast.error('Failed to update profile. Please try again later.');
    }
  };

  return (
    <>
      <div className="edit-profile-container">
        <h2 className="edit-profile-title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-profile-btn">Save Changes</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
