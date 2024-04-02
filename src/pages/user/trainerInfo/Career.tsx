import React, { FC, useEffect, useState, useCallback } from 'react';
import { CareerType } from './type';
import SingleCareer from './SingleCareer';
import { addTrainerCareer } from '../../../apis/trainer';
import NewCareer from './NewCareer';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  SET_CAREERLIST,
  SET_WORKING_CAREERID,
} from '../../../redux/slices/careerSlice';

interface Prop {
  list: CareerType[] | undefined;
}

interface NewCareerType {
  company: string;
  address: string;
  work: string;
  startDate: string;
  endDate: string;
  working: boolean;
}

const Career: FC<Prop> = ({ list }) => {
  const { careerList } = useAppSelector((state) => state.career);
  const [newCareer, setNewCareer] = useState<NewCareerType | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SET_CAREERLIST(list));
  }, [dispatch, list]);

  const showNewCareerInput = async () => {
    setNewCareer({
      company: '',
      address: '',
      work: '',
      startDate: '',
      endDate: '',
      working: false,
    });
  };

  const isValid = () => {
    if (!newCareer?.company.length) {
      alert('회사를 입력해주세요');
      return false;
    }
    if (!newCareer?.work.length) {
      alert('업무를 입력해주세요');
      return false;
    }
    if (!newCareer?.startDate.length) {
      alert('입사날짜를 입력해주세요');
      return false;
    }
    // 입사날짜가 퇴사날짜보다 늦는경우
    if (
      newCareer?.endDate.length &&
      new Date(newCareer?.startDate) > new Date(newCareer.endDate)
    ) {
      alert('올바른 퇴사날짜를 입력해주세요');
      return false;
    }
    return true;
  };

  const addCareer = async () => {
    if (!isValid()) return;
    const newCareerId = await addTrainerCareer({
      address: '',
      working: false,
      longitude: 0,
      latitude: 0,
      ...newCareer,
    });

    dispatch(
      SET_CAREERLIST([
        ...careerList,
        {
          careerId: newCareerId,
          company: newCareer?.company,
          work: newCareer?.work,
          startDate: newCareer?.startDate,
          endDate: newCareer?.endDate,
        },
      ]),
    );

    // 초기화
    setNewCareer(null);
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <p className="mb-5 font-bold">경력</p>

        <div className="flex flex-1 flex-col">
          {careerList?.map((li: CareerType) => {
            if (li.working) {
              dispatch(SET_WORKING_CAREERID(li.careerId));
            }
            return (
              <div className="flex flex-col" key={li.careerId}>
                <SingleCareer careerId={li?.careerId} />
              </div>
            );
          })}
          {newCareer && <NewCareer data={newCareer} setData={setNewCareer} />}

          <div className="flex justify-start">
            <button
              type="button"
              className="mt-[1rem] text-gray-400"
              onClick={newCareer ? addCareer : showNewCareerInput}
            >
              {newCareer ? '추가 완료' : '추가하기'}
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-4 w-full border shadow-slate-500" />
    </section>
  );
};

export default Career;
