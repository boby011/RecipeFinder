import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export const CategoryRecipes = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate(); 
 useEffect(() => {
    getRecipesByCategory();
  }, [category]);

  const getRecipesByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/reccat/${category}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="recipes-category">
      <h1>Recipes in {category}</h1>
      <div className="recipes-list">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <Card key={recipe._id}  onClick={() => navigate(`/usernav/recdetails/${recipe._id}`)}>
              <Card.Img variant="top" src={`http://localhost:3000/uploads/${recipe.image}`} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
               
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No recipes found in this category</p>
        )}
      </div>
    </div>
  );
};   