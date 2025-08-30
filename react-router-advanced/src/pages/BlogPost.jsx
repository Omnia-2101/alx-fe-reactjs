// src/pages/BlogPost.jsx
import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()
  return (
    <div>
      <h1>Blog Post</h1>
      <p>You are viewing blog post with ID: {id}</p>
    </div>
  )
}
