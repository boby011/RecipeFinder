import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Reci.css';

export const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        username: '',
        email: '',
    });

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

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
                toast.error('Failed to fetch user data. Please try again later.');
            }
        };

        fetchData();
    }, [id, token]);

    return (
        <>
            <div className="profile-container">
                <div className="profile-view">
                    <h2 className="profile-title">User Profile</h2>
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Name:</label>
                            <p>{userData.name}</p>
                        </div>
                        <div className="info-group">
                            <label>Username:</label>
                            <p>{userData.username}</p>
                        </div>
                        <div className="info-group">
                            <label>Email:</label>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <Link to="/usernav/editprofile">
                        <button className="edit-profile-btn">Edit Profile</button>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;
