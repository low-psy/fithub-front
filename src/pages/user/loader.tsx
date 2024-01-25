import { authAxios } from '../../apis/axios';

const loader = async () => {
  const response = await authAxios.get('/users/profile');
  return response.data;
};

export default loader;
