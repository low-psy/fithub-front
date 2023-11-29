import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Post, { action as newPostAction } from './pages/NewPost';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    { path: '/post', element: <Post />, action: newPostAction },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
