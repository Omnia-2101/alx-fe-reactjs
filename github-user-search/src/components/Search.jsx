import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const userData = await fetchUserData(query);
      setUsers([userData]); // wrap in array to match advanced format
    } catch (err) {
      setError("Looks like we cant find the user");
      setUsers([]);
    }
    setLoading(false);
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const results = await searchUsers({ query, location, minRepos });
      setUsers(results);
    } catch (err) {
      setError("Advanced search failed.");
      setUsers([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={
          location || minRepos ? handleAdvancedSearch : handleBasicSearch
        }
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Min Repos (optional)"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {location || minRepos ? "Advanced Search" : "Basic Search"}
        </button>
      </form>

      {loading && <p className="mt-4 text-yellow-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.login}
              </a>
              {user.location && (
                <p className="text-gray-600">{user.location}</p>
              )}
              {user.public_repos !== undefined && (
                <p className="text-gray-600">Repos: {user.public_repos}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
