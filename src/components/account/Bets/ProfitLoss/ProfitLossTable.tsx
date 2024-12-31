import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { formatDate } from "../../../../api/api";

const ProfitLossTable = ({ colors, data }: any) => {
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
                            <td>Start Time</td>
                            <td>Commision<SortingArrows /></td>
                            <td>PL</td>
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

export default ProfitLossTable;

const TableRows = ({ colors, item, index }: any) => {
    return (
        <tr
            key={index}
            className="text-[13px] font-[500] leading-[34px] border-b"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px]">{index}</td>
            <td>{item?.gameName} {item?.selectionName && item?.selectionName !== "" && `(${item?.selectionName})`}</td>
            <td>{formatDate(item?.createdAt)}</td>
            <td>{item?.profit}</td>
            <td style={{ color: item?.status === "win" ? "green" : item?.status === "loss" ? "red" : item?.status === "abandoned" ? "orange" : "black" }}>
                {item?.status === "win" ? `+${item?.profit}` : item?.status === "loss" ? `-${item?.loss}` : item?.status === "abandoned" ? `Abandoned` : `Continue`}
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
