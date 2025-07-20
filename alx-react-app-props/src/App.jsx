import UserInfo from './components/UserInfo';
import UserContext from './UserContext';

function App() {
  const userData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

  return (
    <UserContext.Provider value={userData}>
      <UserInfo />
    </UserContext.Provider>
  );
}

export default App;
