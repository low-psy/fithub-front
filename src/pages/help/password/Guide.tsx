import React from 'react';

interface IGuideProps {
  onClick: () => void;
}

const Guide = ({ onClick }: IGuideProps) => {
  return (
    <div className="text-sm text-gray-500">
      <p>입력하신 메일 주소로 임시 비밀번호가 발급되었습니다.</p>
      <p>
        이메일이 도착하지 않은경우{' '}
        <span
          aria-hidden
          className="cursor-pointer underline underline-offset-2"
          onClick={onClick}
        >
          여기
        </span>
        를 눌러 재요청 해주세요.
      </p>
    </div>
  );
};

export default Guide;
