import React, { useEffect } from 'react';
import { Form, useNavigation } from 'react-router-dom';
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
    console.log('trainerfillter effect');
  }, [onClose]);
  return (
    <Form action="/search/trainer" method="GET" className=" w-[600px] p-4">
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
              className="outline-none"
            />
          </FormLabel>
        </li>
        <li key="gender">
          <FormLabel htmlFor="gender">
            <h2 className="mb-4 text-3xl font-extrabold text-black">성별</h2>
            <div className="space-x-4">
              <input
                type="radio"
                name="gender"
                value="F"
                className="mr-1 inline-block"
              />
              여성
              <input
                type="radio"
                name="gender"
                value="M"
                className="mr-1 inline-block"
              />
              남성
            </div>
          </FormLabel>
        </li>
      </ul>
      <SubmitButton className="mt-8 text-2xl font-extrabold text-main">
        제출
      </SubmitButton>
    </Form>
  );
};

export default TrainerFilter;
