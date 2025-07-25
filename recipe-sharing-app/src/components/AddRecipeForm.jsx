import { useState } from 'react';
import useRecipeStore from "./recipeStore";


const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mt-8 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-pink-600 text-center">Add New Recipe </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border border-pink-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-24"
      />

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
