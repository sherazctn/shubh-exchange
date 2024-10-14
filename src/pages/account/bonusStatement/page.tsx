import Aos from "aos";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../../../components/account/sidebar";
import Navbar from "../../../components/account/navbar";
import useColorScheme from "../../../hooks/useColorScheme";
import BonusStatementTable from "../../../components/account/BonusStatement/BonusStatementTable";

import { FaCalendarAlt } from "react-icons/fa";

const BonusStatement = ({ darkTheme }: any) => {
  const smallSidebar = useSelector((state: any) => state.smallSidebar);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
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

  const onChangeStart = (date: any, dateString: any) => {
    console.log(date, dateString, startDate);
    setStartDate(dateString);
  };
  const onChangeEnd = (date: any, dateString: any) => {
    console.log(date, dateString, endDate);
    setEndDate(dateString);
  };

  return (
    <div className={`min-h-[100vh]`} style={{ backgroundColor: colors.bg }}>
      <Sidebar colors={colors} path={"bonusStatement"} />
      <div
        className={`relative p-[1px] transition-all duration-500 ${smallSidebar ? "ps-[50px]" : "ps-[50px] lg:ps-[250px]"
          }`}
      >
        <Navbar
          pageName={"Bonus Statement"}
          darkTheme={darkTheme}
          colors={colors}
        />
        <div className="mt-[15px] px-[10px] sm:px-[20px]">
          <div className="mb-[15px] flex gap-[15px] overflow-auto">
            <DatePicker
              onChange={onChangeStart}
              placeholder=""
              style={{
                backgroundColor: panelMainColor,
                border: "none",
                color: colors.text,
                fontWeight: "500",
                minWidth: "130px"
              }}
              suffixIcon={<FaCalendarAlt style={{ color: panelSecColor }} />}
            />
            <DatePicker
              onChange={onChangeEnd}
              placeholder=""
              style={{
                backgroundColor: panelMainColor,
                border: "none",
                color: colors.text,
                fontWeight: "500",
                minWidth: "130px"
              }}
              suffixIcon={<FaCalendarAlt style={{ color: panelSecColor }} />}
            />
            <button
              className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm pt-[1px] font-[500] text-[15px]"
              style={{
                backgroundColor: panelSecColor,
                color: panelMainColor,
              }}
            >
              Get Statement
            </button>
          </div>
          <div className="mb-[15px] flex gap-[15px] overflow-auto">
            <Button title={"Today"} panelMainColor={panelMainColor} panelSecColor={panelSecColor} />
            <Button title={"From Yesterday"} panelMainColor={panelMainColor} panelSecColor={panelSecColor} />
            <Button title={"Last 7 days"} panelMainColor={panelMainColor} panelSecColor={panelSecColor} />
            <Button title={"Last 30 days"} panelMainColor={panelMainColor} panelSecColor={panelSecColor} />
          </div>
          <div
            className="rounded-[22px] pb-[10px] sm:p-[10px] md:px-[15px]"
            style={{ backgroundColor: colors.dark }}
          >
            <BonusStatementTable colors={colors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusStatement;

const Button = ({ title, panelMainColor, panelSecColor }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px]"
      style={{
        backgroundColor: panelMainColor,
        color: panelSecColor,
      }}
    >
      {title}
    </button>
  );
};
