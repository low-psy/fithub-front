import React from 'react';
import { Outlet } from 'react-router-dom';
import NavComponent from '../components/nav/NavComponent';
import { useAppSelector } from '../hooks/reduxHooks';
import ChatModal from '../components/modal/ChatModal';

const Root = () => {
  const { chattingRoomId } = useAppSelector((state) => state.chat);

  return (
    <div className="mx-4 mt-4 md:mx-10 md:mt-6">
      <NavComponent />
      <main className="mt-8 md:mt-10">
        <Outlet />
        {chattingRoomId && <ChatModal />}
      </main>
    </div>
  );
};
export default Root;
