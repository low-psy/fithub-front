import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FindPassword from './pages/help/password';

import Home from './pages/home';
import Login from './pages/login';
import LoginRedirect from './pages/login/LoginRedirect';
import Signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/redirect/*" element={<LoginRedirect />} />
          <Route path="/help/password" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
