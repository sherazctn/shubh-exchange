const CurrentBetTable1 = ({ colors }: any) => {
  return (
    <>
      {/* table */}
      <div className="overflow-auto min-w-full">
        <table className="w-[1250px] 2xl:w-full">
          <thead>
            <tr
              className="leading-[40px] font-[600] text-[15px]"
              style={{ color: colors.text, backgroundColor: colors.light }}
            >
              <td className="ps-[5px] w-[90px]">BetId</td>
              <td className="min-w-[280px]">Market Name</td>
              <td>Runner Name</td>
              <td className="w-[60px]">Side</td>
              <td>Price</td>
              <td>Matched Size</td>
              <td>Remaining Size</td>
              <td>Created Date</td>
              <td>Updated Date</td>
              <td>Action</td>
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

export default CurrentBetTable1;

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
      <td>30,000</td>
      <td>90,000</td>
      <td>24 Sep 2024</td>
      <td>25 Sep 2024</td>
      <td>Action</td>
    </tr>
  );
};
