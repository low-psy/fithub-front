import React, { FC } from 'react';
import { CareerType } from './type';
import CareerInput from './CareerInput';

interface Prop {
  list: CareerType[] | undefined;
}

const Career: FC<Prop> = ({ list }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row">
        <div className="relative flex w-[100px] items-center">
          <p className="absolute top-[8px]">경력</p>
        </div>

        <div className="flex flex-1 flex-col">
          {list?.map((li: CareerType) => (
            <div className="flex flex-col" key={li.careerId}>
              <CareerInput careerId={li.careerId} />
            </div>
          ))}

          <div className="flex justify-start">
            <button
              type="button"
              className="mt-[1rem] text-gray-400"
              // onClick={addCareer}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />
    </section>
  );
};

export default Career;
