import { ReactNode, ReactElement } from 'react';

export interface NavProps {
  children: ReactNode;
}

export interface NavMenuProps {
  icons: string[];
}

export interface NavTitleProps {
  children: ReactElement;
}

export interface NavSearchProps {
  children: ReactElement;
}
