import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Reci.css';
import { Home } from './Home';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Sigin from './Signin';
import { UserHome } from './UserHome';
import store from './store';  
import { About } from './About';
import { CreateRecipe } from './CreateRecipe';
import { RecipeView } from './RecipeView';
import { Categories } from './Categories';
import { CategoryRecipes } from './CategoriesRecipes';
import Profile from './Profile';
import RecipeDetails from './RecipeDetails';
import UserNav from './UserNav';
import { AdminPage } from './AdminPage';
import AdminNav from './AdminNav';
import { RecipeDetailHandle } from './RecipeHandle';
import RecipeHandleView from './RecipeHandleView';
import { AdminCreateRecipe } from './AdminCreateRecipe';
import UserRecipeView from './UserRecipeView';
import UserReciDetails from './UserReciDetails';
import EditProfile from './EditProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signin' element={<Sigin />} />
            {/* <Route path='userhome' element={<UserHome />} /> */}
            <Route path='about' element={<About />} />
            
            <Route path='recview' element={<RecipeView />} />
            
            <Route path='recdetails/:id' element={<RecipeDetails/>} />
            
          </Route>


          <Route path='usernav' element={<UserNav />}>
            <Route path='userhome' element={<UserHome />} />
            <Route path='create' element={<CreateRecipe />} />
            <Route path='categories' element={<Categories/>} />
            <Route path='userrecview' element={<UserRecipeView />} />
            <Route path='reccat/:category' element={<CategoryRecipes/>} />
            <Route path='userrecdetails/:id' element={<UserReciDetails/>}/>
            <Route path='profile' element={<Profile />} />
            <Route path='editprofile' element={<EditProfile/>} />
             
          </Route>

          <Route path='adminnav' element={<AdminNav />}>
          <Route path='adminpage' element={<AdminPage />} />
          <Route path='recihandle' element={<RecipeDetailHandle/>} />
          <Route path='rechandleview/:id' element={<RecipeHandleView/>}/>
          <Route path='admincreate' element={<AdminCreateRecipe/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
