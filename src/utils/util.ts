import { AxiosError } from 'axios';
import { TrainingAvailableDateDto } from '../types/swagger/model/trainingAvailableDateDto';
import { ErrorResponseDto } from '../types/swagger/model/errorResponseDto';

// 'YYYY-MM-DD HH-MM-SS' 형식의 dateTime string
export const createLocalDateTimeFunc = (
  selectedDate: string,
  selectedTime: string,
  useCase: string,
) => {
  const selectedDateTime = `${selectedDate}T${selectedTime}:00`;
  const dateObj = new Date(selectedDateTime);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  let formattedDateTime;
  if (useCase === 'date') {
    formattedDateTime = Number(`${year}${month}${day}`);
  } else if (useCase === 'time') {
    formattedDateTime = Number(`${hours}${minutes}${seconds}`);
  } else {
    formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return formattedDateTime;
};

// 'HH-MM' 형식의 time string
export const extractTimesForSelectedDate = (
  dateObjects: Date[],
  selectedDateString: string,
): string[] => {
  const selectedDate = new Date(selectedDateString);

  return dateObjects
    .filter(
      (dateObj) =>
        dateObj.getFullYear() === selectedDate.getFullYear() &&
        dateObj.getMonth() === selectedDate.getMonth() &&
        dateObj.getDate() === selectedDate.getDate(),
    )
    .map((dateObj) => {
      const hours = dateObj.getHours().toString().padStart(2, '0');
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    });
};

// 중첩된 dateTime object를 date값으로 변경
export const convertToDateObjects = (
  availableDates?: Array<TrainingAvailableDateDto>,
) => {
  return (
    availableDates &&
    availableDates
      .map((dateInfo) => {
        return dateInfo.availableTimes?.map((timeInfo) => {
          const dateTimeString = `${dateInfo.date}T${timeInfo.time}`;
          return new Date(dateTimeString);
        });
      })
      .flat()
  );
};

export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);

export function formatPriceToKRW(price: number) {
  return price.toLocaleString();
}

export function formatDate(dateString: string | undefined) {
  if (!dateString) {
    return;
  }
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

export const getDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
  const day = date.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const errorFunc = (err: unknown) => {
  const error = err as AxiosError<ErrorResponseDto>;
  const errorResponse = error.response;
  const status = errorResponse?.status;
  const errorText = errorResponse?.data.message;
  console.error(error);
  alert(errorText);
  return status;
};

// 앱 로드 시 또는 특정 시점에서 호출되는 함수
export function checkAccessTokenExpiration() {
  const expirationTime = localStorage.getItem('expirationTime');
  if (!expirationTime) {
    return;
  }

  const now = new Date();
  const expirationDate = new Date(expirationTime);
  let isTimeout = false;

  if (now >= expirationDate) {
    // 만료 시간이 현재 시간보다 이전이면 accessToken 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    isTimeout = true;
    // 로그아웃 처리 또는 로그인 페이지로 리다이렉트 등의 추가적인 조치를 취할 수 있음
  }
  return isTimeout;
}

// api 성공 이후 전달받은 accessToken을 만료시간과 함께 localStorage에 저장하는 함수
export function handleLoginSuccess(accessToken: any) {
  const now = new Date();
  const expirationTime = new Date(now.getTime() + 20 * 60000); // 현재 시간으로부터 20분 추가

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('expirationTime', expirationTime.toISOString()); // ISO 문자열 형태로 저장
  setTimeout(() => {
    checkAccessTokenExpiration();
  }, 20 * 60000);
}

export function checkAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  const expirationTime = localStorage.getItem('expirationTime');
  if (accessToken && expirationTime) {
    return true;
  }
  return false;
}
