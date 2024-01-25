import React from 'react';
import { Link } from 'react-router-dom';
import { TrainingSectionProps } from '../../types/training';

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${month}월 ${day}일`;
}

const MainItem: React.FunctionComponent<TrainingSectionProps> = ({
  trainerInfoDto,
}) => {
  const startDate = formatDate(trainerInfoDto.startDate);
  const endDate = formatDate(trainerInfoDto.endDate);
  return (
    <Link to={`/detail/${trainerInfoDto.id}`} className=" space-y-4 sm:w-auto">
      <div className="aspect-square">
        <img
          src={trainerInfoDto.trainerInfoDto.trainerProfileImg}
          alt="프로필 이미지"
          className="h-full w-full rounded-xl object-cover "
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="grow-0 basis-36 truncate  text-lg font-bold xl:basis-48">
            {trainerInfoDto.title}
          </h2>
          <h3 className="rounded-full bg-sub px-2 py-1 font-bold xl:px-4 xl:py-2 ">
            {trainerInfoDto.closed ? '종료' : '모집중'}
          </h3>
        </div>
        <div className="text-sm text-stone-800">
          <h3>{trainerInfoDto.location}</h3>
          <h3>{`${startDate} ~ ${endDate}`}</h3>
        </div>
        <div>{`₩ ${trainerInfoDto.price}원`}</div>
      </div>
    </Link>
  );
};

export default MainItem;
