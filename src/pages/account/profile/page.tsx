import Aos from "aos";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import Table1 from "../../../components/account/Dashboard/Table1";
// import Table1Pagination from "../../../components/account/Dashboard/Table1Pagination";

import { MdOutlineBarChart } from "react-icons/md";
import { SiBetfair } from "react-icons/si";
import { useEffect } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Profile = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"dashboard"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"Dashboard"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          {/* boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[10px] sm:gap-[15px]">
            <Boxes
              colors={colors}
              sub="Earning"
              main="$3500"
              icon={<MdOutlineBarChart className="text-[27px]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Boxes
              colors={colors}
              sub="Monthly Revenue Avg."
              main="$1050.5"
              icon={<FaIndianRupeeSign className="pt-[2px]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Boxes
              colors={colors}
              sub="Earning this month"
              main="$540"
              icon={<FaIndianRupeeSign className="pt-[2px]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Boxes
              colors={colors}
              sub="Total Bets"
              main="54"
              icon={<SiBetfair />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Boxes
              colors={colors}
              sub="Winning Shorts"
              main="41"
              icon={<BsGraphUpArrow className="text-[18px] md:text-[21px]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Boxes
              colors={colors}
              sub="Loses Shorts"
              main="13"
              icon={<BsGraphDownArrow className="text-[18px] md:text-[21px]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
          </div>
          {/* table & pagination */}
          <div
            className="my-[10px] sm:my-[15px] rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <p className="text-[20px] font-[600] pt-[10px] pb-[5px] sm:pb-0 sm:pt-0 sm:my-[5px] ps-[15px] md:ps-0" style={{ color: panelSecColor }}>Bet Config</p>
            <Table1 colors={colors} />
            {/* <Table1Pagination colors={colors} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

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
  main: string;
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
