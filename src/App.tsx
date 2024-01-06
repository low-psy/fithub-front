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

import Signup from './pages/signup';
import Trainer from './pages/Trainer';
import TrainerHome from './pages/TrainerHome';
import TrainerCreate from './pages/TrainerCreate';
import RootErrorBoundary from './components/common/ErrorBoundary';
import Post from './pages/post';

import CertifyTrainer from './pages/certifyTrainer';
import SocialSignup from './pages/signup/SocialSignup';

import withAuth from './hocs/withAuth';
import EmailAuthentication from './pages/signup/EmailAuthentication';
import AdditionalInfo from './pages/signup/AdditionalInfo';
import SignupSuccess from './pages/signup/SignupSuccess';
import NotFound from './pages/NotFound';

function App() {
  const AuthedCertifyTrainer = withAuth(
    CertifyTrainer,
    true,
    '/certify-trainer',
  );

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
        { path: 'post', element: <Post /> },
        { path: 'oauth2/regist', element: <SocialSignup /> },
      ],
    },
    { path: 'help/password', element: <FindPassword /> },
    { path: 'certify-trainer', element: <AuthedCertifyTrainer /> },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
      children: [
        { path: 'email', element: <EmailAuthentication /> },
        { path: 'additional-info', element: <AdditionalInfo /> },
        { path: 'success', element: <SignupSuccess /> },
        { path: '*', element: <NotFound /> },
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
