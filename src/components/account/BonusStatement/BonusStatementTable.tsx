import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const BonusStatementTable = ({ colors }: any) => {
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
              <td className="ps-[5px] w-[100px]">Code<SortingArrows /></td>
              <td>Bonus Amount<SortingArrows /></td>
              <td>Required Turnover to Activate<SortingArrows /></td>
              <td>Required Turnover to Withdraw<SortingArrows /></td>
              <td>Bonus Date</td>
              <td>Bonus Expiry</td>
              <td>Is Expired?</td>
            </tr>
          </thead>
          <tbody>
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="mt-[10px] flex justify-center">
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
      </div>
    </>
  );
};

export default BonusStatementTable;

const TableRows = ({ colors }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">04564</td>
      <td>74,500</td>
      <td>21,000</td>
      <td>15,000</td>
      <td>04 Sep 2024</td>
      <td>04 Dec 2024</td>
      <td>No</td>
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
