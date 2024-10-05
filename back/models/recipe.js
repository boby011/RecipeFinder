const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  comment: { type: String, required: true }, // Review comment
  createdAt: { type: Date, default: Date.now } // Timestamp for the review
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: { type: String, required: true },
  instruction: { type: String, required: true },
  image: { type: String }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [ReviewSchema] // Adding reviews field as an array of ReviewSchema
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
