import React from 'react';
import testImg from '../../../assets/newpostFilter.png';

interface IReservationProps {
  closed?: boolean;
}

const Reservation = ({ closed }: IReservationProps) => {
  const testContent = [
    { id: 0, title: '예약일', content: '2023.12.11' },
    { id: 1, title: '장소', content: '마포구 어울마당로 65' },
    { id: 2, title: '수업 일시', content: '2023. 12. 15(금)' },
    { id: 3, title: '취소 가능 일시', content: '2023.12.14(목) 까지' },
    { id: 4, title: '상태', content: closed ? '수업 종료' : '예약 완료' },
  ];

  return (
    <div className="flex flex-col border border-gray-300 shadow">
      {/* 제목 */}
      <div
        className={`flex h-10 w-full items-center font-semibold ${
          closed ? 'bg-gray-300' : 'bg-sub'
        }`}
      >
        <p className="pl-4">트레이닝 제목</p>
      </div>
      {/* 내용 */}
      <div className=" flex flex-row px-4 py-10">
        <img src={testImg} alt="training_img" className="mr-4 w-32" />
        <div className="flex flex-col gap-1">
          {testContent.map((item) => {
            return (
              <p className="text-sm" key={item.id}>
                <span className="text-gray-600">{item.title}: </span>
                {item.content}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
