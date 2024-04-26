import React, { useState } from 'react';
import { authAxios } from 'apis/axios';
import DefaultModal from 'components/modal/DefaultModal';
import { convertDateWithDay, createLocalDateTimeFunc } from 'utils/util';
import { Link } from 'react-router-dom';
import bell from '../../assets/bell.png';

const Notify = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notiArr, setNotiArr] = useState([
    {
      id: 0,
      content: '트레이닝에 리뷰가 달림',
      url: 'string',
      read: false,
      createDate: '2024-04-25T11:13:59.923Z',
    },
    {
      id: 1,
      content: '새로운 예약이 생김',
      url: 'string',
      read: true,
      createDate: '2024-04-25T11:13:59.923Z',
    },
  ]);

  const getNotification = async () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      await authAxios.get('/notify/all?page=1&size=5');
    }
  };

  // 읽은 표시api
  const readNotification = async (notifyId: number) => {
    await authAxios.put(`/notify/select/status/read`, { notifyId });
  };

  return (
    <>
      <button type="button" className="w-10" onClick={getNotification}>
        <img src={bell} alt="bell" className="relative top-[3px]" />
      </button>
      {isOpen && (
        <div className=" absolute right-[100px] z-10 h-[300px] w-[440px] rounded-lg bg-white p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          {notiArr.map((e) => (
            <Link
              key={e.id}
              to={e.url}
              onClick={() => readNotification(e.id)}
              style={{ color: `${e.read ? 'lightgray' : 'black'}` }}
              className="border-lightgray-300 flex cursor-pointer justify-between border-b py-4"
            >
              <span>{e.content}</span>
              <span>{convertDateWithDay(new Date(e.createDate), true)}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Notify;
