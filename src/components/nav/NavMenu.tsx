/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import NavDropdown from './NavDropdown';
import BookmarkIcon from '../../assets/icons/BookmarkIcon';
import ChatIcon from '../../assets/icons/ChatIcon';
import DefaultModal from '../modal/DefaultModal';
import { SET_IS_CHATLIST_MODAL_OPEN } from '../../redux/slices/chatSlice';
import Chat from '../../pages/Chat';

const NavMenu = () => {
  const { isLogin, role } = useAppSelector((state) => state.user);
  let profileTo = '/user/profile';
  const { isChatListModalOpen } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  let isCreateTrainer = true;
  const location = useLocation();
  if (location.pathname.startsWith('/newpost')) {
    isCreateTrainer = false;
  }
  let defaultProfileIcon = 'account_circle';
  const to = role === 'trainer' ? '/trainer/home' : '/certify-trainer';
  let menuArray = ['프로필', '로그아웃'];
  if (isLogin === false) {
    profileTo = '/login';
  } else if (location.pathname.startsWith('/post')) {
    menuArray = [...menuArray, '북마크한 게시물', '좋아요한 게시글'];
    defaultProfileIcon = 'badge';
  }

  const openChatListModal = () => {
    dispatch(SET_IS_CHATLIST_MODAL_OPEN(true));
  };

  const chatListContent = () => {
    return (
      <div className="flex flex-col px-5">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-[25px] ">채팅</h1>
          <button
            type="button"
            className=" hover:bg-accent_mid flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[33px] font-bold text-white transition-colors"
          >
            +
          </button>
        </div>
        <Chat />
      </div>
    );
  };

  return (
    <>
      <ul className="hidden items-center justify-end gap-5 md:flex  md:grow md:basis-1/3">
        <li key="trainer" className="grow text-center">
          {isCreateTrainer ? (
            <Link
              to={to}
              className="hidden whitespace-nowrap rounded-full px-4 py-3 hover:bg-slate-200 md:inline-block"
            >
              {role === 'trainer' ? '트레이너 모드 전환' : '트레이너신가요?'}
            </Link>
          ) : null}
        </li>
        <li key="book">
          <Link to="/book">
            <BookmarkIcon />
          </Link>
        </li>
        <li key="chat">
          {/* <Link to="/chat">
          <ChatIcon />
        </Link> */}
          <button type="button" onClick={openChatListModal}>
            <ChatIcon />
          </button>
        </li>
        <li key="user" className="">
          <Link to={profileTo}>
            <NavDropdown
              menuArray={menuArray}
              iconString={defaultProfileIcon}
            />
          </Link>
        </li>
      </ul>
      <DefaultModal
        isOpen={isChatListModalOpen}
        onClose={() => dispatch(SET_IS_CHATLIST_MODAL_OPEN(false))}
        children={chatListContent()}
        modalWidth="500px"
        modalMaxHeight="700px"
        className="h-[400px]"
      />
    </>
  );
};

export default NavMenu;
