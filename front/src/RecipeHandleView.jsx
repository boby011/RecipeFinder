import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  

export const RecipeHandleView = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      navigate('/adminnav/recihandle');  
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <section>
      <div className='details container'>
        <h1>{recipe.title}</h1>

        <img
          src={`http://localhost:3000/uploads/${recipe.image}`}
          alt={recipe.title}
          style={{ width: '500px', height: '300px', objectFit: 'cover' }}
        />
        <h4>Category:</h4>
        <p>{recipe.category}</p>
        <h4>Ingredients:</h4>
        <p>{recipe.ingredients}</p>
        <h4>Instructions:</h4>
        <p style={{ marginTop: '30px' }}>{recipe.instruction}</p>
        <div style={{ marginTop: '20px' }}>
          <h4>Author:</h4>
          <p>{recipe.user && recipe.user.username}</p>
        </div>

       
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
            Delete Recipe
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecipeHandleView;
