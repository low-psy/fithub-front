import React, { useEffect, useState } from 'react';
import { fetchChatList } from '../../apis/chat';

interface ChatType {
  roomId: number;
  roomName: string;
  modifiedDate: string;
  img: string;
}

const Chat = () => {
  const [chatList, setChatList] = useState<ChatType[]>();

  const getChatList = async () => {
    const res = await fetchChatList();
    // setChatList(res);
    setChatList([
      {
        roomId: 1,
        roomName: 'room1',
        modifiedDate: '2024-03-31T23:58:17.541Z',
        img: 'https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png',
      },
      {
        roomId: 2,
        roomName: 'room2',
        modifiedDate: '2024-03-31T23:58:17.541Z',
        img: 'https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png',
      },
    ]);
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
            className="flex cursor-pointer items-center  px-5 py-2 transition duration-150 ease-in-out hover:bg-sub"
          >
            <div className="mr-5 h-10 w-10">
              <img src={chat.img} alt="채팅방이미지" />
            </div>
            <div>
              <p className="text-xl">{chat.roomName}</p>
              <p className="text-sm">마지막 대화내용</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
