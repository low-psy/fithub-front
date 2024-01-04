import React from 'react';
import { redirect, Link } from 'react-router-dom';
import store from '../../redux/store';
import FilterLayout from '../../components/filter/FilterLayout';
import HeartIcon from '../../assets/icons/HeartIcon';
import CommentIcon from '../../assets/icons/CommentIcon';

const Post = () => {
  return (
    <div className="flex gap-8">
      <FilterLayout>
        <div className="space-y-12">
          <div>
            <Link
              to="/newpost"
              className=" block break-keep bg-accent_sub p-4 text-center text-3xl font-extrabold text-accent"
            >
              게시물 작성하기
            </Link>
          </div>
          <div>chat</div>
        </div>
      </FilterLayout>
      <section className="w-[728px] space-y-12">
        <article className="space-y-4">
          <div className="space-y-4  bg-white p-4 shadow-sm drop-shadow-xl">
            <div className="flex gap-4">
              <div className="aspect-square w-12 rounded-full bg-red-700">
                이미지
              </div>
              <div>
                <h2 className="font-bold">name</h2>
                <div className="font-extralight">time</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3>오운완</h3>
              <div className="flex gap-4">
                <div className="aspect-square w-1/2 bg-red-700">이미지</div>
                <div className="aspect-square w-1/2 bg-red-700">이미지</div>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <HeartIcon />
              <CommentIcon />
            </div>
            <div className="flex items-center gap-2">
              <div className="aspect-square w-8 rounded-full bg-red-700">
                ..
              </div>
              <h3>
                <span className="font-bold">Liked </span>by 000님 and 여러 명
              </h3>
            </div>
            <div>
              <h3>댓글 1개 보기</h3>
              <h4 className="font-thin">댓글 달기...</h4>
            </div>
            <div />
          </div>
        </article>
      </section>
    </div>
  );
};

export const loader = () => {
  const { accessToken } = store.getState().token;
  if (accessToken === 'initial access token') {
    return redirect('/login');
  }
  return null;
};

export const action = () => {
  return null;
};

export default Post;
