import { useSelector } from "react-redux";
import { formatDate } from "../../../api/api";

const LoginHistoryTable = ({ colors, data }: any) => {
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
              <td>IP Address</td>
              <td>City, State, Country</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <TableRows colors={colors} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LoginHistoryTable;

const TableRows = ({ colors, item }: any) => {
  return (
    <tr
      className="text-[13px] font-[500] leading-[34px] border-b"
      style={{ borderColor: colors.line, color: colors.subText }}
    >
      <td className="ps-[5px]">{formatDate(item?.loginDateTime)}</td>
      <td>{item?.ipAddress}</td>
      <td>{item?.city}, {item?.state}, {item?.country}</td>
    </tr>
  );
};
