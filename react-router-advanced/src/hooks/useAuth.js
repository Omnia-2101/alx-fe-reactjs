export default function useAuth() {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  return { isAuthenticated: loggedIn }
}