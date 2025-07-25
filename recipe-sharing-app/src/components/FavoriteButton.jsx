import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const addFavorite = useRecipeStore(state => state.addFavorite);
  return (
    <button onClick={() => addFavorite(recipeId)}>
      ❤️ Add to Favorites
    </button>
  );
};

export default FavoriteButton;
