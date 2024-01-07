import React from 'react';
import { Link } from 'react-router-dom';

import { ISocialButtonProps } from '../../types/form';

function SocialLoginButton({ to, alt, src, className }: ISocialButtonProps) {
  return (
    <Link to={to}>
      <button
        type="button"
        className={`h-12 w-12 md:h-16 md:w-16 ${className}`}
      >
        <img alt={alt} src={src} />
      </button>
    </Link>
  );
}

export default SocialLoginButton;
