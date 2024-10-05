import React from 'react';
import './Reci.css'; 
import homeimage from './images/hoom.jpg'; 

export const Home = () => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}> 
            <div 
                className="home-container" 
                style={{
                    backgroundImage: `url(${homeimage})`, 
                    width: '100%', 
                    height: '100%', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }} 
            ></div>
            <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)' 
            }}>
                <div className='ite'>
                    <h1 className='headingStyle'>What's Cooking?</h1>
                    <p className='home-text'>Your own Cooking Resource.</p>
                </div>
            </div>
        </div>
    );
};
