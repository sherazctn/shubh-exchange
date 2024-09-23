import Aos from "aos";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import AccountStatementTable from "../../../components/account/AccountStatement/AccountStatementTable";

const AccountStatement = ({ darkTheme }: any) => {
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
      <Sidebar colors={colors} path={"accountStatement"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${
          smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
        }`}
      >
        <Navbar
          pageName={"Account Statement"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="mb-[15px] flex gap-[15px] overflow-auto">
            <Button colors={colors} title={"Today"} />
            <Button colors={colors} title={"From Yesterday"} />
            <Button colors={colors} title={"Last 7 days"} />
            <Button colors={colors} title={"Last 30 days"} />
          </div>
          <div
            className="rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <AccountStatementTable colors={colors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;

const Button = ({ colors, title }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm border font-[600] text-[15px]"
      style={{
        backgroundColor: colors.light,
        borderColor: colors.line,
        color: colors.text,
      }}
    >
      {title}
    </button>
  );
};
