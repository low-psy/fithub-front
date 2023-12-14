import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Post, { action as newPostAction } from './pages/NewPost';
import Home from './pages/Home';

import FindPassword from './pages/help/password';

import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import Signup from './pages/signup';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: 'post', element: <Post />, action: newPostAction },
        {
          path: 'login',
          element: <Login />,
          children: [{ path: 'redirect/*', element: <LoginRedirect /> }],
        },
        { path: 'signup', element: <Signup /> },
        { path: 'help/password', element: <FindPassword /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
