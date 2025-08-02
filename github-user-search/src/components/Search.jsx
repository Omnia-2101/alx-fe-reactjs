import { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleMinReposChange = (e) => setMinRepos(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let query = `${searchTerm}`;
      if (minRepos.trim()) query += ` repos:>${minRepos}`;
      if (location.trim()) query += ` location:${location}`;

      const url = `https://api.github.com/search/users?q=${encodeURIComponent(
        query
      )}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      setUserData(result.items || []);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyling = {
    width: "250px",
    height: "45px",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontSize: "16px",
    margin: "5px",
    padding: "8px",
    border: "2px solid #ddd",
    borderRadius: "6px",
  };

  const formStyle = {
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(231, 229, 229, 0.1)",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        GitHub Advanced User Search
      </h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Enter GitHub username..."
            style={inputStyling}
            required
          />

          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="e.g., New York, London, Tokyo..."
            style={inputStyling}
          />

          <input
            type="number"
            value={minRepos}
            onChange={handleMinReposChange}
            placeholder="Minimum public repos"
            style={inputStyling}
            min="0"
          />

          <button
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2 style={{ color: "#007bff" }}>Loading...</h2>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "20px",
            border: "1px solid #f5c6cb",
          }}
        >
          <h2>Error: {error}</h2>
        </div>
      )}

      {/* Results */}
      <div style={{ display: "grid", gap: "20px" }}>
        {userData.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "3px solid #ddd",
              }}
            />
            <div>
              <h3>@{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Profile →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
