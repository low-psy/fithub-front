import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavTitle from './NavTitle';
import NavMenu from './NavMenu';
import SearchModule from '../modal/SearchModule';
import SearchInput from '../form/SearchInput';
import useSearchModal from '../../hooks/useSearchModal';

const NavComponent = () => {
  const location = useLocation();
  let title;
  let isNavSearch = true;

  if (location.pathname.startsWith('/newpost')) {
    title = '게시물 작성하기';
  } else if (
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/signup') ||
    location.pathname.startsWith('/help/password')
  ) {
    title = '핏헙';
    isNavSearch = false;
  } else {
    title = '핏헙';
  }
  const { isClick, enteredText, clickHandler, inputChangeHandler } =
    useSearchModal();

  return (
    <nav className="flex h-14 justify-between">
      <NavTitle title={title} />
      <div className="relative  flex h-full w-full justify-center lg:basis-1/3">
        {isNavSearch ? (
          <SearchInput
            onChange={(e) => inputChangeHandler(e.target.value)}
            value={enteredText}
            moduleOnclick={clickHandler}
            placeholder="트레이닝을 검색해 보세요!"
            className="rounded-full bg-sub"
            iconClassName="bg-main text-white rounded-full p-2"
          >
            {enteredText && isClick ? (
              <SearchModule
                onFocusOut={clickHandler}
                onClick={inputChangeHandler}
              />
            ) : null}
          </SearchInput>
        ) : null}
      </div>
      <NavMenu />
    </nav>
  );
};

export default NavComponent;
