import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { socialLogin } from '../../apis/user';
import PageLoading from '../../components/common/PageLoading';

function LoginRedirect() {
  const navigate = useNavigate();

  const login = async (platform: string, code: string) => {
    try {
      await socialLogin(platform, code);
      // eslint-disable-next-line no-alert
      alert('소셜 로그인 완료');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const platform = url.searchParams.get('platform');

    if (code !== null) {
      login(platform as string, code as string);
    } else {
      console.log('인가코드 없음');
    }
  });

  return <PageLoading text="로그인 중입니다! 잠시만 기다려 주세요." />;
}

export default LoginRedirect;
