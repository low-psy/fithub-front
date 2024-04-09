/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { getTime, handleDateToString } from 'utils/util';
import { fetchChatList } from '../../apis/chat';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  SET_CHATTING_ROOM_ID,
  SET_CHAT_LIST,
  SET_IS_CHATLIST_MODAL_OPEN,
} from '../../redux/slices/chatSlice';
import PortraitIcon from '../../assets/icons/PortraitIcon';

export interface ChatType {
  roomId: number;
  roomName: string;
  senderProfileImg: string | null;
  lastMessageDate: Date;
  lastMessage: string;
  unreadChatCount: number;
}

const Chat = () => {
  const { chatList } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const getChatList = async () => {
    const res = await fetchChatList();
    // dispatch(SET_CHAT_LIST(res));
    dispatch(
      SET_CHAT_LIST([
        {
          roomId: 1,
          roomName: '트레이너1',
          senderProfileImg: null,
          lastMessageDate: new Date('2024-04-09T08:06:23.825Z'),
          lastMessage: '마지막 메시지',
          unreadChatCount: 3,
        },
        {
          roomId: 2,
          roomName: '트레이너2',
          senderProfileImg: null,
          lastMessageDate: new Date('2024-04-19T08:06:23.825Z'),
          lastMessage: '마지막 메시지2',
          unreadChatCount: 1,
        },
      ]),
    );
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
      {chatList?.map((chat: ChatType) => {
        return (
          <div
            key={chat.roomId}
            onClick={() => handleOpenChat(chat.roomId)}
            className="flex cursor-pointer items-center justify-between  px-2 py-4 transition duration-150 ease-in-out hover:bg-accent_sub"
          >
            <div className="flex">
              <div className="mr-5 h-10 w-11">
                {chat.senderProfileImg ? (
                  <img src={chat.senderProfileImg} alt="senderProfileImg" />
                ) : (
                  <PortraitIcon />
                )}
              </div>
              <div>
                <p>{chat.roomName}</p>
                <p className="mt-1 text-sm">{chat.lastMessage}</p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <p className="mb-1 text-sm">
                {handleDateToString(chat.lastMessageDate)}{' '}
                {getTime(chat.lastMessageDate)}
              </p>
              {chat.unreadChatCount && (
                // eslint-disable-next-line prettier/prettier
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent_mid text-[13px] text-white">
                  {chat.unreadChatCount}
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
