import React from 'react';
import LinkBtnWithImg from '../../components/btn/LinkBtnWithImg';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import useBook from '../../hooks/bookHook';
import { deleteTrainingLike, postTrainingLike } from '../../apis/trainig';
import { formatDate } from '../../utils/util';

export interface UsersTrainingItemProps {
  trainerInfoDto: TrainingOutlineDto;
  usersTrainingLike?: boolean;
}

const UserTrainingItem: React.FC<UsersTrainingItemProps> = ({
  trainerInfoDto,
  usersTrainingLike,
}) => {
  const { isBooked, toggleBook } = useBook(
    trainerInfoDto.id,
    usersTrainingLike,
    postTrainingLike,
    deleteTrainingLike,
  );
  const startDate = formatDate(trainerInfoDto.startDate);
  const endDate = formatDate(trainerInfoDto.endDate);
  return (
    <LinkBtnWithImg
      {...trainerInfoDto}
      to={`/detail/${trainerInfoDto.id}`}
      defaultIconState={isBooked}
      toggleBook={toggleBook}
      img={trainerInfoDto.trainerInfoDto?.trainerProfileImg}
      startDate={startDate}
      endDate={endDate}
    />
  );
};

export default UserTrainingItem;
