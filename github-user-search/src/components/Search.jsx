// src/components/Search.jsx
import { useState } from "react";
import { searchUsers } from "../api";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const users = await searchUsers({
        query: searchTerm,
        location,
        minRepos,
      });
      setUserData(users);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "250px",
    height: "45px",
    textAlign: "center",
    fontSize: "16px",
    margin: "5px auto",
    padding: "8px",
    border: "2px solid #ddd",
    borderRadius: "6px",
  };

  const formStyle = {
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        GitHub Advanced User Search
      </h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Minimum public repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          style={inputStyle}
          min="0"
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            margin: "20px auto",
            width: "80%",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      <div
        style={{
          display: "grid",
          gap: "20px",
          padding: "20px",
        }}
      >
        {userData.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#fff",
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
              alt={user.login}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid #eee",
              }}
            />
            <div>
              <h3 style={{ margin: 0 }}>@{user.login}</h3>
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
