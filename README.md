# Recipe Disocvery App
I built a React app the helps user discover recipes using TheMealDB API.

Users can browse recipes by category, search for recipes, view recipe details, and save recipes to a favorites list.

Favorites are saved in the browser after refreshing the page.

---

## About the Project
The goal of the project was to practice building a React applicaiton that uses an outside API, manages state, uses reusable components, and allows users to move between different pages.

---  

## Features

### Browse Recipes
Users can start on the home page and browse different recipe categories.

Example include:

- Beef
- Chicken
- Dessert
- Pasta
- Seafood
- Vegetarian

Users can click a categroy to see recipes that belong to that category.

--- 
### Search for Recipes
Users can search for a recipe using th search bar.
For example:

```text
pasta

The app created a search URL:
/search?query=pasta
```

The search page reads the word from the URL and uses it to request matching recipes from TheMealDB API

### View Recipe Details
Users can click <b>View Recipe</b> to see more info about a recipe.
The recipe details page displays the following information:
<ul>
  <li>Recipe name</li>
  <li>Recipe image</li>
  <li>Categort</li>
  <li>Area/cuisine</li>
  <li>Ingredients</li>
  <li>Measurements</li>
  <li>Cooking instructions</li>
</ul>

--- 
### Save favorite Recipes
Users can add recipes to their favorites from the recipe details page.

The app saves the recipe ID instead of the whole recipe.

### Favorites Stay After Refreshing
I created a custom `useLocalStorage` hook to save favorite recipe IDs in the brower's `localStorage`

So the user can:
  <ol>
    <li>Favorite a recipe</li>
    <li>Refresh the page</li>
    <li>Return to the Favorites page</li>
    <li>Still see their saved recipes</li>
  </ol>

  --- 
  ### Loading States
  The app displays a loading spinner while the information is being requested from the API. 

  This helps so users understand the app is still working.

  ---
  
  ### Error Handling
The user recieves an error message if something goes wrong while trying to get the recipe information from the API.

--- 

## Technologies Used
I buil tthis project with:
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- TheMealDB API
- Browser localStorage

## Challenges I Faced
One of the biggest challenges I faced was understanding how all of the different Ract pieces worked together. I'm used to only creating components, routes, and localStorage.

All of these felt like separate concepts:
- custom hooks
- Context
- dynamic routes
- API request
- TypeScript types

but as I was building this app, I learned how they can all work together and it make sense.

For example, the recipe details page uses the recipe ID from the URl to request information from the API. The Favorites Context manages which recipe IDs the user has saved, while useLocalStorage makes keep sthe favorites after the browser refreshes.

With each project, I am beginning to see why it takes so many lines of code.

Another challenge was working with the data retirned by the mealDB like their ingredients and Measurements wich were stored using numerbered properties like `strIngredient1` and `strMeasure1` etc I had to learn how to loop through those properties and turn them into a format that would display.