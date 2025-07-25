import { useRecipeStore } from './recipeStore';

const RemoveButton = ({ recipeId }) => {
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  return (
    <button onClick={() => removeFavorite(recipeId)}>
      ❌ Remove from Favorites
    </button>
  );
}

  
  export default RemoveButton;
