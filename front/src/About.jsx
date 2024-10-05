import React, { useEffect } from 'react';
import './Reci.css'; 

export const About = () => {
  useEffect(() => {
   
    document.body.classList.add('about-page');
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  return (
    <div className='about-out'>
      <h4 className='about-mainsub'>more than a team, we are...</h4>
      <h1 className='about-mainhead'>familia</h1>
      <div className="about-container">
        <h2 className="about-heading">About Us</h2>
        <div className="about-content">
          <p>
            Welcome to Ratatouille, your one-stop destination for exploring, creating, and sharing the finest recipes from around the world. Whether you're a seasoned chef or a home cook, our platform brings together a diverse collection of delicious, easy-to-follow recipes to inspire your next culinary adventure.
          </p>
          <p>
            What We Offer:
          </p>
          <ul>
            <li>Explore a vast variety of recipes by category, cuisine, or ingredients</li>
            <li>Share your own creations with a vibrant community of food lovers</li>
            <li>Save your favorite recipes to your personal cookbook</li>
            <li>Discover new cooking tips and hacks from experienced chefs</li>
            <li>Filter recipes based on dietary preferences and cooking time</li>
          </ul>
          <p>
            At Ratatouille, we believe that cooking should be fun, easy, and accessible to everyone. Whether you're trying out a new dish for the first time or perfecting an old favorite, our mission is to make your culinary experience enjoyable and rewarding.
          </p>
          <p>
            We are constantly growing our collection of recipes with contributions from chefs, food bloggers, and home cooks alike. Join our community, explore new tastes, and unleash your inner chef with Ratatouille.
          </p>
          <p>
            Let’s get cooking and create something delicious together!
          </p>
        </div>
      </div>
    </div>
  );
};
