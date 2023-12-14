import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customProp?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string;
}

export interface SubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DivProps {
  children?: any;
  className?: string;
}

export interface EventListener {
  (e: Event): void;
}
