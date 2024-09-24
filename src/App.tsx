import "./App.css";
import "aos/dist/aos.css";

import { useSelector } from "react-redux";
import useColorScheme from "./hooks/useColorScheme";
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
import LoginHistory from "./pages/account/loginHistory/page";

import Bets from "./pages/account/Bets/page";
import CurrentBets from "./pages/account/Bets/CurrentBets/page";
import BetHistory from "./pages/account/Bets/BetHistory/page";
import ProfitLoss from "./pages/account/Bets/ProfitLoss/page";
import FDProfitLoss from "./pages/account/Bets/FDProftLoss/page";
import DepositWithdraw from "./pages/account/DepositWithdraw/page";

function App() {
  const location = useLocation();
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const darkTheme = useSelector((state: any) => state.dashboardDarkTheme);
  const colors = useColorScheme(darkTheme, colorScheme);

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
            {/* accounts pages */}
            <Route path="/account/dashboard" element={<Profile darkTheme={darkTheme} />} />
            <Route path="/account/wallet" element={<Wallet darkTheme={darkTheme} />} />
            <Route path="/account/deposit-withdraw" element={<DepositWithdraw darkTheme={darkTheme} />} />
            <Route path="/account/account-statement" element={<AccountStatement darkTheme={darkTheme} />} />
            <Route path="/account/bonus-statement" element={<BonusStatement darkTheme={darkTheme} />} />
            <Route path="/account/login-history" element={<LoginHistory darkTheme={darkTheme} />} />
            {/* bets pages */}
            <Route path="/account/bets" element={<Bets darkTheme={darkTheme} />}>
              <Route path="current-bets" index element={<CurrentBets colors={colors} />} />
              <Route path="bet-history" element={<BetHistory colors={colors} />} />
              <Route path="profit-loss" element={<ProfitLoss colors={colors} />} />
              <Route path="fd-profitloss" element={<FDProfitLoss colors={colors} />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
