import React from 'react';
import { Link } from 'react-router-dom';

import { IHelperLinkProps } from '../../types/form';

function FormHelperLink({ to, content }: IHelperLinkProps) {
  return (
    <Link to={to} className="hover:underline hover:underline-offset-4">
      <p className="text-sm md:text-base">{content}</p>
    </Link>
  );
}

export default FormHelperLink;
