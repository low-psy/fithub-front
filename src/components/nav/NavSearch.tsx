import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import SearchIcon from '../../assets/icons/SearchIcon';
import SearchModule from '../common/module/SearchModule';
import { EventListener } from '../../types/common';

const NavSearch = () => {
  // NavSearch 컴포넌트의 렌더링 로직
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLInputElement>(null);

  const [enteredText, setEnteredText] = useState<string | null>();
  const [isClick, setIsClick] = useState<boolean>(false);

  const inputChangeHandler = () => {
    setEnteredText(inputRef.current?.value);
  };

  const clickHandler = () => {
    setIsClick(true);
  };

  useEffect(() => {
    const focusOutHandler: EventListener = (e) => {
      if (!divRef.current?.contains(e.target as Node)) {
        setIsClick(false);
      }
    };
    document.addEventListener('mousedown', focusOutHandler);
    return document.removeEventListener('mousedown,', focusOutHandler);
  });

  return (
    <Form
      className="flex  h-full  w-full justify-center lg:basis-1/3"
      method="post"
    >
      <div
        className="text-md relative flex
        h-full  w-full items-center rounded-full bg-sub font-medium hover:shadow"
        onClick={clickHandler}
        aria-hidden="true"
        ref={divRef}
      >
        <label htmlFor="search_input" />
        <input
          id="search_input"
          type="text"
          className="ml-2 grow bg-sub pl-2 font-medium placeholder-slate-900 focus:placeholder-sub focus:outline-none md:pl-6"
          placeholder="관심있는 트레이닝을 검색해 보세요!"
          onChange={inputChangeHandler}
          ref={inputRef}
          value={enteredText as string}
        />
        <label htmlFor="btn" />
        <button id="btn" type="submit" className="pr-3">
          <SearchIcon />
          <span className="sr-only">검색 버튼</span>
        </button>
        {enteredText && isClick ? (
          <SearchModule onFocusOut={setIsClick} onClick={setEnteredText} />
        ) : null}
      </div>
    </Form>
  );
};

export default NavSearch;
