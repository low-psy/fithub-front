import { AxiosError } from 'axios';
import { add } from 'date-fns';
import { redirect } from 'react-router-dom';
import { TrainingAvailableDateDto } from '../types/swagger/model/trainingAvailableDateDto';
import { ErrorResponseDto } from '../types/swagger/model/errorResponseDto';
import { GeolocationPosition, refreshResData } from '../types/common';
import { Location } from '../types/swagger/model/location';
import {
  getBookedPost,
  getLikedPost,
  getPost,
  getPostSearch,
} from '../apis/post';

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

// api 성공 이후 전달받은 accessToken을 만료시간과 함께 localStorage에 저장하는 함수
export function handleLoginSuccess(accessToken: any) {
  localStorage.setItem('accessToken', accessToken);
}

export function setRefreshToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

export function isRefreshResData(data: any): data is refreshResData {
  return data.accessToken !== undefined && typeof data.accessToken === 'string';
}
const { kakao } = window;
export function addressToPositions(address: string) {
  const geocoder = new kakao.maps.services.Geocoder();
  return new Promise<{ lat: number; lng: number }>((resolve) => {
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        });
      }
    });
  });
}

export const fetchLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error('현재 브라우저에서 Geolocation api를 지원하지 않습니다'),
      );
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

export const postFetchFunc = async (
  searchParams: URLSearchParams,
  page: number,
) => {
  const booked = searchParams.get('booked') || undefined;
  const liked = searchParams.get('liked') || undefined;
  const scope = searchParams.get('scope') || undefined;
  const searchInput = searchParams.get('searchInput') || undefined;
  const alignString = searchParams.get('align') || undefined;
  let res;
  if (scope || searchInput || alignString) {
    res = await getPostSearch(
      { keyword: searchInput, scope },
      alignString,
      page,
    );
  } else if (booked) {
    res = await getBookedPost(page);
  } else if (liked) {
    res = await getLikedPost(page);
  } else {
    res = await getPost(page);
  }
  return res;
};

// new Date => YYYY-MM-DD 문자열로 변환
export const handleDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month <= 9 ? 0 : ''}${month}-${day <= 9 ? 0 : ''}${day}`;
};

// 하루전날 날짜 구하기
export const getYesterday = (date: Date) => {
  // 하루를 밀리초 단위로 변환하여 빼기
  const oneDayMilliseconds = 1000 * 60 * 60 * 24;
  const yesterday = new Date(date.getTime() - oneDayMilliseconds);
  return handleDateToString(yesterday);
};

// 2024-03-05 03:11:29 => 2024.03.05(화)
export const convertDateWithDay = (date: Date) => {
  const dateObj = new Date(date);
  const isoStr = dateObj.toISOString();
  const newDate = isoStr.split('T')[0].split('-').join('.');
  const day = dateObj.getDay();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const hour = dateObj.getHours();
  const min = dateObj.getMinutes();
  const sec = dateObj.getSeconds();

  return `${newDate}(${days[day]}) ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

export const getTime = (date: Date) => {
  let hours = date.getHours();
  const isAfternoon = hours > 12;
  hours = isAfternoon ? hours - 12 : hours;
  const minutes = date.getMinutes();
  return `${isAfternoon ? '오후' : '오전'} ${hours}:${minutes < 10 && '0'}${minutes}`;
};
