import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import type { Category } from "../types/recipe";



function Home() {

  // API URL to request
  const categoriesUrl = "https://www.themealdb.com/api/json/v1/1/categories.php"

  // useFetch hook
  const { data, loading, error } = useFetch<{
    categories: Category[];
  }>(categoriesUrl);

  // loading message
  if (loading) {
    return <p>Loading recipes...</p>
  }

  // error message
  if (error) {
    return <p>Error: {error}</p>
  }
  
  // display info recieved from API
  return(
    <main className="p-6">
      <h2 className="font-2xl">Recipe Categories</h2>

      <div>
        {data?.categories.map((category) => (
          <Link
            key={category.idCategory}
            to={`/category/${category.strCategory}`}
            className="rounded-lg bg-white shadow-md overflow-hidden"
          >
            <img 
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full"
            />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{category.strCategory}</h2>
              </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Home;