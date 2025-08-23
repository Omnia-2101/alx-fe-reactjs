import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipe Sharing Platform</h1>
        <Link
          to="/add"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add New Recipe
        </Link>
      </div>
      {/* Recipe Cards Grid */}
      {/* ...existing code */}
    </div>
  );
}

export default HomePage;
