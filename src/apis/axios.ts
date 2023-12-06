import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import store from '../redux/store';

export const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
  withCredentials: true,
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
  withCredentials: true,
});

// request 전에 호출되는 함수
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { accessToken } = store.getState().token;

  (config.headers as AxiosHeaders).set(
    'Authorization',
    `Bearer ${accessToken}`,
  );

  return config;
};

// 요청에 error가 발생한 경우 -> catch로 넘어가기 전에 호출되는 함수
const onRequestError = (error: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(error);
};

// response를 받고 호출되는 함수
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// 응답에 error가 발생한 경우 -> catch로 넘어가기 전에 호출되는 함수
const onResponseError = async (
  err: AxiosError | Error,
): Promise<AxiosError> => {
  const error = err as unknown as AxiosError;
  const { response } = error;
  const prevConfig = error?.config as AxiosRequestConfig;

  // TODO: access token 만료 시 재발급 요청 추가하기
  if (response && response.status === 403) {
    // access token 재발급 요청
    try {
      await defaultAxios.patch('/auth/reissue');

      if (response) {
        // TODO: 아직 확인중

        return await authAxios.request(prevConfig);
      }
    } catch (er) {
      console.log(er);
    }
  }
  return Promise.reject(error);
};

// auth axios 요청 interceptor 적용
authAxios.interceptors.request.use(onRequest, onRequestError);
// auth axios 응답 interceptor 적용
authAxios.interceptors.response.use(onResponse, onResponseError);
