import { useState } from 'react';
import { fetchUserData, fetchAdvancedUsers } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUser(null);
    setUsers([]);

    try {
      const data = await fetchUserData(username);
      setUser(data);
      // to delete inputs after a result
      setUsername('');
      setLocation('');
      setMinRepos('');
    } catch (err) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUser(null);
    setUsers([]);

    try {
      const data = await fetchAdvancedUsers(username, location, minRepos);
      setUsers(data);
      // to delete inputs after a result
          setUsername('');
          setLocation('');
          setMinRepos('');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#fdfaf6] p-6">
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[#2c3e50]">
          🔍 GitHub Explorer
        </h1>

        {/* Search Form */}
       <form
  onSubmit={handleAdvancedSearch}
  className="bg-[#2c3e50] p-6 rounded-2xl shadow-lg text-white"
>
  <div className="space-y-4">
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-[#34495e] text-white placeholder-gray-300 border border-white"
    />
    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-[#34495e] text-white placeholder-gray-300 border border-white"
    />
    <input
      type="number"
      placeholder="Min Repositories"
      value={minRepos}
      onChange={(e) => setMinRepos(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-[#34495e] text-white placeholder-gray-300 border border-white"
    />
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-300"
    >
      Search
    </button>
  </div>
</form>


        {/* Loading/Error */}
        {loading && <p className="mt-4 text-center text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {/* Single User Result */}
        {user && (
          <div className="mt-6 p-4 bg-white rounded-xl shadow-md text-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <p className="font-bold text-lg">{user.login}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Profile
            </a>
          </div>
        )}

        {/* Multiple Users Result */}
        {users.length > 0 && (
          <div className="mt-6 space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-white rounded-xl shadow-md flex items-center gap-4"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.login}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
