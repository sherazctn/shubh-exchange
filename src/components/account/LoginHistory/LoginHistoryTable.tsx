import { useSelector } from "react-redux";

const LoginHistoryTable = ({ colors }: any) => {
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
              <td className="ps-[5px]">Login Date & Time</td>
              <td>Logout Date & Time</td>
              <td>IP Address</td>
              <td>ISP</td>
              <td>City, State, Country</td>
            </tr>
          </thead>
          <tbody>
            <TableRows colors={colors} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LoginHistoryTable;

const TableRows = ({ colors }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">2024-09-23 21:55:58</td>
      <td>2024-09-23 23:23:38</td>
      <td>182.181.2.21</td>
      <td>Triple Play Project SOUTH</td>
      <td>Lahore, Punjab, Pakistan</td>
    </tr>
  );
};
