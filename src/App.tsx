import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindPassword from './pages/help/password';

import Home from './pages/home';
import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import NotFound from './pages/NotFound';
import Signup from './pages/signup';
import AdditionalInfo from './pages/signup/AdditionalInfo';
import CertifyTrainer from './pages/certifyTrainer';
import EmailAuthentication from './pages/signup/EmailAuthentication';
import SignupSuccess from './pages/signup/SignupSuccess';
import SocialSignup from './pages/signup/SocialSignup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}>
            <Route path="email" element={<EmailAuthentication />} />
            <Route path="additional-info" element={<AdditionalInfo />} />
            <Route path="success" element={<SignupSuccess />} />
            <Route path="certify-trainer" element={<CertifyTrainer />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/oauth2/regist" element={<SocialSignup />} />

          <Route
            path="/oauth2/authorization/google"
            element={<LoginRedirect />}
          />
          <Route path="/help/password" element={<FindPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
