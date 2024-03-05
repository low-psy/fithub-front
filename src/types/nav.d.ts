import React from 'react';

export interface NavTitleProps {
  title: string;
  to?: string;
}

export interface SearchModuleProps {
  onClick: (value) => void;
  onFocusOut: (value) => void;
}
