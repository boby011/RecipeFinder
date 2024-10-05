import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Reci.css';

export const UserHome = () => {
    const navigate = useNavigate(); 

    return (
        <div style={{ position: 'relative' }}> 
            
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className='user-home-content'>
                    <h1 className='user-home-heading'>Welcome Chef!</h1>
                    <button 
                        className='categories-button' 
                        onClick={() => navigate('/usernav/categories')}
                    >
                        View Categories
                    </button>
                </div>
            </div>
        </div>
    );
};
