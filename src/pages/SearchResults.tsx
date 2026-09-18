import { useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types/recipe";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";



function SearchResults() {
    // searchPArams to read query form URL
    const [searchParams] = useSearchParams();
  
    const query = searchParams.get("query");

    //Build API URL 
    const searchUrl = query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : "";

      // get search results useFetch hook
      const { data, loading, error } = 
        useFetch<{ meals: Recipe[] | null }>(searchUrl);

      // if theres no search show a message
      if (!query) {
        return (
          <main className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="text-3xl font-bold">
                Search Recipes
            </h1>

            <p className="mt-4 text-gray-600">
              Please enter a recipe to search for.
            </p>
          </main>
        );
      }

      // message while API request is happening
      if (loading) { 
        return (
          // <main className="mx-auto max-w-7xl px-6 py-10">
          //   <p>Searching for recipes...</p>
          // </main>
          <Spinner />
        )
      }

      // show error if the API request failed
      if (error) {
        return (
          // <main className="mx-auto max-w-7xl px-6 py-10">
          //   <p>{error}</p>
          // </main>
          <ErrorMessage message={error} />;
        );
      }

      // if no recipes are found 
      const recipes = data?.meals ?? [];
      
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Search Results for "{query}"
      </h1>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid hap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.idMeal}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </main>
  );
}


export default SearchResults;