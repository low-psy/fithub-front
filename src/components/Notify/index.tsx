import React, { useState } from 'react';
import { convertDateWithDay } from 'utils/util';
import { Link } from 'react-router-dom';
import { checkReadNotification, fetchNotification } from 'apis/notify';
import { NotifyDto } from 'types/swagger/model/notifyDto';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { SET_IS_NOTIFY_OPEN } from 'redux/slices/notifySlice';
import { SET_IS_DROPDOWN_CHAT_OPEN } from 'redux/slices/chatSlice';
import bell from '../../assets/bell.png';

const Notify = () => {
  const [notiArr, setNotiArr] = useState<NotifyDto[]>();
  const { isNotifyOpen } = useAppSelector((state) => state.notify);
  const { isDropdownChatOpen } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const getNotification = async () => {
    dispatch(SET_IS_NOTIFY_OPEN(!isNotifyOpen));
    if (!isNotifyOpen) {
      const notifications = await fetchNotification();
      setNotiArr(notifications.content);
    }

    if (isDropdownChatOpen) {
      dispatch(SET_IS_DROPDOWN_CHAT_OPEN(false));
    }
  };

  // 읽은 표시api
  const readNotification = async (notifyId: number) => {
    await checkReadNotification(notifyId);
    await getNotification();
  };

  const { host } = window.location;

  return (
    <>
      <button type="button" className="w-10" onClick={getNotification}>
        <img src={bell} alt="bell" className="relative top-[3px]" />
      </button>
      {isNotifyOpen && (
        <div className="absolute right-[100px] z-10 h-[300px] w-[440px]  rounded-lg bg-white p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="h-[100%] overflow-auto">
            {notiArr && notiArr.length ? (
              notiArr?.map((e) => (
                <Link
                  key={e.id}
                  to={`http://${host}${e.url}`}
                  onClick={() => readNotification(e.id)}
                  style={{ color: `${e.read ? 'lightgray' : 'black'}` }}
                  className="border-lightgray-300 flex cursor-pointer justify-between border-b py-4"
                >
                  <span>{e.content}</span>
                  <span>
                    {e.createDate && convertDateWithDay(e.createDate, true)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="flex h-[100%] items-center justify-center ">
                알림내용이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Notify;
