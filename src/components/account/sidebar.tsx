import { useDispatch, useSelector } from "react-redux";

import { GiNotebook } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuWallet2 } from "react-icons/lu";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { SiBetfair } from "react-icons/si";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { BsBank } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";

import { updateSmallsidebar } from "../../features/features";

const Sidebar = ({ colors, path }: any) => {
  const dispatch = useDispatch();
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  return (
    <div
      className={`fixed min-h-[100vh] z-[9] shadow-lg lg:shadow-none transition-all duration-500 ${smallSidebar ? "w-[50px]" : "w-[250px]"
        }`}
      style={{ backgroundColor: panelMainColor }}
    >
      <RiArrowLeftDoubleLine
        className={`text-[18px] absolute top-[10px] cursor-pointer transition-all duration-300 ${smallSidebar ? "-rotate-180 right-[15px]" : "right-[10px]"
          }`}
        onClick={() => dispatch(updateSmallsidebar(!smallSidebar))}
        style={{ color: panelSecColor }}
      />
      {!smallSidebar && (
        <p
          className="text-[25px] text-center font-[500] mt-[40px]"
          style={{ color: panelSecColor }}
        >
          Shubh Exchange
        </p>
      )}
      <div className={`flex flex-col gap-[5px] ${smallSidebar ? "mt-[50px]" : "mt-[20px]"}`}>
        <Menus
          title={"Dashboard"}
          colors={colors}
          pathEquals={"dashboard"}
          path={path}
          url={"/account/dashboard"}
          icon={<LuLayoutDashboard className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"Bets"}
          colors={colors}
          pathEquals={"bets"}
          path={path}
          url={"/account/bets"}
          icon={<SiBetfair className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"My Wallet"}
          colors={colors}
          pathEquals={"wallet"}
          path={path}
          url={"/account/wallet"}
          icon={<LuWallet2 className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"Deposit/Withdraw"}
          colors={colors}
          pathEquals={"depositWithdraw"}
          path={path}
          url={"/account/deposit-withdraw"}
          icon={<BsBank className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"Payment Information"}
          colors={colors}
          pathEquals={"paymentInformation"}
          path={path}
          url={"/account/payment-information"}
          icon={<ImCreditCard className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"Account Statement"}
          colors={colors}
          pathEquals={"accountStatement"}
          path={path}
          url={"/account/account-statement"}
          icon={<GiNotebook className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        <Menus
          title={"Bonus Statement"}
          colors={colors}
          pathEquals={"bonusStatement"}
          path={path}
          url={"/account/bonus-statement"}
          icon={<FaHandHoldingDollar className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
        {/* <Menus
          title={"Payment Information"}
          colors={colors}
          pathEquals={"payment"}
          path={path}
          url={"/account/payment-info"}
          icon={<ImCreditCard className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
        /> */}
        <Menus
          title={"Login History"}
          colors={colors}
          pathEquals={"loginHistory"}
          path={path}
          url={"/account/login-history"}
          icon={<MdOutlineHistory className="text-[20px]" />}
          smallSidebar={smallSidebar}
          panelSecColor={panelSecColor}
          panelMainColor={panelMainColor}
        />
      </div>
    </div>
  );
};

export default Sidebar;

const Menus = ({
  title,
  colors,
  pathEquals,
  path,
  url,
  icon,
  smallSidebar,
  panelSecColor,
  panelMainColor
}: any) => {
  return (
    <Link
      to={url}
      className="account-sidebar-menu"
      style={{
        color: path === pathEquals ? "black" : panelSecColor,
        backgroundColor: path === pathEquals && colors.dark,
      }}
    >
      {icon}
      {!smallSidebar && <p>{title}</p>}
    </Link>
  );
};
