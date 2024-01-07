import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (
  SpecificComponent: React.ComponentType,
  option: boolean | null,
  redirectPath: string,
) => {
  /*
   * option = null : 아무나 출입 가능한 페이지
   * option = true : 로그인한 유저만 출입 가능한 페이지
   * option = false : 로그인한 유저는 출입 불가능한 페이지
   */
  function CheckAuth() {
    const navigate = useNavigate();

    // 로그인 여부를 access token으로 확인
    const isAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
      if (option === true && !isAccessToken) {
        // eslint-disable-next-line no-alert
        alert('로그인이 필요합니다.\n로그인 페이지로 이동합니다.');
        navigate('/login', {
          state: {
            redirectPath,
          },
        });
      }
      if (option === false && isAccessToken) {
        // eslint-disable-next-line no-alert
        alert('비정상적인 접근입니다,\n이전 페이지로 이동합니다.');
        navigate(-1);
      }
    }, [isAccessToken, navigate]);

    return <SpecificComponent />;
  }

  return CheckAuth;
};

export default withAuth;
