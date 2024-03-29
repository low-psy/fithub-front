import React, { useEffect, useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import FormLabel from '../../components/form/FormLabel';
import FormInput from '../../components/form/FormInput';
import Calendar, { SelectedDates } from '../../components/calendar/Calendar';
import SubmitButton from '../../components/form/FormSubmitButton';

const priceArray = [
  { name: 'lowestPrice', title: '최저가격' },
  { name: 'highestPrice', title: '최고가격' },
];

const TrainingFilter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>({
    startDate: '',
    endDate: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      onClose();
    }
  }, [navigation.state, onClose]);
  return (
    <Form action="/explore" method="GET" className=" w-[600px] p-4">
      <ul className="h-full space-y-10">
        <li key="priceRange">
          <h2 className="mb-4 text-3xl font-extrabold">가격 범위</h2>
          {priceArray.map((obj) => {
            return (
              <div className="mb-2">
                <FormLabel htmlFor={obj.name}>
                  <div className="flex items-center gap-x-4">
                    <div className="mt-2 flex shrink-0 items-center gap-x-2 text-lg font-bold">
                      <span className="material-symbols-outlined rounded-full  text-main">
                        sell
                      </span>
                      {obj.title}
                    </div>
                    <div className="w-full">
                      <FormInput
                        id={obj.name}
                        placeholder={`${obj.title}을 입력하세요!`}
                        name={obj.name}
                        type="number"
                        step={100}
                      />
                    </div>
                  </div>
                </FormLabel>
              </div>
            );
          })}
        </li>
        <li className="" key="calendarRange">
          <div>
            <Calendar
              titleClassName="text-3xl font-extrabold"
              calendarClassName="drop-shadow-none p-0"
              onSelectedDates={(dates) => setSelectedDates(dates)}
            />
            <input
              hidden
              name="startDate"
              value={selectedDates?.startDate as string}
            />
            <input
              hidden
              name="endDate"
              value={selectedDates?.endDate as string}
            />
          </div>
        </li>
      </ul>
      <SubmitButton className="text-2xl font-extrabold text-main">
        제출
      </SubmitButton>
    </Form>
  );
};

export default TrainingFilter;
