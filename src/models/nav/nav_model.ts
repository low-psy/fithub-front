import { ReactNode, ReactElement } from 'react';

export interface NavMenuProps {
  icons: string[];
}

export interface NavTitleProps {
  title: string;
}

export interface SearchModuleProps {
  onClick: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  onFocusOut: React.Dispatch<React.SetStateAction<boolean>>;
}
