import React from 'react';
import testImg from '../../../assets/newpostFilter.png';

const Cancellation = () => {
  const testContent = [
    { id: 0, title: '', content: '트레이닝 제목' },
    { id: 1, title: '취소 일시', content: '2023. 12. 14(목)' },
    { id: 2, title: '취소상품 총 금액', content: '65,000원' },
  ];

  return (
    <div className="flex flex-col border border-gray-300 shadow">
      {/* 제목 */}
      <div className="flex h-10 w-full items-center bg-gray-300 font-semibold">
        <p className="pl-4">취소 완료 (또는 취소 진행중)</p>
      </div>
      {/* 내용 */}
      <div className=" flex flex-row px-4 py-10">
        <img src={testImg} alt="training_img" className="mr-4 w-32" />
        <div className="flex flex-col gap-1">
          {testContent.map((item) => {
            if (item.title.length === 0)
              return <p className="text-sm">{item.content}</p>;
            return (
              <p className="text-sm">
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

export default Cancellation;
