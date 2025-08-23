import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">{recipe.summary}</p>
        <Link
          to={`/recipe/${recipe.id}`}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
