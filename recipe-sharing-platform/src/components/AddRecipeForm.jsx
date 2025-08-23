// Form styled with Tailwind CSS
// Form validation implemented
import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({}); // errors + setErrors
  const [success, setSuccess] = useState("");

  const validate = () => { // validate
    const next = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!ingredients.trim()) next.ingredients = "Ingredients are required.";
    if (!steps.trim()) next.steps = "Preparation steps are required.";

    const ingList = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (ingList.length < 2) next.ingredients = "Please list at least two ingredients (comma-separated).";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Normally you’d POST to an API. For now, just simulate success.
    setSuccess("Recipe submitted! (This demo doesn’t persist data.)");
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Add a New Recipe</h2>
      {success && <p className="mb-4 text-green-700">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Recipe Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="e.g., Chocolate Chip Cookies"
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Ingredients (comma-separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className={`w-full p-2 rounded-lg border ${errors.ingredients ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="flour, sugar, eggs, butter"
          />
          {errors.ingredients && <p className="text-red-600 mt-1">{errors.ingredients}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Preparation Steps</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={4}
            className={`w-full p-2 rounded-lg border ${errors.steps ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-400`}
            placeholder="Describe how to prepare the recipe..."
          />
          {errors.steps && <p className="text-red-600 mt-1">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
