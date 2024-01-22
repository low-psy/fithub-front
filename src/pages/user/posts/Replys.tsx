import React, { useState } from 'react';
import Reply from './Reply';

const Replys = () => {
  const [input, setInput] = useState<string>('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="ml-12 py-2">
      <Reply />
      <div className="flex flex-row gap-2">
        <input
          value={input}
          onChange={handleInput}
          className="h-8 w-full rounded border border-gray-500 p-2"
        />
        <button
          type="button"
          className="whitespace-nowrap rounded bg-main px-4 py-1 font-semibold text-white"
        >
          대댓글 작성
        </button>
      </div>
    </div>
  );
};

export default Replys;
