import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Info {
  id: number;
  title: string;
  content: string;
}

interface IInfoProps {
  infoList: Info[];
}

interface IMyInfoProps {
  name: string;
  nickname: string;
  gender: string;
  phone: string;
  email: string;
}

const InfoList = ({ infoList }: IInfoProps) => {
  return (
    <div>
      {infoList.map((info) => {
        return (
          <div className="ml-10 flex h-12 items-center gap-10" key={info.id}>
            <p className="w-20 whitespace-nowrap">{info.title}</p>
            <p>{info.content}</p>
          </div>
        );
      })}
    </div>
  );
};

const MyInfo = ({ name, nickname, gender, phone, email }: IMyInfoProps) => {
  const [, setSearchParams] = useSearchParams();
  const toggleToEdit = () => {
    setSearchParams('edit=true');
  };

  const infoList = [
    { id: 0, title: '이름', content: name },
    { id: 1, title: '닉네임', content: nickname },
    { id: 2, title: '성별', content: gender === 'M' ? '남자' : '여자' },
    { id: 3, title: '전화번호', content: phone },
    { id: 4, title: '이메일', content: email },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">내 정보</p>
        <Link to="/user/edit">
          <p
            className="text-sm underline hover:cursor-pointer"
            onClick={toggleToEdit}
            role="presentation"
          >
            수정하기
          </p>
        </Link>
      </div>
      <div>
        <InfoList infoList={infoList} />
      </div>
    </div>
  );
};

export default MyInfo;
