import React from 'react';
import { Link } from 'react-router-dom';

const NewTrainer = () => {
  return (
    <main>
      <section
        className="space-y-36
   pb-24 text-center"
      >
        <div className=" space-y-12 pt-24 text-5xl font-extrabold">
          <h1>혹시 회원님을 찾고계신가요?</h1>
          <h1>
            그렇다면 <span className="text-main">핏헙</span>을 이용해보세요!
          </h1>
        </div>
        <div>
          <Link
            to="/trainer/new/create"
            className="inline-block w-full rounded-full bg-main py-5 text-3xl font-extrabold text-white md:w-1/2"
          >
            트레이너 생성하기{' '}
          </Link>
        </div>
        <div>
          <div className="space-y-12">
            <h1 className="text-2xl font-bold text-accent">
              트레이너 회원 매칭 시스템
            </h1>
            <div>image</div>
            <h2>
              트레이닝을 개설하시면 핏헙의 회원님들에게 공개하여 트레이닝 참여
              신청을 하실 수 있어요!
            </h2>
          </div>
        </div>
        <div className=" text-center">
          <div className="space-y-12">
            <h1 className="text-2xl font-bold text-accent">
              트레이닝 일정 관리
            </h1>
            <div>image</div>
            <h2>트레이너님이 가능한 일정에 맞게 수업이 진행됩니다</h2>
          </div>
        </div>
        <div className=" text-center">
          <div className="space-y-12">
            <h1 className="text-2xl font-bold text-accent">
              트레이너 추천 시스템
            </h1>
            <div>image</div>
            <h2>
              핏헙의 회원님들에게 맞춤형 트레이너를 추천함으로써 트레이너분들은
              본인이 가장 필요한 회원님들을 만나실 수 있습니다
            </h2>
          </div>
        </div>
        <div className=" text-center">
          <div className="space-y-12">
            <h1 className="text-2xl font-bold text-accent">채팅방 기능</h1>
            <div>image</div>
            <h2>채팅방 기능을 통해 회원님과 커뮤니케이션을 할 수 있어요!</h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewTrainer;
