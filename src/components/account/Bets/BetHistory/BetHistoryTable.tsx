import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../../../api/api";

const BetHistoryTable = ({ colors, data }: any) => {
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[1250px] 2xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: panelSecColor, backgroundColor: panelMainColor }}
            >
              <td className="ps-[5px] w-[100px]">Sr No.<SortingArrows /></td>
              <td className="min-w-[250px]">Market Name</td>
              <td className="min-w-[80px]">Market Name</td>
              <td className="min-w-[80px]">Side</td>
              <td>Bet Amount<SortingArrows /></td>
              <td className="min-w-[80px]">Odd</td>
              <td className="min-w-[80px]">Profit/Loss</td>
              <td>Created Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? data?.map((item: any, index: number) => (
              <TableRows colors={colors} item={item} index={index + 1} />
            )) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BetHistoryTable;

const TableRows = ({ colors, item, index }: any) => {
  return (
    <tr
      key={index}
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index}</td>
      <td>{item?.gameName} {item?.selectionName && item?.selectionName !== "" && `(${item?.selectionName})`}</td>
      {/* <td>{item?.runner}</td> */}
      <td className="capitalize">{item?.marketName}</td>
      <td>{item?.side}</td>
      <td><FaIndianRupeeSign className="inline-block me-[2px]" />{item?.amount}</td>
      <td>{item?.odd}</td>
      <td style={{ color: item?.status === "win" ? "green" : item?.status === "loss" ? "red" : "orange" }} >{item?.status === "win" ? `+${item?.profit}` : item?.status === "loss" ? `-${item?.loss}` : "Abandoned"}</td>
      <td>{formatDate(item?.createdAt)}</td>
      <td>
        {item?.status === "win" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#2b872a] flex justify-center items-center">Win</p>}
        {item?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#b9ab25] flex justify-center items-center">Running</p>}
        {item?.status === "loss" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[#fd3939] flex justify-center items-center">Loss</p>}
        {item?.status === "abandoned" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#f6e1b9] h-[25px] rounded-full w-[75px] text-[11px] font-[600] text-[orange] flex justify-center items-center">Abandoned</p>}
      </td>
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
