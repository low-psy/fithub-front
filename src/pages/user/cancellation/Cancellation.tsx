import React, { FC } from 'react';
import testImg from '../../../assets/newpostFilter.png';
import { UsersReserveInfoDto } from '../../../types/swagger/model/usersReserveInfoDto';
import { convertDateWithDay } from '../../../utils/util';

interface Prop {
  info: UsersReserveInfoDto;
}

const Cancellation: FC<Prop> = ({ info }) => {
  return (
    <div className="flexflex-col border border-gray-300 text-sm shadow">
      {/* 제목 */}
      <div className="flex h-[50px] w-full items-center justify-between bg-gray-200 p-4 font-semibold">
        <p>{info.status === 'CANCEL' ? '취소' : '노쇼'}</p>
      </div>
      {/* 내용 */}
      <div className=" flex flex-row px-4 py-10">
        <img src={testImg} alt="training_img" className="mr-4 w-32" />
        <div className="flex flex-col gap-2">
          <p className=" text-sm text-gray-600">
            <span>{info.title} </span>
          </p>
          <p className=" text-sm text-gray-600">
            <span>{`${info.status === 'CANCEL' ? '취소' : '노쇼처리'}일시: `}</span>
            {info?.modifiedDateTime &&
              convertDateWithDay(info?.modifiedDateTime)}
          </p>
          <p className=" text-sm text-gray-600">
            <span>취소상품 총 금액: </span>
            {`${info?.price || '-'}원`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;
