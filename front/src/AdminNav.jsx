import React from 'react';
import { Link, useNavigate,Outlet } from 'react-router-dom';
import logo from './images/nav.png'; 
import './Reci.css';
const AdminNav = () => {
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
          <Link to='/adminnav/adminpage'><span>Home</span></Link>
          <Link to='/adminnav/admincreate'><span>Create your own recipe</span></Link>
          <Link to='/adminnav/recihandle'><span>Recipe Handle</span></Link>
          <button className="logout-btn" onClick={handleClick}>Logout</button>
          </div>
          </div>
          <Outlet />
        </>
      
     
    
  );
};

export default AdminNav;
