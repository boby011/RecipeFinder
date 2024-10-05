const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const verifyToken = require('./models/verifytoken');
const User = require('./models/user');
const Recipe = require('./models/recipe');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Recipes')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Connection error', err));

app.use(express.json());
app.use(cors());

const saltrounds = 10;
const tokensecret = 'abc';

// User Registration
app.post('/insert', async (req, res) => {
    console.log('incoming req. body:', req.body);
    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(409).json({ emailExists: true, message: 'mail id is already registered' });
        }

        const codedPassword = await bcrypt.hash(req.body.password, saltrounds);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: codedPassword
        });
        
        const response = await newUser.save();
        const token = jwt.sign({ id: newUser._id }, tokensecret, { expiresIn: '600s' });
        
        res.status(201).json({
            message: 'user registered successfully',
            user: { id: response._id, email: response.email }, 
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error' });
    }
});

// User Profile
app.get('/Userprofile', verifyToken, (req, res) => {
    res.json({ message: 'Yes', user: req.user });
});

// Login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'invalid values' });
        }
        
        const token = jwt.sign({ id: user._id }, tokensecret, { expiresIn: '1h' });
        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email } 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error' });
    }
});


app.get('/findOne/:id', verifyToken, async (req, res) => {
  try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'user not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'server error' });
  }
});

app.put('/updateProfile/:id', verifyToken, async (req, res) => {
  try {
      const id = req.params.id;
      const { name, username, email } = req.body;

      
      if (!name || !username || !email) {
          return res.status(400).json({ message: 'All fields needed.' });
      }

      
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, username, email },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found.' });
      }

      res.json({
          message: 'Profile updated successfully.',
          user: updatedUser,
      });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


app.post('/addrecipe', upload.single('image'), async (req, res) => {
    try {
      const { title, category, ingredients, instruction, user } = req.body;
      const imagePath = req.file ? req.file.filename : ''; 
  
      const newRecipe = new Recipe({
        title: title,
        category: category,
        ingredients: ingredients,
        instruction: instruction,
        image: imagePath, 
        user: user
      });
  
      const savedRecipe = await newRecipe.save(); 
  
      res.json({ message: 'Recipe added successfully', recipe: savedRecipe });
    } catch (error) {
      console.error('error while adding recipe:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.get('/recipes', async (req, res) => {
    try {
      let recipes = await Recipe.find();
      if (recipes.length > 0) {
        const formattedRecipes = recipes.map(recipe => {
          return {
            _id: recipe._id,
            title: recipe.title,
            category: recipe.category,
            ingredients: recipe.ingredients,
            instruction: recipe.instruction,
            image: recipe.image ? recipe.image : null,
            user: recipe.user
          };
        });
        res.json(formattedRecipes);
      } else {
        res.json({ result: 'No Recipes' });
      }
    } catch (error) {
      console.error('Error while getting recipes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
app.use('/uploads', express.static('uploads'));



app.get('/categories', async (req, res) => {
  try {
      const categories = await Recipe.distinct('category'); 
      res.json(categories);
  } catch (error) {
      console.error('error fetchinh categories:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/reccat/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const recipes = await Recipe.find({ category }); 
    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ message: 'No recipes found in this category' });
    }
  } catch (error) {
    console.error('error fetching recipes by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('user', 'username').populate('reviews.user', 'username'); 
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id); 

    if (recipe) {
      res.json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/recipes/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment } = req.body; 

    const review = {
      user: user,
      comment: comment,
      createdAt: new Date()
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $push: { reviews: review } }, 
      { new: true }
    );

    if (updatedRecipe) {
      res.json({ message: 'Review added successfully', recipe: updatedRecipe });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
