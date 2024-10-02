import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const FDProfitLossTable = ({ colors }: any) => {
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[950px] xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: colors.text, backgroundColor: colors.light }}
            >
              <td className="ps-[5px] w-[110px]">Round Id</td>
              <td className="min-w-[280px]">Game Name</td>
              <td>Provider</td>
              <td>Profit/Loss</td>
              <td>Settled Time<SortingArrows /></td>
            </tr>
          </thead>
          <tbody>
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FDProfitLossTable;

const TableRows = ({ colors }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">04564</td>
      <td>Market Name</td>
      <td>Runner Name</td>
      <td>Lay</td>
      <td>120,000</td>
    </tr>
  );
};

const SortingArrows = () => {
  return(
    <div className="inline-block ms-[10px] mb-[-4px]">
      <BiSolidUpArrow className="h-[9px] cursor-pointer" />
      <BiSolidDownArrow className="h-[9px] cursor-pointer" />
    </div>
  )
}

