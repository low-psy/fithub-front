import React, { InputHTMLAttributes } from 'react';

export interface IDefaultButtonProps {
  text: string;
  onClick?: () => void;
}

export interface ILinkButtonProps extends IDefaultButtonProps {
  to: string;
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
}
