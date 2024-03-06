import React, { FC } from 'react';
import { CareerType } from './type';

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
              <div className="flex justify-around">
                <div className="align-center flex w-full items-center justify-start">
                  <span>
                    {`${li.company} (${li.work}) ${li.startDate}~${li.endDate || '현재'}`}
                  </span>
                </div>
                <button
                  type="button"
                  // onClick={() => handleEdit(id)}
                  className="h-[40px] w-[110px] rounded bg-gray-300"
                >
                  변경
                </button>
                {/* <div className=" align-center flex w-full items-center  justify-center"></div> */}
              </div>
            </div>
          ))}

          <div className="flex justify-start">
            <button type="button" className="mt-[1rem] text-gray-400">
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
