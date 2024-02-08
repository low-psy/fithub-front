import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IProfile } from '../../../types/profile';

interface IWithdrawProps {
  resetActivatedTarget: () => void;
}
interface IWithdrawOutletContext {
  profile: IProfile;
}

const Withdraw = ({ resetActivatedTarget }: IWithdrawProps) => {
  const { profile } = useOutletContext<IWithdrawOutletContext>();
  const [consent, setConsent] = useState<boolean>(false);

  const handleConsent = () => {
    setConsent(!consent);
  };

  const precautions = [
    { id: 0, content: '- 탈퇴 후 계정 복구는 불가능합니다.' },
    {
      id: 1,
      content: '- 보유중인 쿠폰과 포인트는 소멸되어 재발행이 불가능합니다.',
    },
    { id: 2, content: '- 작성하신 후기는 탈퇴 후 삭제되지 않습니다.' },
  ];

  const reasons = [
    { id: 0, content: '원하는 시설이 부족함' },
    { id: 1, content: '사용 빈도가 낮음' },
    { id: 2, content: '고객 응대에 대한 불만족' },
    { id: 3, content: '기타' },
  ];

  return (
    <div className="mt-4 flex flex-col">
      <div className="mb-4">
        <p className="mb-1 font-semibold">탈퇴</p>
        <p>{`탈퇴 계정 : ${profile.email}`}</p>
      </div>

      <div className="mb-4">
        <p className="mb-1 font-semibold">탈퇴 시 유의사항</p>
        {precautions.map((precaution) => {
          return <p key={precaution.id}>{precaution.content}</p>;
        })}
      </div>

      <div className="mb-4">
        <p className="mb-1 font-semibold">탈퇴 사유</p>
        <ul>
          {reasons.map((reason) => {
            return (
              <li key={reason.id}>
                <input type="radio" className="mr-1" />
                {reason.content}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          className="mr-1"
          onChange={handleConsent}
        />
        <label htmlFor="consent">위 내용을 모두 확인하였습니다.</label>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-4 flex  flex-row gap-10">
        <button
          type="button"
          className={`h-12 w-32 rounded bg-gray-400 px-4 py-1 font-bold text-white ${
            consent && 'hover:bg-gray-500'
          }`}
          disabled={!consent}
        >
          탈퇴하기
        </button>
        <button
          type="button"
          className="h-12 w-20 rounded bg-rose-400 px-4 py-1 font-bold text-white hover:bg-rose-500"
          onClick={resetActivatedTarget}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
