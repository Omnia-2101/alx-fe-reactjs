import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
  const confirmed = window.confirm("Are you sure you want to delete this recipe?");
  if (confirmed) {
    deleteRecipe(id);
     navigate("/");   
  }

  };

  return (
    <button onClick={handleDelete} style={{ color: "white", backgroundColor: "red", padding: "5px 10px", borderRadius: "5px", border: "none" }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
