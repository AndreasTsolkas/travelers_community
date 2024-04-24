import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'src/App.css';
import 'src/basic.css';
import MyReads from 'src/pages/MyReads';
import Suggestions from 'src/pages/Suggestions';
import Home from 'src/pages/Home';
import Statistics from 'src/pages/Statistics';
import SignIn from 'src/pages/SignIn';
import SignUp from 'src/pages/SignUp';
import Navbar from 'src/Navbar';
import {httpClient} from 'src/requests';
import * as Important from 'src/important';

function App() {

  const location = useLocation();
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';
  const renderNavbar = !isSignInOrSignUpPage && <Navbar />;
  
  return (
    <div className="container">
      {renderNavbar}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myreads" element={<MyReads />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;