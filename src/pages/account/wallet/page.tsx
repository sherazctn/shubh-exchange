import Aos from "aos";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
// import WalletTable from "../../../components/account/Wallet/Table";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { getUserAmountForApprovalApi } from "../../../api/api";

const Wallet = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);
  const token: any = useSelector((state: any) => state.token);

  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  const wallet = useSelector((state: any) => state.wallet);
  const [approvalDeposit, setApprovalDeposit] = useState(0);
  const [approvalWithdraw, setApprovalWithdraw] = useState(0);

  useEffect(() => {
    fn_getUserAmountForApproval();
    Aos.init({ once: true });
  }, []);

  const fn_getUserAmountForApproval = async () => {
    const response = await getUserAmountForApprovalApi(token);
    if (response?.status === 200) {
      setApprovalDeposit(response?.data?.totalDepositForApproval);
      setApprovalWithdraw(response?.data?.totalWithdrawForApproval);
    }
  }

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"wallet"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"My Wallet"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <p
            className="text-center text-[20px] sm:text-[25px] font-[700]"
            style={{ color: panelSecColor }}
          >
            Available Balance
          </p>
          <p
            className="text-center text-[30px] sm:text-[40px] font-[700] mt-[10px] flex items-center justify-center"
            style={{ color: panelSecColor }}
          >
            <FaIndianRupeeSign />{wallet}
          </p>
          <div className="mt-[20px] px-[10px] sm:px-[20px]">
            {/* boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] sm:gap-[15px]">
              <Boxes
                colors={colors}
                sub="Deposit Amount For Approval"
                main={approvalDeposit}
                icon={<FaIndianRupeeSign className="pt-[2px]" />}
                panelMainColor={panelMainColor}
                panelSecColor={panelSecColor}
              />
              <Boxes
                colors={colors}
                sub="Withdraw Amount For Approval"
                main={approvalWithdraw}
                icon={<FaIndianRupeeSign className="pt-[2px]" />}
                panelMainColor={panelMainColor}
                panelSecColor={panelSecColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

const Boxes = ({
  colors,
  sub,
  main,
  icon,
  panelMainColor,
  panelSecColor
}: {
  colors: any;
  sub: string;
  main: string | number;
  icon: any;
  panelMainColor: string;
  panelSecColor: string
}) => {
  return (
    <div
      className={`min-h-[70px] md:min-h-[100px] rounded-[22px] flex items-center px-[12px] md:px-[20px] gap-[20px]`}
      style={{ backgroundColor: colors.dark }}
    >
      <div
        className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] rounded-full flex items-center justify-center text-[20px] md:text-[24px]"
        style={{ backgroundColor: panelMainColor, color: panelSecColor }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[13px] md:text-[15px] text-gray-400 font-[500] leading-[13px] md:leading-[15px]">
          {sub}
        </p>
        <p className="text-[18px] md:text-[22px] font-[700]" style={{ color: panelSecColor }}>
          {main}
        </p>
      </div>
    </div>
  );
};
