import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../../../api/api";

const CurrentBetTable1 = ({ colors, data }: any) => {
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
              <td className="ps-[5px] w-[100px]">Sr No.</td>
              <td className="min-w-[250px]">Market Name</td>
              <td>Market Name</td>
              {/* <td>Runner Name</td> */}
              <td className="min-w-[60px]">Side</td>
              <td className="min-w-[80px]">Stake</td>
              <td className="min-w-[80px]">Odd</td>
              <td>Created Date</td>
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

export default CurrentBetTable1;

const TableRows = ({ colors, item, index }: any) => {
  const dashedOdd = (item?.marketName === "fancy" || item?.marketName === "khado" || item?.marketName === "meter") ? true : false;
  const fn_returnOnlyName = (sName: string) => {
    return sName.replace(/\s\d+(\.\d+)?$/, '');
  };
  return (
    <tr
      key={index}
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{index}</td>
      <td>{item?.gameName} {item?.selectionName && item?.selectionName !== "" && `(${fn_returnOnlyName(item?.selectionName)})`}{dashedOdd && ` - ${item?.odd}`}</td>
      <td className="capitalize">{item?.marketName}</td>
      <td>
        <p className="w-[max-content] min-w-[45px] h-[25px] flex justify-center items-center rounded-[7px]" style={{ backgroundColor: item?.side === "Lay" ? "var(--red)" : "var(--blue)" }}>{item?.side}</p>
      </td>
      <td><FaIndianRupeeSign className="inline-block me-[2px]" />{item?.amount}</td>
      <td>{/\s\d+(\.\d+)?$/.test(item?.selectionName) ? item?.selectionName.match(/\d+(\.\d+)?$/)?.[0] : item?.odd}</td>
      <td>{formatDate(item?.createdAt)}</td>
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
