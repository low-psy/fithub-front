import React from 'react';
import { TrainingSectionProps } from '../../types/training';

const MainItem: React.FunctionComponent<TrainingSectionProps> = ({
  trainerInfoDto,
}) => {
  return (
    <div className="rounded-xl bg-white ">
      <div className="aspect-square">
        {trainerInfoDto.trainerInfoDto.trainerProfileImg}
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
        <div>
          <h3>{trainerInfoDto.location}</h3>
          <h3>{`${trainerInfoDto.startDate} ${trainerInfoDto.endDate}`}</h3>
        </div>
        <div>{`${trainerInfoDto.price}원`}</div>
      </div>
    </div>
  );
};

export default MainItem;
