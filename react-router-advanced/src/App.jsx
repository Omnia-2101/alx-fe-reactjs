import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './components/Profile'
import ProfileDetails from './pages/ProfileDetails'
import ProfileSettings from './pages/ProfileSettings'
import Post from './pages/Post'
import ProtectedRoute from './components/ProtectedRoute'
import BlogPost from './pages/BlogPost'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}
