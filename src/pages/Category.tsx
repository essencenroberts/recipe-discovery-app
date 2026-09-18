import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { Recipe } from "../types/recipe";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";



function Category() {
  // get categoryName from url
  const { categoryName } = useParams();

  //create API url
  const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;

  //useFetch request recipes
  const { data, loading, error } = useFetch<{
    meals: Recipe[];
  }>(categoryUrl);

  // loading message
  if (loading) {
    return
      // <p className="p-6">Loading recipes...</p>
      <Spinner />; 
  }

  //error message
  if (error) {
    return <ErrorMessage message={error} />;
    // <p className="p-6 text-red-500">Error: {error}</p>
  }
  //display recipes
  
  return(
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">{categoryName} Recipes</h1>

      {/* create a grid for recipe cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* loop through every recipe .map() */}
        {data?.meals?.map((recipe) => (
          <Link
            key={recipe.idMeal}
            to={`/recipe/${recipe.idMeal}`}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img 
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{recipe.strMeal}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Category;