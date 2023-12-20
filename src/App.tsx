import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { action as rootAction } from './pages/Root';
import NewPost, {
  loader as newPostLoader,
  action as newPostAction,
} from './pages/NewPost';
import Home, { loader as homeLoader, action as homeAction } from './pages/Home';

import FindPassword from './pages/help/password';

import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import Signup from './pages/signup';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      action: rootAction,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
          action: homeAction,
        },
        {
          path: 'newpost',
          element: <NewPost />,
          loader: newPostLoader,
          action: newPostAction,
        },
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
