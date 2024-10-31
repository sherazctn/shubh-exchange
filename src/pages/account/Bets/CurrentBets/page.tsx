import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getOpenBetsByUserApi } from "../../../../api/api";
import CurrentBetTable1 from "../../../../components/account/Bets/CurrentBets/CurrentBetTable1";
import Loader from "../../../../components/Loader";
// import CurrentBetTable2 from "../../../../components/account/Bets/CurrentBets/CurrentBetTable2";

const CurrentBets = ({ colors }: any) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginal] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedSide, setSelectedSide] = useState("all");
  const token = useSelector((state: any) => state.token);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  const fn_getUserCurrentBets = async () => {
    const response = await getOpenBetsByUserApi(token);
    if (response?.status) {
      setData(response?.data?.reverse());
      setOriginal(response?.data?.reverse());
    }
    setLoader(false);
  }
  useEffect(() => {
    fn_getUserCurrentBets();
  }, []);
  const fn_applyFilter = async (value: string) => {
    if (value === selectedSide) return;
    setSelectedSide(value);
    if (value === "all") {
      setData(originalData);
    } else {
      const updatedData = originalData?.filter((item: any) => item?.side === value);
      setData(updatedData);
    }
  }
  return (
    <div className="mt-[30px]">
      {/* select options */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[30px]">
        {/* <div className="flex items-center gap-[10px]">
          <label
            className="text-[14px] font-[500]"
            style={{ color: panelSecColor }}
          >
            Bet Status
          </label>
          <select
            className="w-[140px] h-[35px] rounded-[7px] shadow-sm font-[500] border text-[14px] px-[5px] focus:outline-none"
            style={{
              backgroundColor: colors.bg,
              color: panelSecColor,
              borderColor: panelSecColor,
            }}
          >
            <option>All</option>
            <option>Matched</option>
            <option>Unmatched</option>
          </select>
        </div> */}
        <div className="flex items-center gap-[10px]">
          <label
            className="text-[14px] font-[500] w-[65px] sm:w-auto"
            style={{ color: panelSecColor }}
          >
            Side
          </label>
          <select
            className="w-[140px] h-[35px] rounded-[7px] shadow-sm font-[500] border text-[14px] px-[5px] focus:outline-none"
            style={{
              backgroundColor: colors.bg,
              color: panelSecColor,
              borderColor: panelSecColor,
            }}
            onChange={(e) => fn_applyFilter(e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value={"Back"}>Back</option>
            <option value={"Lay"}>Lay</option>
          </select>
        </div>
      </div>
      {/* table-1 */}
      <div className="mt-[20px]">
        {!loader ? (
          <CurrentBetTable1 colors={colors} data={data} />
        ) : (
          <div className="flex justify-center w-full">
            <Loader size={30} color={panelSecColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBets;
