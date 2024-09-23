import "./App.css";
import "aos/dist/aos.css";

import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/page";
import Sidebar from "./components/sidebar/page";

import Home from "./pages/home/page";
import Sports from "./pages/sports/page";
import Inplay from "./pages/inplay/page";
import LiveCricket from "./pages/cricket/LiveCricket";

import Profile from "./pages/account/profile/page";
import Wallet from "./pages/account/wallet/page";
import AccountStatement from "./pages/account/accountStatement/page";
import BonusStatement from "./pages/account/bonusStatement/page";

function App() {
  const location = useLocation();
  const darkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  const isAccountPage = location.pathname.startsWith("/account");

  return (
    <>
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
            <Route path="/account/dashboard" element={<Profile darkTheme={darkTheme} />} />
            <Route path="/account/wallet" element={<Wallet darkTheme={darkTheme} />} />
            <Route path="/account/account-statement" element={<AccountStatement darkTheme={darkTheme} />} />
            <Route path="/account/bonus-statement" element={<BonusStatement darkTheme={darkTheme} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
