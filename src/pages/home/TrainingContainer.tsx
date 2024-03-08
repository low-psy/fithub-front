import React from 'react';
import UserTrainingItem from './TrainingItem';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';

interface TrainingContainerProps {
  data: TrainingOutlineDto[];
  loaderIndicator: React.MutableRefObject<HTMLDivElement | null>;
  usersTrainingLike: boolean[];
}

const TrainingContainer: React.FC<TrainingContainerProps> = ({
  data,
  loaderIndicator,
  usersTrainingLike,
}) => {
  return (
    <article>
      <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data &&
          data.map((value, index) => {
            const userTrainingLike = usersTrainingLike[index];
            return (
              <UserTrainingItem
                key={value.id}
                trainerInfoDto={value}
                usersTrainingLike={userTrainingLike}
              />
            );
          })}
      </ul>
      <div ref={loaderIndicator} />
    </article>
  );
};

export default TrainingContainer;
