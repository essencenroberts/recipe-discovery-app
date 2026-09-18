import { Link } from "react-router-dom";

import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md">
      <img 
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {recipe.strMeal}
        </h2>

        <p className="mt-1 text-gray-600">
          {recipe.strCategory}
        </p>

        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white"
        >
          View Recipe
        </Link>
      </div>
    </article>
  );

}

export default RecipeCard;