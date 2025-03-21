import "./App.css";
import "aos/dist/aos.css";

import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import useColorScheme from "./hooks/useColorScheme";
import { retrieveGamesDataToRedisApi } from "./api/api";
import { updateRedisGamesData } from "./features/features";

// import Notification from "./Notification";

import Navbar from "./components/navbar/page";
import Sidebar from "./components/sidebar/page";
import BetSlip from "./components/BetSlip/BetSlip";

import Home from "./pages/home/page";
import Sports from "./pages/sports/page";
import Inplay from "./pages/inplay/page";
import Casino from "./pages/casino/page";
import LiveCricket from "./pages/cricket/LiveCricket";

import Wallet from "./pages/account/wallet/page";
import Profile from "./pages/account/profile/page";
import LoginHistory from "./pages/account/loginHistory/page";
import BonusStatement from "./pages/account/bonusStatement/page";
import AccountStatement from "./pages/account/accountStatement/page";

import Bets from "./pages/account/Bets/page";
import PaymentInfo from "./pages/account/paymentInfo/page";
import BetHistory from "./pages/account/Bets/BetHistory/page";
import ProfitLoss from "./pages/account/Bets/ProfitLoss/page";
import CurrentBets from "./pages/account/Bets/CurrentBets/page";
import FDProfitLoss from "./pages/account/Bets/FDProftLoss/page";
import FloatingHomePage from "./components/FloatingHomePage/page";
import DepositWithdraw from "./pages/account/DepositWithdraw/page";
import PaymentInformation from "./pages/account/paymentInformation/page";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const darkTheme = useSelector((state: any) => state.dashboardDarkTheme);

  const colors = useColorScheme(darkTheme, colorScheme);

  const isAccountPage = location.pathname.startsWith("/account");

  const fn_getGamesData = async () => {
    const response = await retrieveGamesDataToRedisApi();
    if (response?.status) {
      dispatch(updateRedisGamesData(response?.data));
      localStorage.setItem('games', JSON.stringify(response?.data));
    }

    setInterval(async () => {
      const response = await retrieveGamesDataToRedisApi();
      if (response?.status) {
        dispatch(updateRedisGamesData(response?.data));
        localStorage.setItem('games', JSON.stringify(response?.data));
      }
    }, 60000);
  };
  fn_getGamesData();

  return (
    <>
      {/* <Notification /> */}
      {!isAccountPage && <Navbar />}
      {!isAccountPage && <BetSlip />}
      <div className="main-section">
        {!isAccountPage && <Sidebar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-sports" element={<Sports />} />
            <Route path="/in-play" element={<Inplay />} />
            <Route path="/match" element={<LiveCricket />} />
            <Route path="/casino" element={<Casino />} />
            {/* accounts pages */}
            <Route path="/account/dashboard" element={<Profile darkTheme={darkTheme} />} />
            <Route path="/account/wallet" element={<Wallet darkTheme={darkTheme} />} />
            <Route path="/account/deposit-withdraw" element={<DepositWithdraw darkTheme={darkTheme} />} />
            <Route path="/account/account-statement" element={<AccountStatement darkTheme={darkTheme} />} />
            <Route path="/account/bonus-statement" element={<BonusStatement darkTheme={darkTheme} />} />
            <Route path="/account/payment-info" element={<PaymentInfo darkTheme={darkTheme} />} />
            <Route path="/account/payment-information" element={<PaymentInformation darkTheme={darkTheme} />} />
            <Route path="/account/login-history" element={<LoginHistory darkTheme={darkTheme} />} />
            {/* bets pages */}
            <Route path="/account/bets" element={<Bets darkTheme={darkTheme} />}>
              <Route path="current-bets" index element={<CurrentBets colors={colors} />} />
              <Route path="bet-history" element={<BetHistory colors={colors} />} />
              <Route path="profit-loss" element={<ProfitLoss colors={colors} />} />
              <Route path="fd-profitloss" element={<FDProfitLoss colors={colors} />} />
            </Route>
          </Routes>
          <FloatingHomePage />
        </div>
      </div>
    </>
  );
}

export default App;