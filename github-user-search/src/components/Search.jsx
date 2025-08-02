import { useState } from "react";
import fetchUserData from "../services/githubService";

function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [location, setLocation] = useState("")
    const [minRepos, setMinRepos] = useState("")
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }

    const handleMinReposChange = (e) => {
        setMinRepos(e.target.value)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setLoading(true);
            setError(null);

            // For advanced search, we'll still use the single user endpoint for simplicity
            // In a real app, you'd use GitHub's search API with query parameters
            fetchUserData(searchTerm)
                .then(data => {
                    // Filter results based on advanced criteria if provided
                    let shouldDisplay = true;
                    
                    if (location.trim() && data.location) {
                        shouldDisplay = data.location.toLowerCase().includes(location.toLowerCase());
                    } else if (location.trim() && !data.location) {
                        shouldDisplay = false;
                    }
                    
                    if (minRepos.trim() && !isNaN(minRepos)) {
                        shouldDisplay = shouldDisplay && data.public_repos >= parseInt(minRepos);
                    }
                    
                    if (shouldDisplay) {
                        setUserData(data);
                    } else {
                        setError("User doesn't match the specified criteria");
                        setUserData(null);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    setError("Looks like we cant find the user");
                    setUserData(null);
                    setLoading(false);
                });
        }
    }

    const inputStyling = {
                width: "250px", 
                height: "45px",
                textAlign: "center",
                fontFamily: "sans-serif", 
                fontSize: "16px",
                margin: "5px",
                padding: "8px",
                border: "2px solid #ddd",
                borderRadius: "6px"
            }


    const formStyle = {
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(231, 229, 229, 0.1)"
    }

    return(
        <div>
            <h1 style={{textAlign: "center",  marginBottom: "30px"}}>
                GitHub Advanced User Search
            </h1>
            
            {/* Advanced Search Form */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    
                    {/* Username Input */}
                    <div>
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Enter GitHub username..."
                            style={inputStyling}
                            required
                        />
                    </div>

                    {/* Location Input */}
                    <div>
                        <input 
                            type="text"
                            value={location}
                            onChange={handleLocationChange}
                            placeholder="e.g., New York, London, Tokyo..."
                            style={inputStyling}
                        />
                        <br />
                        <small style={{color: "#666", fontSize: "12px"}}>
                            Filter users by their location
                        </small>
                    </div>

                    {/* Minimum Repositories Input */}
                    <div>
                        <input 
                            type="number"
                            value={minRepos}
                            onChange={handleMinReposChange}
                            placeholder="e.g., 5"
                            style={inputStyling}
                            min="0"
                        />
                        <br />
                        <small style={{color: "#666", fontSize: "12px"}}>
                            Show users with at least this many public repositories
                        </small>
                    </div>

                    {/* Search Button */}
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
                            fontWeight: "bold"
                        }}
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search User"}
                    </button>
                </div>
            </form>
            
            {/* Loading State */}
            {loading && (
                <div style={{textAlign: "center", padding: "20px"}}>
                    <h2 style={{color: "#007bff"}}>Loading...</h2>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{
                    backgroundColor: "#f8d7da", 
                    color: "#721c24", 
                    padding: "15px", 
                    borderRadius: "6px", 
                    marginBottom: "20px",
                    border: "1px solid #f5c6cb"
                }}>
                    <h2>Error: {error}</h2>
                </div>
            )}

            {/* User Data Display */}
            {userData && (
                <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}>
                    <h2 style={{textAlign: "center", marginBottom: "20px", color: "#333"}}>
                        Search Result:
                    </h2>
                    
                    <div style={{display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap"}}>
                        <img 
                            src={userData.avatar_url} 
                            alt={`${userData.login}'s avatar`}
                            style={{
                                width: "120px", 
                                height: "120px", 
                                borderRadius: "50%", 
                                border: "3px solid #ddd",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        />
                        
                        <div style={{flex: "1", minWidth: "250px"}}>
                            <h3 style={{margin: "0 0 10px 0", color: "#333", fontSize: "24px"}}>
                                {userData.name || userData.login}
                            </h3>
                            <p style={{margin: "0 0 5px 0", color: "#666", fontSize: "18px"}}>
                                <strong>Username:</strong> @{userData.login}
                            </p>
                            {userData.bio && (
                                <p style={{margin: "0 0 10px 0", color: "#555", fontStyle: "italic"}}>
                                    {userData.bio}
                                </p>
                            )}
                            
                            {/* Stats Grid */}
                            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginTop: "15px"}}>
                                <div style={{textAlign: "center", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "6px"}}>
                                    <div style={{fontSize: "24px", fontWeight: "bold", color: "#007bff"}}>
                                        {userData.public_repos}
                                    </div>
                                    <div style={{fontSize: "12px", color: "#666"}}>Repositories</div>
                                </div>
                                <div style={{textAlign: "center", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "6px"}}>
                                    <div style={{fontSize: "24px", fontWeight: "bold", color: "#28a745"}}>
                                        {userData.followers}
                                    </div>
                                    <div style={{fontSize: "12px", color: "#666"}}>Followers</div>
                                </div>
                                <div style={{textAlign: "center", padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "6px"}}>
                                    <div style={{fontSize: "24px", fontWeight: "bold", color: "#ffc107"}}>
                                        {userData.following}
                                    </div>
                                    <div style={{fontSize: "12px", color: "#666"}}>Following</div>
                                </div>
                            </div>
                            
                            {/* Additional Info */}
                            {userData.location && (
                                <p style={{margin: "10px 0 5px 0", color: "#555"}}>
                                    <strong>📍 Location:</strong> {userData.location}
                                </p>
                            )}
                            {userData.company && (
                                <p style={{margin: "5px 0", color: "#555"}}>
                                    <strong>🏢 Company:</strong> {userData.company}
                                </p>
                            )}
                            {userData.blog && (
                                <p style={{margin: "5px 0", color: "#555"}}>
                                    <strong>🌐 Website:</strong> 
                                    <a href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`} 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       style={{color: "#007bff", textDecoration: "none", marginLeft: "5px"}}>
                                        {userData.blog}
                                    </a>
                                </p>
                            )}
                            
                            {/* GitHub Profile Link */}
                            <div style={{marginTop: "15px"}}>
                                <a 
                                    href={userData.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 20px",
                                        backgroundColor: "#24292e",
                                        color: "white",
                                        textDecoration: "none",
                                        borderRadius: "6px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    View GitHub Profile →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Search