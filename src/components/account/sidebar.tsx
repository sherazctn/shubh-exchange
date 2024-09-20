import { GiHamburgerMenu, GiNotebook } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuWallet2 } from "react-icons/lu";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { SiBetfair } from "react-icons/si";
import { MdOutlineHistory } from "react-icons/md";

const Sidebar = ({ colors }: any) => {
  return (
    <div
      className="w-[250px] fixed min-h-[100vh] z-[9]"
      style={{ backgroundColor: colors.light }}
    >
      <GiHamburgerMenu className="text-[18px] absolute right-[10px] top-[10px] cursor-pointer" style={{color: colors.text}} />
      <p className="text-[25px] text-center font-[500] mt-[40px]" style={{color: colors.text}}>
        Shubh Exchange
      </p>
      <div className="mt-[20px] flex flex-col gap-[5px]">
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <LuLayoutDashboard className="text-[20px]" />
          <p>Dashboard</p>
        </div>
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <LuWallet2 className="text-[20px]" />
          <p>My Wallet</p>
        </div>
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <GiNotebook className="text-[20px]" />
          <p>Account Statement</p>
        </div>
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <FaHandHoldingDollar className="text-[20px]" />
          <p>Bonus Statement</p>
        </div>
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <SiBetfair className="text-[20px]" />
          <p>Bets</p>
        </div>
        <div className="account-sidebar-menu" style={{color: colors.text}}>
          <MdOutlineHistory className="text-[20px]" />
          <p>Login History</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
