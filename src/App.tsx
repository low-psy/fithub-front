import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// pages
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
import Post, { action as postAction, loader as postLoader } from './pages/post';
import CertifyTrainer from './pages/certifyTrainer';
import SocialSignup from './pages/signup/SocialSignup';
import EmailAuthentication from './pages/signup/EmailAuthentication';
import AdditionalInfo from './pages/signup/AdditionalInfo';
import SignupSuccess from './pages/signup/SignupSuccess';
import User from './pages/user';
import Profile from './pages/user/profile';
import Posts from './pages/user/posts';
import Reservations from './pages/user/Reservation';
import Cancellation from './pages/user/cancellation';
import EditProfile from './pages/user/profile/editProfile/EditProfile';
import profileLoader from './pages/user/loader';
import DetailPost, {
  loader as detailPostLoader,
} from './pages/post/detailPost';
import TrainingCancel from './pages/home/Cancel';
import Help from './pages/help';

// components
import RootErrorBoundary from './components/common/ErrorBoundary';
import NewTrainer from './pages/trainer/new';
import CreateTrainer, {
  action as createTrainerAction,
} from './pages/trainer/create';
import Detail, { loader as detailedTrainingLoader } from './pages/detail';
import pageRoutes from './pageRoutes';

// hooks
import useGoogleMapsApiLoader from './hooks/useGoogleMap';
import { LOGIN } from './redux/slices/userSlice';

function App() {
  // 전역 로그인 상태 관리
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(LOGIN());
    }
  }, [dispatch]);

  useGoogleMapsApiLoader();

  const router = createBrowserRouter([
    {
      path: pageRoutes.main.base,
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
          path: pageRoutes.main.newPost,
          element: <NewPost />,
          loader: newPostLoader,
          action: newPostAction,
        },
        // 게시글
        {
          path: pageRoutes.main.post,
          element: <Post />,
          loader: postLoader,
          action: postAction,
          children: [
            {
              path: pageRoutes.main.postDetail,
              element: <DetailPost />,
              loader: detailPostLoader,
            },
          ],
        },
        // 소셜 회원가입
        { path: pageRoutes.socialSignup, element: <SocialSignup /> },
        // 트레이너 인증
        { path: pageRoutes.certifyTrainer, element: <CertifyTrainer /> },
        // 유저 프로필
        {
          path: pageRoutes.user.base,
          element: <User />,
          loader: profileLoader,
          children: [
            {
              path: pageRoutes.user.profile,
              element: <Profile />,
            },
            {
              path: pageRoutes.user.edit,
              element: <EditProfile />,
              loader: profileLoader,
            },
            {
              path: pageRoutes.user.posts,
              element: <Posts />,
            },
            {
              path: pageRoutes.user.reservations,
              element: <Reservations />,
            },
            {
              path: pageRoutes.user.cancellations,
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
    // 비밀번호 찾기 (임시 비밀번호 발급)
    {
      path: pageRoutes.help.base,
      element: <Help />,
      children: [
        { path: pageRoutes.help.forgetPassword, element: <FindPassword /> },
      ],
    },

    // 로그인
    {
      path: pageRoutes.login,
      element: <Login />,
    },
    // 회원가입
    {
      path: pageRoutes.signup.base,
      element: <Signup />,
      children: [
        {
          path: pageRoutes.signup.emailAuthentication,
          element: <EmailAuthentication />,
        },
        { path: pageRoutes.signup.additionalInfo, element: <AdditionalInfo /> },
        { path: pageRoutes.signup.success, element: <SignupSuccess /> },
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
