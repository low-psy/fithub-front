import { AxiosError } from 'axios';
import React from 'react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { getTrainingLikes } from '../../apis/trainig';
import { LoaderData } from '../../types/common';
import UndefinedCover from '../../components/common/UndefinedCover';
import LinkBtnWithImg from '../../components/btn/LinkBtnWithImg';

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
      return redirect('/login');
    }
    if (status === 404) {
      alert('존재하지 않는 회원입니다');
      return redirect('/signup');
    }
    return null;
  }
}) satisfies LoaderFunction;

const TrainingBook = () => {
  const res = useLoaderData() as LoaderData<typeof loader>;
  const data = res?.data;

  return (
    <section className="mx-4 space-y-6">
      <h1 className="text-2xl font-extrabold">트레이닝 찜</h1>
      <article className="">
        <div className="relative">
          {!res?.data[0] && (
            <UndefinedCover>찜한 트레이닝이 없습니다</UndefinedCover>
          )}
        </div>
        <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.map((value) => (
              <div className="rounded-xl bg-gray-100 p-6">
                <LinkBtnWithImg
                  key={value.id}
                  {...value.trainingOutlineDto}
                  to={`/detail/${value.trainingOutlineDto?.id}`}
                  img={
                    value.trainingOutlineDto?.trainerInfoDto?.trainerProfileImg
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
