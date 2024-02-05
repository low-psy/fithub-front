import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const BottomButtonLayout = ({ children }: IProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
      <div className="mx-2 flex flex-row justify-center gap-4">{children}</div>
    </div>
  );
};

export default BottomButtonLayout;
