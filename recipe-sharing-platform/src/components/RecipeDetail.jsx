// RecipeDetail component styled
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data.json");
        return res.json();
      })
      .then((data) => setRecipe(data.find((r) => String(r.id) === String(id)) || null))
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (!recipe) return <p className="p-6">Loading recipe...</p>;

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : String(recipe.ingredients || "").split(",").map((s) => s.trim()).filter(Boolean);

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : String(recipe.instructions || "").split(".").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline inline-block mb-4">
        ← Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden"> {/* shadow */}
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>
          <p className="text-gray-700 mb-6">{recipe.summary}</p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
