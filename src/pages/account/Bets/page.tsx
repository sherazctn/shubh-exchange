import Aos from "aos";
import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";

const Bets = ({ darkTheme }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname.split("/").pop() || "current-bets");
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const dashboardDarkTheme = useSelector((state: any) => state.dashboardDarkTheme);
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const colors = useColorScheme(dashboardDarkTheme, colorScheme);

  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);

  useEffect(() => {
    Aos.init({ once: true });
    if (!location.pathname.includes("current-bets") &&
      !location.pathname.includes("bet-history") &&
      !location.pathname.includes("profit-loss") &&
      !location.pathname.includes("fd-profitloss")) {
      navigate("current-bets");
    }
  }, [navigate, location.pathname]);

  const handleNavigation = (path: string) => {
    setSelectedTab(path);
    navigate(path);
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"bets"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar pageName={"My Bets"} darkTheme={darkTheme} colors={colors} />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          {/* buttons */}
          <div className="flex gap-[15px] overflow-auto">
            <Button
              colors={colors}
              title={"Current Bets"}
              selectedTab={selectedTab}
              value={"current-bets"}
              setSelectedTab={() => handleNavigation("current-bets")}
              icon={<BsGraphUpArrow />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Button
              colors={colors}
              title={"Bet History"}
              selectedTab={selectedTab}
              value={"bet-history"}
              setSelectedTab={() => handleNavigation("bet-history")}
              icon={<MdHistory className="scale-[1.1]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            <Button
              colors={colors}
              title={"Profit/Loss"}
              selectedTab={selectedTab}
              value={"profit-loss"}
              setSelectedTab={() => handleNavigation("profit-loss")}
              icon={<VscGraph className="scale-[1.1]" />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            />
            {/* <Button
              colors={colors}
              title={"FD Profitloss"}
              selectedTab={selectedTab}
              value={"fd-profitloss"}
              setSelectedTab={() => handleNavigation("fd-profitloss")}
              icon={<BsGraphUpArrow />}
              panelMainColor={panelMainColor}
              panelSecColor={panelSecColor}
            /> */}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Bets;

const Button = ({ colors, title, selectedTab, value, setSelectedTab, icon, panelMainColor, panelSecColor }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[140px] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px] flex items-center gap-[10px]"
      style={{
        backgroundColor: selectedTab === value ? panelSecColor : panelMainColor,
        color: selectedTab === value ? colors.light : panelSecColor,
      }}
      onClick={setSelectedTab}
    >
      {icon}
      {title}
    </button>
  );
};
