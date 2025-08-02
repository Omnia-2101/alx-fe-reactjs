// src/api.js
import axios from "axios";

const apiData = axios.create({
  baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

// 🔹 Fetch single user by username
export const fetchUserData = (username) => {
  return apiData.get(`/users/${username}`).then((res) => res.data);
};

// 🔥 Advanced search with query + filters
export const searchUsers = async ({ query, location, minRepos }) => {
  try {
    let searchQuery = `${query}`;
    if (location) searchQuery += `+location:${location}`;
    if (minRepos) searchQuery += `+repos:>${minRepos}`;

    const response = await apiData.get(`/search/users?q=${searchQuery}`);
    return response.data.items || [];
  } catch (error) {
    console.error("Error performing GitHub search:", error);
    throw error;
  }
};
