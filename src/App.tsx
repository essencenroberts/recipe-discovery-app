// import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Category from './pages/Category';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

function App() {
 

  return (
    <>
      <h1>Recipe Discovery App</h1>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/category/:categoryName"
            element={<Category />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<RecipeDetails />}
          />
          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/search-results"
            element={<SearchResults />}
          />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
