// src/components/PostsComponent.jsx
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const PostsComponent = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch, // ✅ needed for manual refetch
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      
      <button onClick={() => refetch()}>
        🔁 Refetch Posts
      </button>

      {isFetching && <p style={{ fontStyle: 'italic' }}>Refreshing data...</p>}

      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
