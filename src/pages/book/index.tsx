import { AxiosError } from 'axios';
import React from 'react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { getTrainingLikes } from '../../apis/trainig';
import { LoaderData } from '../../types/training';
import MainItem from '../../components/item/TrainerItem';
import { TrainingOutlineDto } from '../../types/swagger/model/trainingOutlineDto';

export const loader = (async () => {
  try {
    const res = await getTrainingLikes();
    if (res.status === 200) {
      return res;
    }
    throw new Error(`Server is Troubling with ${res.status}`);
  } catch (error) {
    const err = error as AxiosError<unknown>;
    const status = err.response?.status;
    if (status === 401) {
      alert('로그인한 사용자만 사용가능한 기능입니다');
      redirect('/login');
    } else if (status === 404) {
      alert('존재하지 않는 회원입니다');
      redirect('/signup');
    }
  }
}) satisfies LoaderFunction;

const TrainingBook = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const data = res?.data;
  return (
    <section className="mx-4 space-y-6">
      <h1 className="text-2xl font-extrabold">트레이닝 찜</h1>
      <article className="">
        <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.map((value) => (
              <div className="rounded-xl bg-gray-100 p-6">
                <MainItem
                  key={value.id}
                  trainerInfoDto={
                    value.trainingOutlineDto as TrainingOutlineDto
                  }
                />
              </div>
            ))}
        </ul>
      </article>
    </section>
  );
};

export default TrainingBook;
