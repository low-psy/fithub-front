import React, { FC } from 'react';

interface Props {
  value?: string;
}

const Location: FC<Props> = ({ value }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <p className="mb-5 font-bold">위치</p>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col">
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
