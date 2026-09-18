import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { Recipe } from "../types/recipe";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";


// function to convert ingreditns/measurement into an array
function getIngredients(recipe: Recipe) {
  // empty array
  const ingredients = [];

  // check numbers 1 - 20
  for (let i = 1; i <= 20; i++) {

    // create name of ingredient field
    const ingredient =
      recipe[`strIngredient${i}` as keyof Recipe];
    // create name of measurement field
    const measure =
      recipe[`strMeasure${i}` as keyof Recipe];
    // only add ingredient if API gives it
    if (typeof ingredient === "string" && ingredient.trim()) {

    // add ingredient and measurement to array
      ingredients.push({
        ingredient: ingredient.trim(),
        measure:
          typeof measure === "string"
            ? measure.trim()
            : "",
      });
    }
  }
  // return ingredients back to component
  return ingredients;
}


function RecipeDetails() {
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useFavorites();

  // get recipe details by Id
  const { recipeId } = useParams();

  // check if recipe is favorite
  const favorite = recipeId
    ? isFavorite(recipeId)
    : false;

  // create API url using recipe ID
  const recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

 // custome useFetch hook
  const { data, loading, error } = useFetch<{
    meals: Recipe[]
  }>(recipeUrl);

  // loading message
  if (loading) {
      return (
        // <p className="p-6">Loading recipe...</p>
        <Spinner />
      );
    }


  // error message
  if (error) {
      return  <ErrorMessage message={error} />
      // <p className="p-6 text-red-500">Error: {error}</p>
  } 
 
  const recipe = data?.meals?.[0];

  // if no recipe
  if (!recipe){
    return 
      <p className="p-6">Recipe not found.</p>;
  }

  // convert recipe ingredient and measurement fields into array
  const ingredients = getIngredients(recipe);


  return(
    <main className="mx-auto max-w-5xl p-6">
      <img 
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full rounded-lg"
      />

      <h1 className="mt-6 text-4xl font-bold">
        {recipe.strMeal}
      </h1>

      <button
        onClick={() => {
          if (favorite) {
            removeFavorite(recipe.idMeal);
          } else {
            addFavorite(recipe.idMeal);
          }
        }}
        className="text-sm font-semibold"
      >
        {favorite
          ?"❌ Remove from Favorites"
          : "❤️ Add to Favorites"}
      </button>

      <p className="mt-2 text-gray-600">
        {recipe.strCategory} {recipe.strArea}
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Ingredients</h2>

        <ul className="mt-4 space-y-2">
          {/* loop through each ingredient */}
          {ingredients.map((item, index) => (
            <li 
              key={index}
              className="rounded-md bg-gray-100 p-3"
            > 
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">
          Instructions:
        </h2>

        <p className="mt-4 whitespace-pre-line">{recipe.strInstructions}</p>
      </section>

      
    
    </main>
  )
}

export default RecipeDetails;