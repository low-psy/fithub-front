import React from 'react';
import { AxiosError } from 'axios';
import { ActionFunctionArgs } from 'react-router-dom';
import HomeMain from '../components/home/HomeMain';
import { defaultAxios } from '../apis/axios';

const Home: React.FC = () => {
  return (
    <div className="">
      <HomeMain />
    </div>
  );
};
export default Home;

export const loader = async () => {
  try {
    const response = await defaultAxios.get('/users/training/all');
    if (response && response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    const error = err as unknown as AxiosError;
    console.log(error);
    if (error.status === 404) {
      // eslint-disable-next-line no-alert
      alert('홈페이지 로딩에 실패했습니다');
    } else {
      // eslint-disable-next-line no-alert
      alert('서버에 문제가 발생하였습니다.');
    }
  }
  return null;
};

export const action = ({ request }: ActionFunctionArgs) => {
  console.log(request);
  return null;
};
