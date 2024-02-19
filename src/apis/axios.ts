import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// authorization이 필요없는 axios 인스턴스
export const defaultAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
  withCredentials: true,
});

// authorization이 필요한 authAxios
export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
  withCredentials: true,
});

// request 전에 호출되는 함수
// Authorization 필드에 access token 추가
const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');

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
const onResponse = (
  response: AxiosResponse,
): AxiosResponse | Promise<AxiosResponse> => {
  // access token 갱신 시 토큰 갱신
  if (response.status === 201) {
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
  }
  return response;
};

// 응답에 error가 발생한 경우 -> catch로 넘어가기 전에 호출되는 함수
const onResponseError = async (
  err: AxiosError | Error,
): Promise<AxiosError> => {
  const error = err as unknown as AxiosError;
  const { response } = error;

  if (response?.status === 405) {
    window.location.replace('/login');
  }

  return Promise.reject(error);
};

// auth axios 요청 interceptor 적용
authAxios.interceptors.request.use(onRequest, onRequestError);
// auth axios 응답 interceptor 적용
authAxios.interceptors.response.use(onResponse, onResponseError);
