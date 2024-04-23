/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { fetchChatList } from '../../apis/chat';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  SET_CHATTING_ROOM_ID,
  SET_CHAT_LIST,
  SET_CHAT_PARTNER,
  SET_IS_DROPDOWN_CHAT_OPEN,
} from '../../redux/slices/chatSlice';
import PortraitIcon from '../../assets/icons/PortraitIcon';

export interface ChatType {
  roomId: number;
  roomName: string;
  senderProfileImg: any;
  lastMessageDate: string;
  lastMessage: string;
  unreadChatCount: number;
  hasUnreadChatMessage: boolean;
}

const Chat = () => {
  const { chatList } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const getChatList = async () => {
    const res = await fetchChatList();
    dispatch(SET_CHAT_LIST(res));
  };

  const handleOpenChat = (info: ChatType) => {
    dispatch(SET_CHATTING_ROOM_ID(info.roomId));
    dispatch(
      SET_CHAT_PARTNER({
        name: info.roomName,
        imgUrl: info.senderProfileImg.url,
      }),
    );
    dispatch(SET_IS_DROPDOWN_CHAT_OPEN(false));
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
            onClick={() => handleOpenChat(chat)}
            className="flex cursor-pointer items-center justify-between  px-2 py-4 transition duration-150 ease-in-out hover:bg-accent_sub"
          >
            <div className="flex">
              <div className="mr-5">
                {chat.senderProfileImg ? (
                  <img
                    src={chat.senderProfileImg.url}
                    alt="senderProfileImg"
                    className="h-12 w-12 rounded-full"
                  />
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
              <p className="mb-1 text-sm">{chat.lastMessageDate}</p>
              {chat.hasUnreadChatMessage && (
                <div className="h-3 w-3 rounded-full bg-accent" />
              )}
              {/* 안읽은 메세지 갯수 */}
              {/* {chat.unreadChatCount && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-accent_mid text-[13px] text-white">
                  {chat.unreadChatCount}
                </div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
