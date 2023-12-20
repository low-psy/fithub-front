import React from 'react';
import MainItem from './MainItem';
import FilterIcon from '../utilities/icons/filterIcon';

const MainContent = () => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">
          이런 <span className="text-main">트레이닝</span>은 어떠세요?
        </h2>
        <button
          type="button"
          className="flex gap-4 rounded-xl bg-slate-200 px-6 py-4 drop-shadow-sm"
        >
          <FilterIcon />
          필터
        </button>
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
