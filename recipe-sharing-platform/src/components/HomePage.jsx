// HomePage component styled
// Responsive layout implemented
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data.json") // data.json
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data.json");
        return res.json();
      })
      .then(setRecipes)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Recipe Sharing Platform</h1>
        <Link
          to="/add"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Responsive layout implemented */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => ( // map
          <Link
            to={`/recipe/${r.id}`}
            key={r.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{r.title}</h2>
              <p className="text-gray-600 mt-1">{r.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
