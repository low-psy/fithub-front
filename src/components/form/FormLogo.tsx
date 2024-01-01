import React from 'react';
import { Link } from 'react-router-dom';

import { ILogoProps } from '../../types/form';

import fithubLogo from '../../assets/fithub_logo.png';

function FormLogo({ width, fontSize }: ILogoProps) {
  return (
    <div className="mb-12 flex w-fit flex-row items-end">
      <Link to="/" className="flex flex-row items-end">
        <button type="button" className={width}>
          <img src={fithubLogo} alt="fithub_logo" />
        </button>
        <p className={`${fontSize} whitespace-nowrap font-bold text-main`}>
          핏헙
        </p>
      </Link>
    </div>
  );
}

export default FormLogo;
