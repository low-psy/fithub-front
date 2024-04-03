/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import ChatIcon from '../../assets/icons/ChatIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { SET_IS_CHATLIST_MODAL_OPEN } from '../../redux/slices/chatSlice';
import Chat from '../../pages/Chat';
import PlusIcon from '../../assets/icons/PlusIcon';

const DropdownChatList = () => {
  const { isChatListOpen } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(SET_IS_CHATLIST_MODAL_OPEN(!isChatListOpen));
  };

  return (
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
                // eslint-disable-next-line prettier/prettier
                className=" hover:bg-accent_mid flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[33px] font-bold text-white transition-colors"
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
  );
};

export default DropdownChatList;
