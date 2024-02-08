import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import RoundedIcon from '../common/icon/FloatRounded';

export function formatDate(dateString: string | undefined) {
  if (!dateString) {
    return;
  }
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

export interface TrainingSectionProps {
  trainerInfoDto: TrainingOutlineDto;
}

const MainItem: React.FunctionComponent<TrainingSectionProps> = ({
  trainerInfoDto,
}) => {
  const startDate = formatDate(trainerInfoDto.startDate);
  const endDate = formatDate(trainerInfoDto.endDate);

  return (
    <Link
      to={`/detail/${trainerInfoDto.id}`}
      className="flex flex-col gap-y-4 "
    >
      <div className="relative flex justify-center ">
        <img
          src={trainerInfoDto.trainerInfoDto?.trainerProfileImg}
          alt="프로필 이미지"
          className="max-h-full max-w-full rounded-xl"
        />
        <div>
          <RoundedIcon>favorite</RoundedIcon>
        </div>
      </div>
      <div className="flex grow flex-col space-y-2 ">
        <div className="flex items-center justify-between">
          <h2 className="grow-0 truncate text-xl font-bold ">
            {trainerInfoDto.title}
          </h2>
          <h3 className="shrink-0 rounded-full bg-sub px-2 py-1 font-bold xl:px-4 xl:py-2">
            {trainerInfoDto.closed ? '종료' : '모집중'}
          </h3>
        </div>
        <div className="text-md grow space-y-1 text-stone-800">
          <h3>{trainerInfoDto.location}</h3>
        </div>
        <h3>{`${startDate}~${endDate}`}</h3>
        <div>{`₩ ${trainerInfoDto.price}원`}</div>
      </div>
    </Link>
  );
};

export default MainItem;
