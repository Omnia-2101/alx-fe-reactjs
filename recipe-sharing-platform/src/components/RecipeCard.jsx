function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-72">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
        View Details
      </button>
    </div>
  );
}

export default RecipeCard;
