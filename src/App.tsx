import React, { useEffect } from 'react';
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
import TrainerHome from './pages/trainer';
import TrainerRoot from './pages/TrainerRoot';
import RootErrorBoundary from './components/common/ErrorBoundary';
import Post, { loader as postLoader } from './pages/post';

import CertifyTrainer from './pages/certifyTrainer';
import SocialSignup from './pages/signup/SocialSignup';
import Profile from './pages/profile';
import MyProfile from './pages/profile/MyProfile';
import MyPost, {
  loader as myPostLoader,
  action as myPostAction,
} from './pages/profile/MyPost';
import MyBook from './pages/profile/MyBook';
import MyCancel from './pages/profile/MyCancel';
import EmailAuthentication from './pages/signup/EmailAuthentication';
import AdditionalInfo from './pages/signup/AdditionalInfo';
import SignupSuccess from './pages/signup/SignupSuccess';
import NotFound from './pages/NotFound';
import NewTrainer from './pages/trainer/new';
import CreateTrainer, {
  action as createTrainerAction,
} from './pages/trainer/create';
import loadGoogleMapsAPI from './types/loadGoogleMaps';

import User from './pages/user';
import Profile from './pages/user/profile';
import Posts from './pages/user/posts';
import Reservations from './pages/user/Reservation';
import Cancellation from './pages/user/cancellation';
import EditProfile from './pages/user/profile/EditProfile';

import profileLoader from './pages/user/loader';

import withAuth from './hocs/withAuth';

function App() {
  const AuthedCertifyTrainer = withAuth(
    CertifyTrainer,
    true,
    '/certify-trainer',
  );

function App() {
  // useEffect(() => {
  //   loadGoogleMapsAPI();
  // }, []);
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

        { path: 'post', element: <Post />, loader: postLoader },
        { path: 'oauth2/regist', element: <SocialSignup /> },
        {
          path: 'user',
          element: <User />,
          loader: profileLoader,
          children: [
            {
              index: true,
              element: <Profile />,
            },
            {
              path: 'edit',
              element: <EditProfile />,
              loader: profileLoader,
            },
            {
              path: 'posts',
              element: <Posts />,
            },
            {
              path: 'reservation',
              element: <Reservations />,
            },
            {
              path: 'cancellation',
              element: <Cancellation />,
            },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            { path: 'myprofile', element: <MyProfile /> },
            {
              path: 'mypost',
              element: <MyPost />,
              action: myPostAction,
              loader: myPostLoader,
            },
            { path: 'book', element: <MyBook /> },
            { path: 'cancel', element: <MyCancel /> },
          ],
        },
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
      element: <TrainerRoot />,
      children: [
        { path: 'home', element: <TrainerHome /> },
        {
          path: 'new',
          children: [
            { index: true, element: <NewTrainer /> },
            {
              path: 'create',
              element: <CreateTrainer />,
              action: createTrainerAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
