import React from 'react';

interface UndefinedCoverProps {
  children: any;
}

const UndefinedCover: React.FC<UndefinedCoverProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
      {children}
    </div>
  );
};

export default UndefinedCover;
