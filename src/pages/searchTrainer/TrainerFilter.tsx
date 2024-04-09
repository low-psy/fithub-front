import React, { useEffect } from 'react';
import { Form, Link, useNavigation } from 'react-router-dom';
import FormLabel from '../../components/form/FormLabel';
import SubmitButton from '../../components/form/FormSubmitButton';

const options = [
  { value: 'PILATES', text: '필라테스' },
  { value: 'PT', text: '피티' },
  { value: 'CROSSFIT', text: '크로스핏' },
  { value: 'YOGA', text: '요가' },
];

const TrainerFilter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      onClose();
    }
  }, [onClose]);
  return (
    <Form action="/search/trainer" method="GET" className=" w-[600px] px-4">
      <h2 className='text-black" mb-6 text-3xl font-extrabold'>
        트레이너 검색
        <p className="text-base text-accent">*필요한 조건만 작성해주세요*</p>
      </h2>
      <div className="mb-4 flex items-center justify-center gap-x-2 bg-accent_sub p-4">
        <p>핏헙의 추천 서비스</p>
        <Link
          className="text-2xl font-extrabold text-accent underline underline-offset-4"
          to="/search/recommend"
        >
          트레이닝 추천받기
        </Link>
      </div>
      <ul className="h-full space-y-10">
        <li key="interest">
          <FormLabel htmlFor="interest">
            <h2 className="mb-4 text-3xl font-extrabold text-black">
              카테고리
            </h2>
            <div className="flex gap-x-4">
              {options.map((option) => {
                return (
                  <div>
                    <input
                      type="radio"
                      name="interest"
                      value={option.value}
                      className="mr-1 inline-block"
                    />
                    {option.text}
                  </div>
                );
              })}
            </div>
          </FormLabel>
        </li>
        <li key="name">
          <FormLabel htmlFor="name">
            <h2 className="mb-4 text-3xl font-extrabold text-black">
              트레이너
            </h2>
            <input
              type="text"
              placeholder="트레이너 이름을 입력하세요"
              id="name"
              name="name"
              className="w-full rounded-lg bg-slate-100 p-4 outline-none"
            />
          </FormLabel>
        </li>
        <li key="gender">
          <FormLabel htmlFor="gender">
            <h2 className="mb-4 text-3xl font-extrabold text-black">성별</h2>
            <div className="flex gap-x-4">
              <div>
                <input type="radio" name="gender" value="F" className="mr-2" />
                <span>여성</span>
              </div>
              <div>
                <input type="radio" name="gender" value="M" className="mr-2" />
                <span>남성</span>
              </div>
            </div>
          </FormLabel>
        </li>
      </ul>
      <SubmitButton className="mt-8 text-2xl font-extrabold text-main">
        검색하기
      </SubmitButton>
    </Form>
  );
};

export default TrainerFilter;
