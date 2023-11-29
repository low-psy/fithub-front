import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from 'react';
import { JsxAttribute } from 'typescript';

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
