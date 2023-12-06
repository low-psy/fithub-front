import React from 'react';

export interface IDefaultButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ILinkButtonProps extends IDefaultButtonProps {
  to: string;
}

export interface IInputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}
