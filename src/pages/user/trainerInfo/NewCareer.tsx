import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import DaumPostcode from 'react-daum-postcode';
import { InputTypes } from './CareerInput';
import { handleDateToString } from '../../../utils/util';
import DefaultModal from '../../../components/modal/DefaultModal';

interface DataType {
  company: string;
  address: string;
  work: string;
  startDate: string;
  endDate: string;
}

const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

const NewCareer = ({
  data,
  setData,
}: {
  data: DataType;
  setData: (data: any) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAddressModalOpened, setIsAddressModalOpened] =
    useState<boolean>(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: InputTypes) => {
    const { value } = e.target;
    const newData: any = { ...data };
    newData[type] = value;
    setData(newData);
  };

  const handleCareerDate = (date: Date, type: 'startDate' | 'endDate') => {
    const newData: any = { ...data };
    const strDate = handleDateToString(date);
    if (type === 'startDate') {
      if (newData.endDate && date > new Date(newData.endDate)) {
        alert('올바른 입사날짜를 입력해주세요');
        return;
      }
      newData.startDate = strDate;
    }
    if (type === 'endDate') {
      if (newData.startDate && new Date(newData.startDate) > date) {
        alert('올바른 퇴사날짜를 입력해주세요');
        return;
      }
      newData.endDate = strDate;
    }
    setData(newData);
  };

  const handleGetAddress = (data: { address: string }) => {
    setIsAddressModalOpened(false);

    const { address } = data;
    let latitude: number;
    let logitude: number;

    // 위도 및 경도 구하기
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        latitude = Number(result[0].y); // 위도
        logitude = Number(result[0].x); // 경도
        setData((prev: any) => {
          return {
            ...prev,
            address,
            latitude,
            logitude,
          };
        });
      }
    });
  };

  return (
    <>
      <div className="flex">
        <input
          type="company"
          value={data?.company}
          placeholder="회사명"
          ref={inputRef}
          onChange={(e) => handleChange(e, InputTypes.company)}
          style={{
            width: '15%',
            marginRight: '1rem',
            paddingBottom: '3px',
            outline: 'none',
            borderBottom: '1px solid lightgrey',
          }}
        />
        <input
          type="address"
          value={data?.address}
          placeholder="주소"
          // onChange={(e) => handleChange(e, InputTypes.address)}
          onClick={() => setIsAddressModalOpened(true)}
          style={{
            width: '25%',
            marginRight: '1rem',
            paddingBottom: '3px',
            outline: 'none',
            borderBottom: '1px solid lightgrey',
          }}
        />
        <input
          type="work"
          value={data?.work}
          placeholder="업무"
          onChange={(e) => handleChange(e, InputTypes.work)}
          style={{
            width: '10%',
            marginRight: '1rem',
            paddingBottom: '3px',
            outline: 'none',
            borderBottom: '1px solid lightgrey',
          }}
        />
        <ReactDatePicker
          id="startDate"
          locale={ko}
          className="w-[100px]  cursor-pointer rounded border border-main px-2 text-black"
          selected={data && data?.startDate ? new Date(data?.startDate) : null}
          onChange={(date: Date) => handleCareerDate(date, 'startDate')}
          dateFormat="yyyy-MM-dd"
          placeholderText="입사날짜"
        />
        ~
        <ReactDatePicker
          id="endDate"
          locale={ko}
          className="w-[100px]  cursor-pointer rounded border border-main px-2 text-black"
          selected={data && data?.endDate ? new Date(data?.endDate) : null}
          onChange={(date: Date) => handleCareerDate(date, 'endDate')}
          dateFormat="yyyy-MM-dd"
          placeholderText="퇴사날짜"
        />
      </div>
      <DefaultModal
        isOpen={isAddressModalOpened}
        onClose={() => setIsAddressModalOpened(false)}
        modalWidth="500px"
      >
        <DaumPostcode onComplete={handleGetAddress} />
      </DefaultModal>
    </>
  );
};

export default NewCareer;
