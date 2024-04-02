import React, { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { SET_CHATTING_ROOM_ID } from '../../redux/slices/chatSlice';

const chatData = [
  {
    isMe: false,
    name: '트레이너 썜',
    img: 'https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png',
    text: '회원님',
  },
  {
    isMe: false,
    name: '트레이너 썜',
    img: 'https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png',
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
    img: 'https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png',
    text: '잘하셨어요',
  },
];

const ChatModal: FC = () => {
  const { chattingRoomId } = useAppSelector((state) => state.chat);
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
    console.log(e.target.value);
  };

  const closeChatModal = () => {
    dispatch(SET_CHATTING_ROOM_ID(undefined));
  };

  return (
    <div
      // eslint-disable-next-line
      className="bg-sub_light fixed bottom-5 right-[10%] z-10 h-[630px] w-[360px] flex-col justify-between rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      style={{ display: `${chattingRoomId ? 'flex' : 'none'}` }}
    >
      {/* 상대방 정보 */}
      <div className="flex justify-between">
        <div className="flex items-center justify-start p-3">
          <img
            className="mr-5 h-12 w-12"
            src="https://www.freeiconspng.com/thumbs/portrait-icon/portrait-icon-2.png"
            alt="상대방이미지"
          />
          <span>트레이너 쌤</span>
        </div>
        <button type="button" onClick={closeChatModal} className="mr-4">
          {/* <img
            src="https://w7.pngwing.com/pngs/1008/558/png-transparent-computer-icons-button-close-angle-rectangle-logo-thumbnail.png"
            alt=""
          /> */}
          x
        </button>
      </div>
      {/* 채팅 내용 */}
      <div className="flex-1 p-5">
        {chatData.map((data) => {
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
              <img src={data.img} alt="" className="mr-2 h-8 w-8" />
              <div className="flex flex-col">
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
          onChange={handleChat}
          className="h-[8rem] w-[100%] resize-none border-b-2 border-t-2 p-[1rem] text-sm outline-none"
          placeholder="채팅내용을 입력해 주세요!"
        />
        <div className="flex items-center justify-between px-5 py-2 pb-3">
          <button type="button">
            <img
              className="h-6 w-6"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"
              alt="pictureIcon"
            />
          </button>
          <button
            type="button"
            className="w-[80px] rounded-full bg-gray-200 p-1"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
