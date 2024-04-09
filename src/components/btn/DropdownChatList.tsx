/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { createChat, fetchChatList } from 'apis/chat';
import DefaultModal from 'components/modal/DefaultModal';
import ChatIcon from '../../assets/icons/ChatIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { SET_IS_CHATLIST_MODAL_OPEN } from '../../redux/slices/chatSlice';
import Chat from '../../pages/Chat';
import PlusIcon from '../../assets/icons/PlusIcon';

const DropdownChatList = () => {
  const { isChatListOpen } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [receiverId, setReceiverId] = useState<string | undefined>();

  const handleOpen = () => {
    dispatch(SET_IS_CHATLIST_MODAL_OPEN(!isChatListOpen));
  };

  const addChat = async (e: any) => {
    e.preventDefault();
    if (!receiverId) return;
    try {
      await createChat(Number(receiverId));
      // update chatlist
      const res = await fetchChatList();
      // dispatch(res);
    } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  const addChatContent = () => {
    return (
      <div className="h-[200px] w-[400px] px-5">
        <h1 className="mb-10 text-xl font-bold">채팅방 생성하기</h1>

        <form action="submit" onSubmit={(e) => addChat(e)}>
          <input
            type="text"
            placeholder="상대방의 아이디를 입력하세요"
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-[100%] outline-none"
          />
        </form>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={addChat}
            className="h-[40px] w-[100px] rounded-lg bg-sub"
          >
            생성하기
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <button type="button" onClick={handleOpen}>
          <ChatIcon />
        </button>
        {isChatListOpen && (
          <div className="absolute right-[110px] z-10 h-[300px] w-[400px] rounded-lg bg-white p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex flex-col px-5">
              <div className="mb-5 flex items-center justify-between">
                <h1 className="text-[20px] ">채팅</h1>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  // eslint-disable-next-line prettier/prettier
                  className=" flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[33px] font-bold text-white transition-colors hover:bg-accent_mid"
                >
                  <PlusIcon />
                </button>
              </div>
              <div className="h-[200px] overflow-y-auto">
                <Chat />
              </div>
            </div>
          </div>
        )}
      </div>
      <DefaultModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={addChatContent()}
      />
    </>
  );
};

export default DropdownChatList;
