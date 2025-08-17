import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🍳 Recipe Sharing</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/recipes" className="hover:text-gray-200">Recipes</Link>
        <Link to="/add" className="hover:text-gray-200">Add Recipe</Link>
        <Link to="/favorites" className="hover:text-gray-200">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
