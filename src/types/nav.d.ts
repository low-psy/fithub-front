import React from 'react';

export interface NavTitleProps {
  title: string;
  to?: string;
}

export interface SearchModuleProps {
  onClick: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  onFocusOut: React.Dispatch<React.SetStateAction<boolean>>;
}
