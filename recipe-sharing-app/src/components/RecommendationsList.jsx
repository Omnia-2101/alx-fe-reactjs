import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  const recommendations = recipes.filter(recipe => !favorites.includes(recipe.id));

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-blue-600">Recommended for You</h2>
      {recommendations.map(recipe => (
        <div key={recipe.id} className="border p-2 rounded shadow mb-2">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
