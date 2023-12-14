import React from 'react';
import MainFilter from './MainFilter';
import MainContent from './MainContent';

const HomeMain = () => {
  return (
    <div className="space-y-10">
      <MainFilter />
      <MainContent />
    </div>
  );
};
export default HomeMain;
