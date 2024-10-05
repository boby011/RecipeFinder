import React, { useState, useEffect } from 'react';
import './Reci.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AdminCreateRecipe = () => {
  const [data, setData] = useState({
    title: '',
    category: '',
    ingredients: '',
    instruction: '',
  });
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const checkAdminPrivileges = () => {
      const isAdmin = localStorage.getItem('isAdmin');
      if (!isAdmin) {
        toast.error('Access denied. Only admins can create recipes.');
        navigate('/adminnav/adminpage');
      }
    };
    checkAdminPrivileges();
  }, [navigate]);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem('id');
      const username = localStorage.getItem('username');
      const postData = {
        ...data,
        user: userId,
        username: username
      };

      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('category', postData.category);
      formData.append('ingredients', postData.ingredients);
      formData.append('instruction', postData.instruction);
      formData.append('image', image);
      formData.append('user', userId);
      formData.append('username', username);

      let response = await axios.post(
        'http://localhost:3000/addrecipe',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.data) {
        toast.success('Recipe Posted Successfully');
        setData({
          title: '',
          category: '',
          instruction: '',
          ingredients: ''
        });
        setImage('');
      }
    } catch (error) {
      toast.error('Failed to post recipe');
    }
  };

  return (
    <div className="create-container">
      <h1 className="recipe-title">Admin: Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="cinput-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={data.category}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Ingredients:</label>
          <textarea className="carea"
            name="ingredients"
            rows={5}
            cols={50}
            value={data.ingredients}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Instructions:</label>
          <textarea className="carea"
            name="instruction"
            rows={10}
            cols={50}
            value={data.instruction}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            style={{ padding: '0px' }}
          />
        </div>
        <div className="cbutton-cont">
          <button className="cbutton" type="submit">Submit Recipe</button>
        </div>
      </form>
    </div>
  );
};
