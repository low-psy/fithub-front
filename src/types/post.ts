import {
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from 'react';

export interface PostInputProps {
  children: ReactElement;
  spanText: string;
  htmlFor: string;
  titleText: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customProp?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string;
}

export interface PForm {
  title: string;
  content: string;
  image: string;
  keyword: string;
}
