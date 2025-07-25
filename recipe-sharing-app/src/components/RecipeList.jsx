import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import FavoriteButton from "./favoriteButton";
import RemoveButton from "./RemoveButton";

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  
  const displayedRecipes = searchTerm ? filteredRecipes : recipes;

  return (
     <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {searchTerm && (
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">
          Filtered Recipes
        </h2>
      )}
       {displayedRecipes.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-5 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-pink-800">{recipe.title}</h3>
            <p className="text-pink-700 mt-2">{recipe.description}</p>
            <FavoriteButton recipeId={recipe.id} />
             <RemoveButton recipeId={recipe.id} />
          </div>
        </Link>
      ))}
      
    </div>
  );
};

export default RecipeList;
