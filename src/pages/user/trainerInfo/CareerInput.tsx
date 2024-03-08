import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import { CareerType } from './type';
import { editTrainerCareer, fetchCareerInfo } from '../../../apis/trainer';

enum InputType {
  Company,
  Work,
  StartDate,
  EndDate,
}

interface Prop {
  careerId: number;
}

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
      await editTrainerCareer(
        careerId,
        'VIP휘트니스 홍대3',
        'pt, 관리3',
        'address',
        126.919286,
        37.557453126,
        '2023-12-01',
        '2023-12-31',
        true, // working
      );
    }
    setIsEditing((prev) => !prev);
  };

  const handleChangeCompany = (e: any, type: InputType) => {
    const { value } = e.target;
    const newData: any = { ...data };
    newData[type] = value;
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
      <form>
        <input
          type="company"
          value={data?.company}
          placeholder="회사명"
          ref={inputRef}
          readOnly={!isEditing}
          onChange={(e) => handleChangeCompany(e, InputType.Company)}
          style={{
            marginRight: '1rem',
            paddingBottom: '3px',
            outline: 'none',
            borderBottom: isEditing ? '1px solid lightgrey' : 'none',
          }}
        />
        <input
          type="work"
          value={data?.work}
          placeholder="업무"
          readOnly={!isEditing}
          onChange={(e) => handleChangeCompany(e, InputType.Work)}
          style={{
            marginRight: '1rem',
            paddingBottom: '3px',
            outline: 'none',
            borderBottom: isEditing ? '1px solid lightgrey' : 'none',
          }}
        />
      </form>

      <div>
        <button
          type="button"
          onClick={handleEdit}
          className="h-[40px] w-[110px] rounded bg-gray-300"
        >
          {isEditing ? '완료' : '수정'}
        </button>
        <button
          type="button"
          onClick={handleEdit}
          className="ml-3 h-[40px] w-[110px] rounded bg-gray-300"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CareerInput;
