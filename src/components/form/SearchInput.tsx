import React, { useEffect, useRef } from 'react';
import { EventListener, SearchInputProps } from '../../types/common';

const SearchInput: React.FC<SearchInputProps> = ({
  iconText,
  className,
  iconClassName,
  children,
  moduleOnclick,
  ...rest
}) => {
  // SearchInput 컴포넌트의 렌더링 로직
  const divRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOutHandler: EventListener = (e) => {
      if (!divRef.current?.contains(e.target as Node)) {
        moduleOnclick(false);
      }
    };
    document.addEventListener('mousedown', focusOutHandler);
    return document.removeEventListener('mousedown,', focusOutHandler);
  });

  return (
    <div
      className={`${className} text-md relative flex
        h-full  w-full items-center px-2 font-medium `}
      aria-hidden="true"
      ref={divRef}
      onClick={() => moduleOnclick(true)}
    >
      <label htmlFor="searchInput" />
      <input
        id="searchInput"
        name="searchInput"
        className="grow  bg-transparent pl-2 font-medium  text-zinc-700  placeholder-slate-600 autofill:shadow-black focus:placeholder-sub focus:outline-none"
        {...rest}
      />
      <div className="shrink-0 ">
        <button id="btn" type="submit" className={`${iconClassName} flex `}>
          <span className="material-symbols-outlined">
            {iconText || 'search'}
          </span>
        </button>
      </div>
      {children}
    </div>
  );
};

export default SearchInput;
