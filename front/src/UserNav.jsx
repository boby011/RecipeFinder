import React from 'react';
import { Link, useNavigate,Outlet } from 'react-router-dom';
import logo from './images/nav.png'; 
import './Reci.css';
const UserNav = () => {
  const navigate = useNavigate();
  

  const handleClick = () => {
    localStorage.clear(); 
    navigate(`/login`); 
  };

  return (
    
     
        <>
        <div className='nav'>
        <div className='head'>
          <img src={logo} alt='Logo' className='nav-logo' />
        </div>
        <div className='list'>
          <Link to='/usernav/userhome'><span>Home</span></Link>
          <Link to='/usernav/create'><span>Create your own recipe</span></Link>
          <Link to='/usernav/profile'><span>Profile</span></Link>
          <Link to='/usernav/userrecview'><span>All Recipes</span></Link>
          <button className="logout-btn" onClick={handleClick}>Logout</button>
          </div>
          </div>
          <Outlet />
        </>
      
     
    
  );
};

export default UserNav;
