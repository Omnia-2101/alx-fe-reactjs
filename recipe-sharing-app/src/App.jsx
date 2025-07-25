import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './SearchBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from "./components/RecipeList";
import RecipeDetails from './components/RecipeDetails'; 
import FavoritesList from './FavoritesList';
import RecommendationsList from './RecommendationsList';

function App() {
  return (
    <Router>
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Recipe App 🧑‍🍳
        </h1>

        {/* Add Recipe Form */}
        <AddRecipeForm />

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
       <FavoritesList />
      <RecommendationsList />
    </Router>
  );
}

export default App;
