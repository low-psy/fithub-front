import React from 'react';
import MainItem from './MainItem';

const MainContent = () => {
  return (
    <>
      <div className="flex justify-between bg-slate-400">
        <h2>이런 트레이닝은 어떠세요?</h2>
        <button type="button">필터</button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3  xl:grid-cols-4">
        <MainItem />
        <MainItem />
        <MainItem />
        <MainItem />
        <MainItem />
      </div>
    </>
  );
};

export default MainContent;
