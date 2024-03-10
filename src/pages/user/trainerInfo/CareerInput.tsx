import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { CareerType } from './type';
import { editTrainerCareer, fetchCareerInfo } from '../../../apis/trainer';

enum InputTypes {
  company = 'company',
  work = 'work',
}
interface Prop {
  careerId: number;
}

const handleDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month <= 9 ? 0 : ''}${month}-${day <= 9 ? 0 : ''}${day}`;
};

const CareerInput: FC<Prop> = ({ careerId }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<CareerType>();

  const getCareerInfo = useCallback(async () => {
    const res = await fetchCareerInfo(careerId);
    setData(res);
  }, [careerId]);

  useEffect(() => {
    getCareerInfo();
  }, [getCareerInfo]);

  const handleEdit = async () => {
    if (!isEditing) {
      // 데이터 수정
      inputRef.current?.focus();
    } else {
      // 수정한 데이터 제출
      if (!data) return;
      await editTrainerCareer(careerId, data);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChangeCompany = (e: any, type: InputTypes) => {
    const { value } = e.target;
    const newData: any = { ...data };
    newData[type] = value;
    setData(newData);
  };

  const handleCareerDate = (date: Date, type: 'startDate' | 'endDate') => {
    const newData: any = { ...data };
    const strDate = handleDateToString(date);
    if (type === 'startDate') newData.startDate = strDate;
    if (type === 'endDate') newData.endDate = strDate;
    setData(newData);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <input
        type="company"
        value={data?.company}
        placeholder="회사명"
        ref={inputRef}
        readOnly={!isEditing}
        onChange={(e) => handleChangeCompany(e, InputTypes.company)}
        style={{
          width: '160px',
          marginRight: '1rem',
          paddingBottom: '3px',
          outline: 'none',
          borderBottom: isEditing ? '1px solid lightgrey' : 'none',
        }}
      />
      <input
        type="work"
        value={isEditing ? data?.work : `(${data?.work})`}
        placeholder="업무"
        readOnly={!isEditing}
        onChange={(e) => handleChangeCompany(e, InputTypes.work)}
        style={{
          width: '100px',
          marginRight: '1rem',
          paddingBottom: '3px',
          outline: 'none',
          borderBottom: isEditing ? '1px solid lightgrey' : 'none',
        }}
      />
      {isEditing ? (
        <ReactDatePicker
          id="startDate"
          locale={ko}
          className="w-36 cursor-pointer rounded border border-main px-2 text-black"
          selected={data && new Date(data?.startDate)}
          onChange={(date: Date) => handleCareerDate(date, 'startDate')}
          dateFormat="yyyy-MM-dd"
        />
      ) : (
        data?.startDate
      )}
      ~
      {isEditing && data?.endDate ? (
        <ReactDatePicker
          id="startDate"
          locale={ko}
          className="w-36 cursor-pointer rounded border border-main px-2 text-black"
          selected={new Date(data.endDate)}
          onChange={(date: Date) => handleCareerDate(date, 'endDate')}
          dateFormat="yyyy-MM-dd"
        />
      ) : (
        data?.endDate
      )}
      <div>
        <button
          type="button"
          onClick={handleEdit}
          className="h-[40px] w-[70px] rounded"
          style={{
            background: `${isEditing ? '#67e46d' : '#d1d1d1'}`,
            color: `${isEditing ? 'white' : 'black'}`,
          }}
        >
          {isEditing ? '완료' : '수정'}
        </button>
        <button
          type="button"
          onClick={handleEdit}
          className="bg ml-3 h-[40px] w-[70px] rounded bg-accent text-white  hover:bg-rose-400"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CareerInput;
