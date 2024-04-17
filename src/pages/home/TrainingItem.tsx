import React from 'react';
import LinkBtnWithImg from '../../components/btn/LinkBtnWithImg';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import useBook from '../../hooks/bookHook';
import { deleteTrainingLike, postTrainingLike } from '../../apis/trainig';
import { formatDate } from '../../utils/util';

export interface UsersTrainingItemProps {
  trainingOutlineDto: TrainingOutlineDto;
  usersTrainingLike?: boolean;
}

const UserTrainingItem: React.FC<UsersTrainingItemProps> = ({
  trainingOutlineDto,
  usersTrainingLike,
}) => {
  const { isBooked, toggleBook } = useBook(
    trainingOutlineDto.id,
    usersTrainingLike,
    postTrainingLike,
    deleteTrainingLike,
  );
  const startDate = formatDate(trainingOutlineDto.startDate);
  const endDate = formatDate(trainingOutlineDto.endDate);
  return (
    <LinkBtnWithImg
      {...trainingOutlineDto}
      to={`/detail/${trainingOutlineDto.id}`}
      defaultIconState={isBooked}
      toggleBook={toggleBook}
      img={trainingOutlineDto.trainerInfoDto?.trainerProfileImg}
      startDate={startDate}
      endDate={endDate}
      categories={trainingOutlineDto.categories}
    />
  );
};

export default UserTrainingItem;
