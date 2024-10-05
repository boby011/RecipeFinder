import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Reci.css';
import logo from './images/nav.png'; 

const Nav = () => {
  
  

  return (
    <>
      <div className='nav'>
        <div className='head'>
          <img src={logo} alt='Logo' className='nav-logo' />
        </div>
        <div className='list'>
        <Link to='/recview'><span>Recipes</span></Link>
          <Link to='/about'><span>About</span></Link>
        
               <Link to='/'><span>Home</span></Link>
              <Link to='/Login'><span>Login</span></Link>
              <Link to='/Signin'><span>Signin</span></Link>
          
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
