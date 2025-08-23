import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((r) => r.id === parseInt(id));
        setRecipe(selected);
      });
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Loading recipe...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="rounded-lg mb-6 w-full" />

      {/* ✅ Ingredients */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ✅ Instructions */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
