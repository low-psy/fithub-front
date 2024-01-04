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

import NotFound from './pages/NotFound';
import Signup from './pages/signup';
import Trainer from './pages/Trainer';
import TrainerHome from './pages/TrainerHome';
import TrainerCreate from './pages/TrainerCreate';
import RootErrorBoundary from './components/common/ErrorBoundary';
import Post from './pages/post';

import AdditionalInfo from './pages/signup/AdditionalInfo';
import CertifyTrainer from './pages/certifyTrainer';
import EmailAuthentication from './pages/signup/EmailAuthentication';
import SignupSuccess from './pages/signup/SignupSuccess';
import SocialSignup from './pages/signup/SocialSignup';

import withAuth from './hocs/withAuth';

function App() {
  const AuthedCertifyTrainer = withAuth(
    CertifyTrainer,
    false,
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
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
          children: [
            { path: 'email', element: <EmailAuthentication /> },
            { path: 'additional-info', element: <AdditionalInfo /> },
            { path: 'success', element: <SignupSuccess /> },
            { path: '*', element: <NotFound /> },
          ],
        },
        { path: 'certify-trainer', element: <AuthedCertifyTrainer /> },
        { path: 'help/password', element: <FindPassword /> },
        { path: 'post', element: <Post /> },
        { path: 'oauth2/regist', element: <SocialSignup /> },
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
