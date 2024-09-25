import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const WalletTable = ({ colors }: any) => {
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
              <td className="w-[150px] ps-[5px]">Date Time</td>
              <td>Narration</td>
              <td className="w-[150px]">Total<SortingArrows /></td>
            </tr>
          </thead>
          <tbody>
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
            <TableRows colors={colors} />
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

export default WalletTable;

const TableRows = ({ colors }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">10 Dec 2025</td>
      <td>Nothing</td>
      <td>10,000,000</td>
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
