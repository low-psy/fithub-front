import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';

import Home, {
  loader as homeLoader,
  action as homeAction,
} from './pages/home/index';

import FindPassword from './pages/help/password';

import Login from './pages/login';

import NewPost, {
  loader as newPostLoader,
  action as newPostAction,
} from './pages/newpost/index';

import LoginRedirect from './pages/login/LoginRedirect';
import Signup from './pages/signup';
import Trainer from './pages/Trainer';
import TrainerHome from './pages/TrainerHome';
import TrainerCreate from './pages/TrainerCreate';
import RootErrorBoundary from './components/common/ErrorBoundary';
import Post from './pages/post';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
          action: homeAction,
          errorElement: <RootErrorBoundary />,
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
        { path: 'post', element: <Post /> },
      ],
    },
    {
      path: '/trainer',
      element: <Trainer />,
      children: [
        { path: 'home', element: <TrainerHome /> },
        { path: 'become-trainer', element: <TrainerCreate /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
