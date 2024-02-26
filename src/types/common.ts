import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { LoaderFunction } from 'react-router-dom';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customProp?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string;
}

export type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface DivProps {
  children?: any;
  className?: string;
}

export interface EventListener {
  (e: Event): void;
}

export interface LinkButtonProps {
  children?: any;
  className?: string;
  to: string;
  bg?: string;
}

export interface FilterItemsProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  className: string;
}

export interface FormErrors {
  title?: string;
  content?: string;
  images?: string;
  location?: string;
  quota?: string;
  price?: string;
  dateTime?: string;
}

export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never;
