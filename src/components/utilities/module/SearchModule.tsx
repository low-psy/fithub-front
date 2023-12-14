import React from 'react';
import { SearchModuleProps } from '../../../models/nav/nav_model';

const SearchModule: React.FC<SearchModuleProps> = ({ onClick, onFocusOut }) => {
  const gridArray = ['요가', '헬스', '필라테스', '건대', '홍대'];
  return (
    <div className="absolute -inset-x-10 top-full mt-4 space-y-2  rounded-lg bg-white p-6 drop-shadow-xl">
      <h2 className="pb-2">이런 검색어는 어떠세요?</h2>
      <ul className="grid grid-cols-3 gap-4">
        {gridArray.map((value) => {
          return (
            <li key={value} className="rounded-full bg-accent_sub p-2">
              <button
                type="button"
                className="w-full "
                onClick={() => {
                  onClick(value);
                  setTimeout(() => onFocusOut(false));
                }}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchModule;
