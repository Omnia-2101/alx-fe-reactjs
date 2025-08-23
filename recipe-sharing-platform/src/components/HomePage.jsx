import { useEffect, useState } from "react";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data.json");
        return res.json();
      })
      .then(setRecipes)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Recipe Sharing Platform</h1>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>

      {/* Responsive layout implemented */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <article
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
              <h2 className="text-xl font-semibold mb-2">{r.title}</h2>
              <p className="text-gray-600">{r.summary}</p>

              <a
                href="#"
                className="inline-flex items-center mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                View Recipe
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
