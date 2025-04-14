import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaExclamationCircle } from "react-icons/fa";

const BonusStatementTable = ({ colors, bonuses }: any) => {
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[950px] xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: panelSecColor, backgroundColor: panelMainColor }}
            >
              <td className="ps-[5px] w-[100px]">Sr. No.</td>
              <td>Bonus Amount</td>
              <td>Bonus Type</td>
              <td>Bonus Created Date</td>
              <td>Bonus Given Time</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {bonuses?.length > 0 ? bonuses?.map((item: any, index: any) => (
              <TableRows key={index} colors={colors} item={item} index={index} panelSecColor={panelSecColor} />
            )) : (
              <tr>
                <td colSpan={6} className="text-center pt-[10px] text-[14px] font-[500]"><FaExclamationCircle className="inline-block me-[10px] text-[18px] mt-[-3px]" />No Bonuses Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      {/* <div className="mt-[10px] flex justify-center">
        <p
          className="leading-[32px] text-[13px] font-[500] w-[70px] text-center rounded-s-full border cursor-pointer"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.light,
            color: colors.subText,
          }}
        >
          Prev
        </p>
        <p
          className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.light,
            color: colors.subText,
          }}
        >
          01
        </p>
        <p
          className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.light,
            color: colors.subText,
          }}
        >
          02
        </p>
        <p
          className="leading-[32px] text-[13px] font-[500] w-[35px] text-center border cursor-pointer"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.light,
            color: colors.subText,
          }}
        >
          03
        </p>
        <p
          className="leading-[32px] text-[13px] font-[500] w-[70px] text-center rounded-e-full border cursor-pointer"
          style={{
            borderColor: colors.line,
            backgroundColor: colors.light,
            color: colors.subText,
          }}
        >
          Next
        </p>
      </div> */}
    </>
  );
};

export default BonusStatementTable;

const TableRows = ({ colors, item, index, panelSecColor }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index + 1}</td>
      <td>{item?.bonusAmount}</td>
      <td>
        {item?.bonusType === "immediately" && (<><span>User Got Bonus </span><span style={{ color: panelSecColor, fontWeight: "600" }}>Immediately</span></>)}
        {item?.bonusType === "days" && (<><span>User Got Bonus when </span><span style={{ color: panelSecColor, fontWeight: "600" }}>Older then {item?.bonusValue} Days</span></>)}
        {item?.bonusType === "points" && (<><span>User Got Bonus when </span><span style={{ color: panelSecColor, fontWeight: "600" }}>Spend {item?.bonusValue} points</span></>)}
      </td>
      <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
      <td>-</td>
      <td>{item?.status}</td>
    </tr>
  );
};

const SortingArrows = () => {
  return (
    <div className="inline-block ms-[10px] mb-[-4px]">
      <BiSolidUpArrow className="h-[9px] cursor-pointer" />
      <BiSolidDownArrow className="h-[9px] cursor-pointer" />
    </div>
  )
}
