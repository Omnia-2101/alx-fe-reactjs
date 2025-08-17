import { useState } from "react";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with eggs, cheese, and bacon.",
      image: "https://source.unsplash.com/400x300/?pasta",
    },
    {
      id: 2,
      title: "Avocado Toast",
      description: "Healthy breakfast with avocado, bread, and toppings.",
      image: "https://source.unsplash.com/400x300/?avocado",
    },
  ]);

  const addRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-2xl">Welcome to Recipe Sharing 🍳</h1>}
          />
          <Route
            path="/recipes"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            }
          />
          <Route path="/add" element={<AddRecipeForm onAdd={addRecipe} />} />
          <Route
            path="/favorites"
            element={<h1 className="text-xl">Your Favorites</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
