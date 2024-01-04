import React from 'react';
import FilterItem from '../../components/filter/FilterItem';
import HeartIcon from '../../assets/icons/HeartIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import useFilter from '../../hooks/filterHook';

const MyPost = () => {
  const {
    selectedFilter: mySelectedFilter,
    handleFilterClick: handleMyFilterClick,
  } = useFilter('게시글');
  return (
    <div className="space-y-8">
      <article className=" ">
        <div className="bg-slate-50 px-2 py-4">내 게시물</div>
        <div className="flex bg-slate-400">
          {['게시글', '댓글'].map((text) => {
            return (
              <FilterItem
                key={text}
                text={text}
                onClick={() => handleMyFilterClick(text)}
                className={`w-1/2 p-2 hover:bg-sub ${
                  mySelectedFilter === text ? 'bg-sub' : 'bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </article>
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
            <div className="aspect-square w-8 rounded-full bg-red-700">..</div>
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
    </div>
  );
};

export default MyPost;
