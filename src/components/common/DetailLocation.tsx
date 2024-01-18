import React, { useRef, useEffect, useState, MouseEvent } from 'react';

interface DetailLocationInputProps {
  onDetailLocationInput: (detail: string) => void;
}

const DetailLocationInput: React.FC<DetailLocationInputProps> = ({
  onDetailLocationInput,
}) => {
  const [detail, setDetail] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setIsHidden((hidden) => !hidden);
    if (isHidden) {
      return;
    }
    if (detail === '') {
      alert('세부 정보를 입력하세요');
      window.location.reload();
      return;
    }
    onDetailLocationInput(detail);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="세부 위치 정보를 입력하세요"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        className={`h-12 w-full rounded-xl bg-input_bg px-4 py-4 text-xl outline-none focus:outline-none focus:ring-2 focus:ring-gray-200 md:w-2/3 ${isHidden ? 'text-slate-500' : 'text-slate-800'} `}
        name="detailLocation"
        onKeyDown={handleKeyPress}
        disabled={isHidden}
      />
      <button
        type="button"
        className="mt-4 rounded-xl bg-accent p-3 text-xl font-extrabold text-white md:ml-4 md:mt-0"
        onClick={handleSubmit}
      >
        {!isHidden ? '주소 제출' : '수정하기'}
      </button>
    </div>
  );
};

export default DetailLocationInput;
