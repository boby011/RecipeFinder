import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './Reci.css';

export const UserRecipeView = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      let response = await axios.get('http://localhost:3000/recipes');
      console.log(response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section style={{ marginTop: '150px' }} className='recipes-container'>
      <input
        type="text"
        placeholder="Search Recipes..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <div className='recipes'>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(item => (
            <div key={item._id} className='card-container'>
              <Card className='card' onClick={() => { navigate(`/usernav/userrecdetails/${item._id}`) }}>        <Card.Img variant="top" src={`http://localhost:3000/uploads/${item.image}`} alt="recipe" width={'200px'} height={'200px'} />
                <Card.Body className="recipe-details">
                  <Card.Title className='card-title'>
                    <h2>{item.title}</h2>
                  </Card.Title>
                  <Card.Text className='card-content'>
                    <h4>{item.category}</h4> 
                    <h4>{item.ingredients}</h4> 
                  </Card.Text>


                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Recipes Found</div>
        )}
      </div>
    </section>
  );
};

export default UserRecipeView;
