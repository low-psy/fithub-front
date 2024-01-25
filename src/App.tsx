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
import Detail from './pages/detail';
import TrainingDetailPage from './pages/detail/detail';
import useGoogleMapsApiLoader from './hooks/useGoogleMap';

// import withAuth from './hocs/withAuth';

function App() {
  useGoogleMapsApiLoader();
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
        // { path: 'oauth2/authorization/google', element: <LoginRedirect /> },
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
        {
          path: 'detail',
          children: [{ path: ':trainingId', element: <Detail /> }],
        },
      ],
    },
    { path: 'help/password', element: <FindPassword /> },
    // { path: 'certify-trainer', element: <AuthedCertifyTrainer /> },
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
