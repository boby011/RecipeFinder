import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserReciDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(''); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
        setReviews(response.data.reviews || []); 
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('id'); 
      const response = await axios.post(`http://localhost:3000/recipes/${id}/reviews`, {
        user: userId,
        comment: comment
      });

      
      setReviews((prevReviews) => [...prevReviews, response.data.recipe.reviews.slice(-1)[0]]);
      setComment(''); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
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

          
          <div style={{ marginTop: '30px' }}>
            <h4>Reviews:</h4>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index}>
                  <p><strong>{review.user.username}:</strong> {review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

       
          <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px' }}>
            <textarea
              rows="3"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit" className="btn">Submit Review</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserReciDetails;
