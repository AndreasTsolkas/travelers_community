import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import 'src/App.css';
import 'src/basic.css';
import MyTravels from 'src/pages/MyTravels';
import MyStatistics from 'src/pages/MyStatistics';
import Suggestions from 'src/pages/Suggestions';
import Home from 'src/pages/Home';
import Statistics from 'src/pages/Statistics';
import TravelView from 'src/pages/TravelView';
import NewTravel from 'src/pages/NewTravel';
import SignIn from 'src/pages/SignIn';
import SignUp from 'src/pages/SignUp';
import Navbar from 'src/Navbar';

function App() {

  const location = useLocation();
  const isSignInOrSignUpPage = location.pathname === '/signin' || location.pathname === '/signup';
  const renderNavbar = !isSignInOrSignUpPage && <Navbar />;
  
  return (
    <div className="container">
      {renderNavbar}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytravels" element={<MyTravels />} />
        <Route path="/mystatistics" element={<MyStatistics />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/travelview/:id" element={<TravelView />} />
        <Route path="/newtravel" element={<NewTravel />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;