import React from 'react';
import { Outlet } from 'react-router-dom';
import FormLogo from '../../components/form/FormLogo';
import Layout from '../../components/form/Layout';

const Help = () => {
  return (
    <Layout>
      <FormLogo width="w-14" />
      <Outlet />
    </Layout>
  );
};

export default Help;
