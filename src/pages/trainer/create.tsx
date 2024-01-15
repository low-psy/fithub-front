import React from 'react';
import TrainerForm from '../../components/trainer/TrainerForm';

const CreateTrainer = () => {
  return (
    <div className="space-y-8">
      <TrainerForm useCase="trainer" />
    </div>
  );
};

export default CreateTrainer;
