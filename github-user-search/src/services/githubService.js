import axios from 'axios'

const apiData = axios.create({
    baseURL: import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com'
})

// Function to fetch user data from GitHub API
export const fetchUserData = (username) => {
    return apiData.get(`/users/${username}`).then(response => response.data);
}

export default fetchUserData;