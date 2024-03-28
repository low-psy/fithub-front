import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import FloatRoundedIcon from '../icon/FloatRounded';

interface LinkBtnWithImgProps {
  to: string;
  img?: string;
  title?: string;
  closed?: boolean;
  address?: string;
  startDate?: string;
  endDate?: string;
  price?: number;
  dropdown?: boolean;
  toggleBook?: () => Promise<void>;
  defaultIconState?: boolean;
  dropdownHandler?: (action: string) => void;
  menuArray?: string[];
}

const LinkBtnWithImg: React.FC<LinkBtnWithImgProps> = ({
  title,
  to,
  address,
  closed,
  img,
  startDate,
  endDate,
  price,
  dropdown,
  toggleBook,
  defaultIconState,
  dropdownHandler,
  menuArray,
}) => {
  return (
    <Link to={to} className="flex flex-col gap-y-4 ">
      {img && (
        <div className="relative flex h-[300px] items-center justify-center rounded-xl shadow-md">
          <img
            src={img}
            alt="프로필 이미지"
            className="h-full w-full rounded-xl object-cover"
          />
          <FloatRoundedIcon
            onClick={toggleBook}
            defaultState={defaultIconState}
          >
            favorite
          </FloatRoundedIcon>
        </div>
      )}
      <div className="flex grow flex-col  space-y-2">
        <div className="flex grow justify-between ">
          <h2 className="break-keep  text-xl font-bold">{title}</h2>
          {!dropdown ? (
            <div className="shrink-0 pl-2">
              <h3 className="rounded-full bg-sub px-2 py-1 font-bold xl:px-4 xl:py-2">
                {closed ? '종료' : '모집중'}
              </h3>
            </div>
          ) : (
            dropdownHandler &&
            menuArray && (
              <DropdownMenu
                onMenuItemClick={dropdownHandler}
                menuArray={menuArray}
              />
            )
          )}
        </div>
        <div className="text-md  space-y-1  truncate text-stone-800">
          <h3>{address}</h3>
        </div>
        <h3 className="">{`${startDate}~${endDate}`}</h3>
        <div className="">{`₩ ${price}원`}</div>
      </div>
    </Link>
  );
};

export default LinkBtnWithImg;
