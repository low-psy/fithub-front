import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { ROLE } from '../types/user';
// import { checkAccessTokenExpiration } from '../utils/util';

function withAuth(InnerComponent: React.ComponentType, option: ROLE) {
  /*
   * option = 'guest' : 아무나 출입 가능한 페이지
   * option = 'user' : 로그인한 유저만 출입 가능한 페이지
   * option = 'trainer' : 트레이너만 출입 가능합 페이지
   * option = 'admin' : 관리자만 출입 가능한 페이지
   */

  return () => {
    const navigate = useNavigate();

    const { isLogin, role } = useAppSelector((state) => state.user);
    useEffect(() => {
      // const isTimeout = checkAccessTokenExpiration();
      // console.log('isTimeout');
      // if (isTimeout) {
      //   alert('로그인이 필요합니다');
      //   navigate('/login');
      //   return;
      // }
      if (option === 'user') {
        if (!isLogin) {
          alert('로그인이 필요합니다.');
          navigate('/login');
          return;
        }
        return;
      }

      if (option === 'trainer') {
        if (role !== 'trainer') {
          alert('트레이너만 이용 가능합니다.');
          navigate(-1);
          return;
        }
        return;
      }

      if (option === 'admin') {
        if (role !== 'admin') {
          alert('관리자만 이용 가능합니다.');
          navigate(-1);
        }
      }
    }, [isLogin, role, navigate]);

    return <InnerComponent />;
  };
}

export default withAuth;
