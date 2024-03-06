import React, { FC } from 'react';

interface Props {
  id: number;
  value: string;
}

const Location: FC<Props> = ({ id, value }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row">
        <div className=" flex w-[100px] items-center">
          <p>위치</p>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-col" key={id}>
            <div className="flex justify-around">
              <div className="align-center flex w-full items-center justify-start">
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />
    </section>
  );
};

export default Location;
