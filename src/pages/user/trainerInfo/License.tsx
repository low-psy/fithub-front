import React, { FC } from 'react';
import { LicenceType } from './type';

interface Prop {
  list: LicenceType[] | undefined;
}

const License: FC<Prop> = ({ list }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row">
        <div className="relative flex w-[100px] items-center">
          <p className="absolute top-[8px]">자격증</p>
        </div>
        <div className="flex flex-1 flex-col">
          {list?.map((li: any) => (
            <div className="flex flex-col" key={li.licenseId}>
              <div className="flex justify-around">
                <div className="align-center flex w-full items-center justify-start">
                  <div style={{ width: '152px', height: '139px' }}>
                    <img
                      src={li.url}
                      alt={li.inputName}
                      style={{ maxHeight: '100%' }}
                    />
                  </div>
                </div>
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

export default License;
