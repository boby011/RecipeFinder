import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './Reci.css'; 

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <section style={{ marginTop: '150px' }} className="categories-container">
      <h1 className='Cat-page'>Recipe Categories</h1>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className='col-md-4 mb-4'>
              <Card className='category-card' onClick={() => navigate(`/usernav/reccat/${category}`)}>
                <Card.Body>
                  <Card.Title className='card-title'>
                    <h5>{category}</h5>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className='col-12' style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>
            No categories available
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
