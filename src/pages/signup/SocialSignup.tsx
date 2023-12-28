import React from 'react';
import { useLocation } from 'react-router-dom';

function SocialSignup() {
  const location = useLocation();
  console.log(location);
  return <div>SocialSignup</div>;
}

export default SocialSignup;
