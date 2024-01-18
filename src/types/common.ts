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

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ApiResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
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
