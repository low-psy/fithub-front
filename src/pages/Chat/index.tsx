/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { fetchChatList } from '../../apis/chat';
import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  SET_CHATTING_ROOM_ID,
  SET_IS_CHATLIST_MODAL_OPEN,
} from '../../redux/slices/chatSlice';
import PortraitIcon from '../../assets/icons/PortraitIcon';

interface ChatType {
  roomId: number;
  name: string;
  modifiedDate: string;
  lastTime: string;
  img: string | null;
  newCount: number;
}

const Chat = () => {
  const [chatList, setChatList] = useState<ChatType[]>();
  const dispatch = useAppDispatch();

  const getChatList = async () => {
    const res = await fetchChatList();
    // setChatList(res);
    setChatList([
      {
        roomId: 1,
        name: '트레이너1',
        modifiedDate: '2024-03-31T23:58:17.541Z',
        lastTime: '오후 4:38',
        newCount: 3,
        img: null,
      },
      {
        roomId: 2,
        name: '트레이너2',
        modifiedDate: '2024-03-31T23:58:17.541Z',
        lastTime: '오후 4:38',
        newCount: 1,
        img: null,
      },
    ]);
  };

  const handleOpenChat = (id: number) => {
    dispatch(SET_CHATTING_ROOM_ID(id));
    dispatch(SET_IS_CHATLIST_MODAL_OPEN(false));
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="flex flex-col">
      {chatList?.map((chat) => {
        return (
          <div
            key={chat.roomId}
            onClick={() => handleOpenChat(chat.roomId)}
            className="flex cursor-pointer items-center justify-between  px-2 py-4 transition duration-150 ease-in-out hover:bg-accent_sub"
          >
            <div className="flex">
              <div className="mr-5 h-10 w-11">
                {chat.img ? <img src={chat.img} alt="img" /> : <PortraitIcon />}
              </div>
              <div>
                <p>{chat.name}</p>
                <p className="mt-1 text-sm">마지막 대화내용</p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <p className="mb-1 text-sm">{chat.lastTime}</p>
              {chat.newCount && (
                // eslint-disable-next-line prettier/prettier
                <div className="bg-accent_mid flex h-4 w-4 items-center justify-center rounded-full text-[13px] text-white">
                  {chat.newCount}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
