import "./App.css";
import "aos/dist/aos.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/page";
import Sidebar from "./components/sidebar/page";
import Home from "./pages/home/page";
import Sports from "./pages/sports/page";
import Inplay from "./pages/inplay/page";
import LiveCricket from "./pages/cricket/LiveCricket";
import Profile from "./pages/account/profile/page";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const darkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  // Check if the current path starts with "/account"
  const isAccountPage = location.pathname.startsWith("/account");

  return (
    <>
      {/* Conditionally render Navbar and Sidebar */}
      {!isAccountPage && <Navbar />}
      <div className="main-section">
        {!isAccountPage && <Sidebar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-sports" element={<Sports />} />
            <Route path="/in-play" element={<Inplay />} />
            <Route path="/cricket/live" element={<LiveCricket />} />
            {/* accounts */}
            <Route path="/account/profile" element={<Profile darkTheme={darkTheme} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
