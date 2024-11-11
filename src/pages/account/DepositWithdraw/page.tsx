import Aos from "aos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../../components/account/navbar";
import Sidebar from "../../../components/account/sidebar";
import useColorScheme from "../../../hooks/useColorScheme";
import DepositMoney from "../../../components/account/DepositWithdraw/DepositMoney";
import WithdrawMoney from "../../../components/account/DepositWithdraw/WithdrawMoney";

const DepositWithdraw = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"depositWithdraw"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
        }`}
      >
        <Navbar
          pageName={"Deposit/Withdraw"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
            <div className="flex flex-col xl:flex-row gap-[15px] pb-[20px]">
                <DepositMoney colors={colors} />
                <WithdrawMoney colors={colors} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DepositWithdraw;
