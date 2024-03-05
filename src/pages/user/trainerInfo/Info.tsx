import React, { FC } from 'react';
import {
  Career,
  License,
  Location,
  TrainerInfoObj,
  TrainerInfoType,
} from './trainerInfo';

interface Props {
  type: TrainerInfoType;
  list: License[] | Career[] | Location[] | undefined;
  handleEdit: (id: number) => void;
}

const Info: FC<Props> = ({ type, list, handleEdit }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row">
        <div className=" flex h-[50px] w-[100px] items-center">
          {TrainerInfoObj[type]}
        </div>

        <div className="flex flex-1 flex-col">
          {list?.map((li: any) => (
            <div
              className="flex flex-col"
              key={
                type === TrainerInfoType.License
                  ? li.licenseId
                  : type === TrainerInfoType.Career
                    ? li.careerId
                    : li.id
              }
            >
              <div className="flex h-[50px] justify-around">
                <div className="align-center flex w-full items-center justify-start">
                  {type === TrainerInfoType.License && li.inputName}
                  {type === TrainerInfoType.Career && (
                    <span>
                      {`${li.company} (${li.work}) ${li.startDate}~${li.endDate || '현재'}`}
                    </span>
                  )}
                  {type === TrainerInfoType.Location && li.value}
                </div>
                <div className=" align-center flex w-full items-center  justify-center">
                  <button
                    type="button"
                    // onClick={() => handleEdit(id)}
                    className="h-[40px] w-[110px] rounded bg-gray-300"
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex h-[50px] justify-start">
            <button type="button" className="text-gray-400">
              추가하기
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />
    </section>
  );
};

export default Info;
