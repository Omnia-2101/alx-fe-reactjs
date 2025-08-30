export const isAuthenticated = () => {
  return localStorage.getItem('loggedIn') === 'true'
}
