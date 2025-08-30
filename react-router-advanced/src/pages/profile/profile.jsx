import { Link, Outlet } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  )
}
