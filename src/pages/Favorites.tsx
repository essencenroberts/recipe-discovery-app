import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";
import { useFavorites } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";


function Favorites() {
  // get favorite Ids
  const { favoriteIds } = useFavorites();

  // favorite recipes useState
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  // loading state
  const [loading, setLoading] = useState(false);

  // error state
  const [error, setError] = useState<string | null>(null);

  // fetch favorite recipes
  useEffect(() => {
    // api request

    // if no favorites no API request
    if (favoriteIds.length === 0) {
      setFavoriteRecipes([]);
      return;
    }

    // fetch function
    const fetchFavoriteRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        //fetch recipes

        // fetch every favroite id
      const recipes = await Promise.all(
        favoriteIds.map(async (id) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        // if successful
        if (!res.ok) {
          throw new Error(`Failed to fetch favorite recipe. Status: ${res.status}`);
        }

        // convert respone from JSON into JavaScript data
        const data: { meals: Recipe[] } = await res.json();

      // return the first recipe from the response
        return data.meals?.[0];
      })    
    );


  //remove missing recipes before save recipes
  setFavoriteRecipes(
    recipes.filter((recipe): recipe is Recipe => Boolean(recipe)
    )
    );
  } catch (err) {
        console.error("favorites fetch error:", err);
        
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while fetching favorites"
        );
      } finally {
        setLoading(false);
      }
    };
  // run function
    fetchFavoriteRecipes();
  }, [favoriteIds]);

  // message to show while recipe laod
  if (loading) {
    return <Spinner />; 
    // <p>Loading favorites...</p>
  }

  // show error if API request fails
  if (error) {
    return  <ErrorMessage message={error} />;
    // <p>{error}</p>;
  }

  // if no favories message
  if (favoriteIds.length === 0) {
    return <p>You haven't added any favorite recipes yet.</p>
  }

  return(
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe.idMeal}
            recipe={recipe}
          />

          // <div
          //   key={recipe.idMeal}
          // >
          //   <img 
          //     src={recipe.strMealThumb}
          //     alt={recipe.strMeal}
          //   />

          //   <h2>{recipe.strMeal}</h2>

          //   <p>{recipe.strCategory}</p>
          // </div>
        ))}
      </div>
    </main>
  )
}

export default Favorites;