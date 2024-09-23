const Table1 = ({ colors }: any) => {
  return (
    <div className="overflow-auto min-w-full">
      <table className="w-[950px] xl:w-full">
        <thead>
          <tr
            className="leading-[40px] font-[600] text-[15px]"
            style={{ color: colors.text, backgroundColor: colors.light }}
          >
            <td className="ps-[5px] w-[150px]"></td>
            <td className="text-center">Min Bet</td>
            <td className="text-center">Max Bet</td>
            <td className="text-center">Bet Delay</td>
            <td className="text-center">Exposure</td>
            <td className="text-center">Profit</td>
          </tr>
        </thead>
        <tbody>
          <TableRows colors={colors} no={"Session"} maxBet={"10,000,000"} betDelay={"1"} />
          <TableRows colors={colors} no={"Casino"} maxBet={"10,000,000"} betDelay={"1"} />
          <TableRows colors={colors} no={"Cricket"} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Football"} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Tennis"} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Horse Racing"} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Greyhound Racing"} maxBet={"500,000"} betDelay={"5"} />
          <TableRows colors={colors} no={"Politics"} maxBet={"500,000"} betDelay={"1"} />
          <TableRows colors={colors} no={"Kabaddi"} maxBet={"500,000"} betDelay={"5"} />
        </tbody>
      </table>
    </div>
  );
};

export default Table1;

const TableRows = ({ colors, no, maxBet, betDelay }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{no}</td>
      <td className="text-center">10</td>
      <td className="text-center">{maxBet}</td>
      <td className="text-center">{betDelay}</td>
      <td className="text-center">5,000,000</td>
      <td className="text-center">1,500,000</td>
    </tr>
  );
};
