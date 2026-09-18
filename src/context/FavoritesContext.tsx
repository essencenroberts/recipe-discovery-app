import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// favorites context type to describe what context will contain 
interface FavoritesContextType {
  // list of recipe ID's the user has favorited
  favoriteIds: string[];

  // function for adding recipe to favorites
  addFavorite: (recipeId: string) => void;

  // function for removing recipe from favorites
  removeFavorite: (recipeId: string) => void;

  // function for checking if a recipe is a favorite
  isFavorite: (recipeId: string) => boolean;
}

// create shared Favorites context
const FavoritesContext = createContext< FavoritesContextType | undefined 
>(undefined);

// create the Provider to give access to favorites
export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // connect to localStorage to store favorite recipe IDs
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>(
    "favoriteRecipeIds",
    []
  );

  // addFavorite - to add recipe ID to favorite list
  const addFavorite = (recipeId: string) => {
    setFavoriteIds((currentIds) => {
      // dont add same recipe more than once
      if (currentIds.includes(recipeId)) {
        return currentIds;
      }
        //keep existing IDs and add the new ID
        return [...currentIds, recipeId];
    });
  };

  // removeFavorite using .filter() - remove a recipe ID from the favorite list
  const removeFavorite = (recipeId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== recipeId)
    );
  };

  // isFavorite - check if a recipe is already favorited
  const isFavorite = (recipeId: string) => {
    return favoriteIds.includes(recipeId);
  };

  // 
  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}


// useFavorite hook
export function useFavorites() {
  const context = useContext(FavoritesContext);

// show error if someone tries to use hook outside of FavoritesProvider
  if (!context) {
    throw new Error(
      "useFavorites must be used inside a FavoritesProvider"
    );
  }
  return context;
}