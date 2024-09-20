import Aos from "aos";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";

import { FaDollarSign } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { SiBetfair } from "react-icons/si";
import { useEffect } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";

const Profile = ({ darkTheme }: any) => {
  const dashboardDarkTheme = useSelector(
    (state: any) => state.dashboardDarkTheme
  );
  const colorScheme = useSelector(
    (state: any) => state.colorScheme
  );
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);
  useEffect(() => {
    Aos.init({ once: true });
  }, []);
  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} />
      <div className="ps-[250px] relative p-[1px]">
        <Navbar darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[20px]">
          {/* boxes */}
          <div className="grid grid-cols-3 gap-[15px]">
            <Boxes
              colors={colors}
              sub="Earning"
              main="$3500"
              icon={<MdOutlineBarChart className="text-[27px]" />}
            />
            <Boxes
              colors={colors}
              sub="Monthly Revenue Avg."
              main="$1050.5"
              icon={<FaDollarSign />}
            />
            <Boxes
              colors={colors}
              sub="Earning this month"
              main="$540"
              icon={<FaDollarSign />}
            />
            <Boxes
              colors={colors}
              sub="Total Bets"
              main="54"
              icon={<SiBetfair />}
            />
            <Boxes
              colors={colors}
              sub="Winning Shorts"
              main="41"
              icon={<BsGraphUpArrow className="text-[21px]" />}
            />
            <Boxes
              colors={colors}
              sub="Loses Shorts"
              main="13"
              icon={<BsGraphDownArrow className="text-[21px]" />}
            />
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
}: {
  colors: any;
  sub: string;
  main: string;
  icon: any;
}) => {
  return (
    <div
      className={`min-h-[100px] rounded-[22px] flex items-center px-[20px] gap-[20px]`}
      style={{ backgroundColor: colors.dark }}
    >
      <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-[24px]"
        style={{backgroundColor: colors.light, color: colors.text}}
      >
        {icon}
      </div>
      <div>
        <p className="text-[15px] text-gray-400 font-[500] leading-[15px]">
          {sub}
        </p>
        <p className="text-[22px] font-[700]" style={{color: colors.text}}>{main}</p>
      </div>
    </div>
  );
};
