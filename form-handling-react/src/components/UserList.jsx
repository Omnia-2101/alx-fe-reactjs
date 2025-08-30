export default function UserList({ users }) {
  return (
    <div>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
