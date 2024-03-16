import React from 'react';

interface PostAlignProps {
  alignBtnArray: { value: string; bg: string }[];
  alignBtnHandler: (i: number) => void;
}

const PostAlign: React.FC<PostAlignProps> = ({
  alignBtnArray,
  alignBtnHandler,
}) => {
  return (
    <ul className="flex">
      {alignBtnArray.map((v, i) => {
        return (
          <li className="shrink-0 rounded-full bg-white px-4 py-2">
            <button
              type="button"
              className="flex items-center gap-x-2"
              onClick={() => alignBtnHandler(i)}
            >
              <div className={`aspect-square w-3 rounded-full ${v.bg}`} />
              {v.value}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PostAlign;
