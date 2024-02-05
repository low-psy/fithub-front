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
import Post, { action as postAction, loader as postLoader } from './pages/post';

import CertifyTrainer from './pages/certifyTrainer';
import SocialSignup from './pages/signup/SocialSignup';

import EmailAuthentication from './pages/signup/EmailAuthentication';
import AdditionalInfo from './pages/signup/AdditionalInfo';
import SignupSuccess from './pages/signup/SignupSuccess';
import NotFound from './pages/NotFound';
import NewTrainer from './pages/trainer/new';
import CreateTrainer, {
  action as createTrainerAction,
} from './pages/trainer/create';
import Detail, { loader as detailedTrainingLoader } from './pages/detail';
import useGoogleMapsApiLoader from './hooks/useGoogleMap';

import User from './pages/user';
import Profile from './pages/user/profile';
import Posts from './pages/user/posts';
import Reservations from './pages/user/Reservation';
import Cancellation from './pages/user/cancellation';
import EditProfile from './pages/user/profile/EditProfile';

import profileLoader from './pages/user/loader';

import withAuth from './hocs/withAuth';
import DetailPost, {
  loader as detailPostLoader,
} from './pages/post/detailPost';
import TrainingCancel from './pages/home/Cancel';

function App() {
  const AuthedCertifyTrainer = withAuth(
    CertifyTrainer,
    true,
    '/certify-trainer',
  );

  useGoogleMapsApiLoader();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        // 홈
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
          action: homeAction,
          errorElement: <RootErrorBoundary />,
        },
        // 게시글 작성
        {
          path: 'newpost',
          element: <NewPost />,
          loader: newPostLoader,
          action: newPostAction,
        },
        // 게시글
        {
          path: 'post',
          element: <Post />,
          loader: postLoader,
          action: postAction,
          children: [
            {
              path: ':postId',
              element: <DetailPost />,
              loader: detailPostLoader,
            },
          ],
        },
        // 소셜 회원가입
        { path: 'oauth2/regist', element: <SocialSignup /> },
        // 유저 프로필
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
          ],
        },
        {
          path: 'detail',
          children: [
            {
              path: ':trainingId',
              element: <Detail />,
              loader: detailedTrainingLoader,
            },
          ],
        },
        {
          path: '/training/cancel',
          element: <TrainingCancel />,
        },
      ],
    },

    // 비밀번호 찾기
    { path: 'help/password', element: <FindPassword /> },

    // 트레이너 인증
    { path: 'certify-trainer', element: <AuthedCertifyTrainer /> },

    // 로그인
    {
      path: '/login',
      element: <Login />,
    },

    // 회원가입
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

    // 트레이너 생성?
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
