/* src/components/AddRecipeForm.jsx */
import { useState } from "react";

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      alert("Please fill in all fields");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      description,
      image,
    };

    onAdd(newRecipe);

    // Reset form
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add a New Recipe</h2>

      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-xl p-2 mb-3"
      />

      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-xl p-2 mb-3"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border rounded-xl p-2 mb-3"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
