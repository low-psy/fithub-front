import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { UserTrainingOutletProps } from '../../types/common';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';
import TrainingContainer from './TrainingContainer';

const UserHome = () => {
  const { trainingInfo, fetchData, last, usersTrainingLike } =
    useOutletContext<UserTrainingOutletProps>();
  const { data, loaderIndicator } = useInfiniteScroll<TrainingOutlineDto>({
    initialData: trainingInfo || [],
    fetchData,
    last,
  });
  return (
    <TrainingContainer
      data={data}
      loaderIndicator={loaderIndicator}
      usersTrainingLike={usersTrainingLike}
    />
  );
};

export default UserHome;
