import { Route, Routes, useLocation } from "react-router-dom";
import "src/css/global.css";
import MyTravels from "src/pages/MyTravels";
import MyAnalytics from "src/pages/MyAnalytics";
import MyProfile from "src/pages/MyProfile";
import MyProfileEdit from "src/pages/MyProfileEdit";
import PasswordEdit from "src/pages/PasswordEdit";
import Suggestions from "src/pages/Suggestions";
import Home from "src/pages/Home";
import Analytics from "src/pages/Analytics";
import TravelView from "src/pages/TravelView";
import NewTravel from "src/pages/NewTravel";
import SignIn from "src/pages/SignIn";
import SignUp from "src/pages/SignUp";
import Navbar from "src/Navbar";

function App() {
  const location = useLocation();
  const isSignInOrSignUpPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  const renderNavbar = !isSignInOrSignUpPage && <Navbar />;

  return (
    <div className="container">
      {renderNavbar}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mytravels" element={<MyTravels />} />
        <Route path="/myanalytics" element={<MyAnalytics />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editmyprofile" element={<MyProfileEdit />} />
        <Route path="/editpassword" element={<PasswordEdit />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/analytics" element={<Analytics />} />
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
