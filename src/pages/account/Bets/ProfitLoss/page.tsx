import { useState } from "react";
import { DatePicker } from "antd";

import { FaCalendarAlt } from "react-icons/fa";


const ProfitLoss = ({ colors }: any) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const onChangeStart = (date: any, dateString: any) => {
    console.log(date, dateString, startDate);
    setStartDate(dateString);
  };
  const onChangeEnd = (date: any, dateString: any) => {
    console.log(date, dateString, endDate);
    setEndDate(dateString);
  };
  return (
    <div className="mt-[30px]">
      <div className="flex items-center gap-[15px] overflow-auto">
        <div className="flex items-center gap-[10px]">
          <label
            className="text-[14px] font-[500]"
            style={{ color: colors.text }}
          >
           Period
          </label>
        </div>
        <DatePicker
          onChange={onChangeStart}
          placeholder=""
          style={{
            backgroundColor: colors.light,
            border: "none",
            color: colors.text,
            fontWeight: "500",
            minWidth: "130px",
            height: "37px",
          }}
          suffixIcon={<FaCalendarAlt style={{ color: colors.text }} />}
        />
        <DatePicker
          onChange={onChangeEnd}
          placeholder=""
          style={{
            backgroundColor: colors.light,
            border: "none",
            color: colors.text,
            fontWeight: "500",
            minWidth: "130px",
            height: "37px",
          }}
          suffixIcon={<FaCalendarAlt style={{ color: colors.text }} />}
        />
        <button
          className="h-[37px] px-[13px] min-w-[90px] rounded-[7px] shadow-sm pt-[1px] font-[500] text-[15px]"
          style={{
            backgroundColor: colors.text,
            color: colors.light,
          }}
        >
          Get PL
        </button>
      </div>
      <div className="my-[15px] flex gap-[15px] overflow-auto">
        <Button colors={colors} title={"Today"} />
        <Button colors={colors} title={"From Yesterday"} />
        <Button colors={colors} title={"Last 7 days"} />
        <Button colors={colors} title={"Last 30 days"} />
      </div>
    </div>
  );
};

export default ProfitLoss;

const Button = ({ colors, title }: any) => {
  return (
    <button
      className="h-[35px] px-[13px] min-w-[max-content] rounded-[7px] shadow-sm font-[500] pt-[1px] text-[15px]"
      style={{
        backgroundColor: colors.light,
        color: colors.text,
      }}
    >
      {title}
    </button>
  );
};
