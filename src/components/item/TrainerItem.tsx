import React from 'react';
import { Link } from 'react-router-dom';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import RoundedIcon from '../common/icon/FloatRounded';
import { deleteTrainingLike, postTrainingLike } from '../../apis/trainig';
import useBook from '../../hooks/bookHook';
import { formatDate } from '../../utils/util';

export interface TrainingSectionProps {
  trainerInfoDto: TrainingOutlineDto;
}

const MainItem: React.FunctionComponent<TrainingSectionProps> = ({
  trainerInfoDto,
}) => {
  const { isBooked, toggleBook } = useBook(
    trainerInfoDto.id,
    true,
    postTrainingLike,
    deleteTrainingLike,
  );
  const startDate = formatDate(trainerInfoDto.startDate);
  const endDate = formatDate(trainerInfoDto.endDate);

  return (
    <Link
      to={`/detail/${trainerInfoDto.id}`}
      className="flex flex-col gap-y-4 "
    >
      <div className="relative flex justify-center rounded-xl bg-white shadow-md">
        <img
          src={trainerInfoDto.trainerInfoDto?.trainerProfileImg}
          alt="프로필 이미지"
          className="max-h-full max-w-full rounded-xl"
        />
        <div>
          <RoundedIcon onClick={toggleBook} defaultState={isBooked}>
            favorite
          </RoundedIcon>
        </div>
      </div>
      <div className="flex grow flex-col  space-y-2">
        <div className="flex grow basis-[60px] items-center justify-between ">
          <h2 className="break-keep  text-xl font-bold">
            {trainerInfoDto.title}
          </h2>
          <div className="shrink-0 pl-2">
            <h3 className="rounded-full bg-sub px-2 py-1 font-bold xl:px-4 xl:py-2">
              {trainerInfoDto.closed ? '종료' : '모집중'}
            </h3>
          </div>
        </div>
        <div className="text-md  space-y-1  truncate text-stone-800">
          <h3>{trainerInfoDto.location}</h3>
        </div>
        <h3 className="">{`${startDate}~${endDate}`}</h3>
        <div className="">{`₩ ${trainerInfoDto.price}원`}</div>
      </div>
    </Link>
  );
};
export default MainItem;
