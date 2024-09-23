import Aos from "aos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import Table1 from "../../../components/account/Dashboard/Table1";
import Table1Pagination from "../../../components/account/Dashboard/Table1Pagination";

const BonusStatement = ({ darkTheme }: any) => {
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
      <Sidebar colors={colors} path={"bonusStatement"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
        }`}
      >
        <Navbar
          pageName={"Bonus Statement"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div
            className="rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <Table1 colors={colors} />
            <Table1Pagination colors={colors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusStatement;
