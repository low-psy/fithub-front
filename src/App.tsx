import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as StompJs from '@stomp/stompjs';
// pages
import Root from 'pages/Root';
import { action as homeAction } from 'pages/home/index';
import FindPassword from 'pages/help/password';
import Login from 'pages/login';
import NewPost, {
  loader as newPostLoader,
  action as newPostAction,
} from 'pages/newpost/index';
import Signup from 'pages/signup';
import TrainerHome, {
  action as TrainerAction,
  loader as TrainerLoader,
} from 'pages/trainer';
import TrainerRoot from 'pages/TrainerRoot';
import Post, { loader as postLoader } from 'pages/post';
import CertifyTrainer from 'pages/certifyTrainer';
import SocialSignup from 'pages/signup/SocialSignup';
import EmailAuthentication from 'pages/signup/EmailAuthentication';
import AdditionalInfo from 'pages/signup/AdditionalInfo';
import SignupSuccess from 'pages/signup/SignupSuccess';
import User from 'pages/user';
import Profile from 'pages/user/profile';
import Posts, { loader as usersPostLoader } from 'pages/user/posts';
import Cancellation from 'pages/user/cancellation';
import EditProfile from 'pages/user/profile/editProfile/EditProfile';
import profileLoader from 'pages/user/loader';
import DetailPost, {
  loader as detailPostLoader,
  action as detailPostAction,
} from 'pages/post/detailPost';
import Help from 'pages/help';

// components
import CreateTrainer, {
  action as createTrainerAction,
  loader as createTrainerLoader,
} from 'pages/trainer/create';
import Detail, { loader as detailedTrainingLoader } from 'pages/detail';
import pageRoutes from 'pageRoutes';

// hooks
import { LOGIN, SET_TRAINER } from 'redux/slices/userSlice';
import TrainingBook, { loader as TrainingBookLoader } from 'pages/book';
import SuccessPage, {
  loader as successPaymentLoader,
} from 'pages/detail/success';

import TrainerInfo from 'pages/user/trainerInfo';
import PostHome from 'pages/post/home';
import UserHome from 'pages/home/home';
import TrainerExplore, {
  loader as TrainerExploreLoader,
} from 'pages/searchTrainer/trainerExplore';

import Reservation from 'pages/user/Reservation';
import MapRoot, { loader as TrainingMapLoader } from 'pages/map/mapRoot';
import HomeRoot, { loader as HomeLoader } from 'pages/home/homeRoot';
import MapListRoot, {
  loader as MapListLoader,
} from 'pages/mapList/mapListRoot';
import TrainerDetailRoot, {
  loader as TrainerDetailLoader,
} from 'pages/searchTrainer/trainerDetailRoot';
import TrainerRecommend, {
  loader as RecommendTrainerLoader,
} from 'pages/searchTrainer/TrainerRecommend';
import UsersPost from 'pages/user/posts/UsersPostHome';
import { SET_WS } from 'redux/slices/chatSlice';

function App() {
  // 전역 로그인 상태 관리
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const trainerNum = localStorage.getItem('trainer');
    if (accessToken) {
      dispatch(LOGIN());
      if (trainerNum === '1') {
        dispatch(SET_TRAINER());
      }
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: '*', element: <Navigate replace to="/" /> },
    {
      path: pageRoutes.main.base,
      element: <Root />,
      children: [
        // 홈
        {
          path: '/',
          element: <HomeRoot />,
          loader: HomeLoader,
          action: homeAction,
          children: [
            {
              index: true,
              element: <UserHome />,
            },
            {
              path: 'explore',
              element: <UserHome />,
            },
          ],
        },
        {
          path: '/search/trainer',
          element: <TrainerExplore />,
          loader: TrainerExploreLoader,
        },
        {
          id: 'trainer-detail',
          path: '/search/trainer/:trainerId',
          element: <TrainerDetailRoot />,
          loader: TrainerDetailLoader,
        },
        {
          path: '/search/recommend',
          element: <TrainerRecommend />,
          loader: RecommendTrainerLoader,
        },
        // 트레이닝 예약
        {
          path: pageRoutes.userTraining.book,
          element: <TrainingBook />,
          loader: TrainingBookLoader,
        },
        // 트레이닝 지도
        {
          path: '/map',
          element: <MapRoot />,
          loader: TrainingMapLoader,
        },
        {
          path: '/mapList',
          element: <MapListRoot />,
          loader: MapListLoader,
        },
        // 게시글 작성
        {
          path: pageRoutes.main.userNewPost,
          element: <NewPost />,
          loader: newPostLoader,
          action: newPostAction,
        },
        // 게시글 조회
        {
          path: pageRoutes.userPost.base,
          element: <Post />,
          loader: postLoader,
          children: [
            { path: '', element: <PostHome /> },
            { path: 'favorite', element: <PostHome /> },
            { path: 'book', element: <PostHome /> },
            { path: 'explore', element: <PostHome /> },
            {
              path: '/post/:category?/:postId',
              element: <DetailPost />,
              loader: detailPostLoader,
              action: detailPostAction,
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
              loader: usersPostLoader,
              element: <Posts />,
              children: [{ path: '', element: <UsersPost /> }],
            },
            {
              path: pageRoutes.user.reservations,
              element: <Reservation />,
            },
            {
              path: pageRoutes.user.cancellations,
              element: <Cancellation />,
            },
            {
              path: pageRoutes.user.trainerInfo,
              element: <TrainerInfo />,
            },
          ],
        },
        // 트레이닝 세부사항 조회
        {
          path: 'detail',
          children: [
            {
              path: pageRoutes.userTraining.detail,
              element: <Detail />,
              loader: detailedTrainingLoader,
            },
          ],
        },
        {
          path: pageRoutes.userTraining.paymentSuccess,
          element: <SuccessPage />,
          loader: successPaymentLoader,
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
    // 트레이너 페이지
    {
      path: pageRoutes.trainer.base,
      element: <TrainerRoot />,
      children: [
        // 트레이너 예약 및 트레이닝 조회
        {
          path: pageRoutes.trainer.index,
          element: <TrainerHome />,
          loader: TrainerLoader,
          action: TrainerAction,
        },
        // 트레이너 생성
        {
          path: pageRoutes.trainer.new,
          children: [
            {
              index: true,
              element: <CreateTrainer />,
              action: createTrainerAction,
              loader: createTrainerLoader,
            },
          ],
        },
      ],
    },
  ]);

  // ============= 채팅 =============
  const wsBaseURL = 'wss://fithub-ec2.duckdns.org/ws/stomp';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') as string;

    // ws연결설정
    const wsClient = new StompJs.Client({
      brokerURL: wsBaseURL,
      connectHeaders: {
        Authorization: accessToken,
      },
      debug(str) {
        console.log(str);
      },
      reconnectDelay: 5000, // 자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // ws연결
    wsClient.activate();
    dispatch(SET_WS(wsClient));

    const email = localStorage.getItem('email')?.split('@')[0];

    // 구독
    wsClient.onConnect = () => {
      wsClient.subscribe(`/topic/alarm/${email}`, (message) => {
        if (message.body) {
          const msg = JSON.parse(message.body);
          console.log(msg);
          // setChatList((chats) => [...chats, msg]);
        }
      });
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
