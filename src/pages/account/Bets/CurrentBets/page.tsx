import { useSelector } from "react-redux";
import CurrentBetTable1 from "../../../../components/account/Bets/CurrentBets/CurrentBetTable1";
import CurrentBetTable2 from "../../../../components/account/Bets/CurrentBets/CurrentBetTable2";

const CurrentBets = ({ colors }: any) => {
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  return (
    <div className="mt-[30px]">
      {/* select options */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[30px]">
        <div className="flex items-center gap-[10px]">
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
        </div>
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
          >
            <option>All</option>
            <option>Back</option>
            <option>Lay</option>
          </select>
        </div>
      </div>
      {/* table-1 */}
      <div className="mt-[20px]">
        <CurrentBetTable1 colors={colors} />
      </div>
      <div className="mt-[20px]">
        <CurrentBetTable2 colors={colors} />
      </div>
    </div>
  );
};

export default CurrentBets;
