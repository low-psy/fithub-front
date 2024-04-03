/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { SET_CHATTING_ROOM_ID } from '../../redux/slices/chatSlice';
import CloseIcon from '../../assets/icons/CloseIcon';
import PortraitIcon from '../../assets/icons/PortraitIcon';

const chatData = [
  {
    isMe: false,
    name: '트레이너 썜',
    img: null,
    text: '회원님',
  },
  {
    isMe: false,
    name: '트레이너 썜',
    img: null,
    text: '오늘 식단 보여주세요',
  },
  {
    isMe: true,
    name: '나',
    text: '요기요',
  },
  {
    isMe: false,
    name: '트레이너 썜',
    img: null,
    text: '잘하셨어요',
  },
];

const ChatModal: FC = () => {
  const { chattingRoomId } = useAppSelector((state) => state.chat);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(SET_CHATTING_ROOM_ID(undefined));
  }, [dispatch]);

  useEffect(() => {
    if (chattingRoomId !== undefined) {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      });
    }
    return () => {
      window.removeEventListener('keydown', () => handleClose);
    };
  }, [chattingRoomId, handleClose]);

  const handleChat = (e: any) => {
    setText(e.target.value);
  };

  const closeChatModal = () => {
    dispatch(SET_CHATTING_ROOM_ID(undefined));
  };
  const sendText = () => {
    console.log(text);
    // await
    setText('');
  };

  return (
    <div
      // eslint-disable-next-line
      className="animate-in fade-in bg-sub_light fixed bottom-5 right-[10%] z-10 h-[630px] w-[360px] flex-col justify-between rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      style={{ display: `${chattingRoomId ? 'flex' : 'none'}` }}
    >
      {/* 상대방 정보 */}
      <div className="flex justify-between">
        <div className="flex items-center justify-start p-3">
          {/* <img className="h-12 w-12" src="" alt="상대방이미지" /> */}
          <PortraitIcon />
          <span className="ml-3">트레이너 쌤</span>
        </div>
        <button type="button" onClick={closeChatModal} className="mr-4">
          <CloseIcon />
        </button>
      </div>
      {/* 채팅 내용 */}
      <div className="flex-1 p-3">
        {chatData.map((data: any) => {
          if (data.isMe) {
            return (
              <div className="align-center flex justify-end">
                <div className="rounded-md bg-white p-1 px-3 text-sm">
                  {data.text}
                </div>
                <div className="h-[30px] w-2 overflow-hidden">
                  <div
                    className="relative left-[-65px] h-0
                    w-0 border-b-[50px]
                    border-l-[75px] border-t-[10px]
                    border-b-transparent border-l-white border-t-transparent"
                  />
                </div>
              </div>
            );
          }
          return (
            <div className="align-center my-2 flex">
              {data?.img ? (
                <img src={data?.img} alt="" className=" h-8 w-8" />
              ) : (
                <PortraitIcon />
              )}
              <div className="ml-2 flex flex-col">
                <p className="text-sm">{data.name}</p>
                <div className="align-center flex">
                  <div className="h-[30px] w-2 overflow-hidden">
                    <div
                      className=" h-0 
                        w-0 border-b-[50px]
                        border-r-[75px] border-t-[10px]
                      border-b-transparent border-r-white border-t-transparent"
                    />
                  </div>
                  <div className="rounded-md bg-white p-1 px-3 text-sm">
                    {data.text}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <textarea
          value={text}
          onChange={handleChat}
          className="relative bottom-[-6px] h-[8rem] w-[100%] resize-none border-b-2 border-t-2 p-[1rem] text-sm outline-none"
          placeholder="채팅내용을 입력해 주세요!"
        />
        <div className="flex justify-end bg-white px-5 py-2 pb-3 ">
          <button
            type="button"
            className="w-[80px] rounded-full bg-gray-200 p-1"
            onClick={sendText}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
