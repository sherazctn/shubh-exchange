import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";

const PaymentInformationTable = ({ colors }: any) => {
    const panelMainColor = useSelector((state: any) => state.panelMainColor);
    const panelSecColor = useSelector((state: any) => state.panelSecColor);
    return (
        <>
            {/* table */}
            <div className="overflow-auto min-w-full">
                <table className="w-[1000px] xl:w-full">
                    <thead>
                        <tr
                            className="leading-[55px] font-[600] text-[15px]"
                            style={{ color: panelSecColor, backgroundColor: panelMainColor }}
                        >
                            <td className="ps-[5px]">TRN-ID</td>
                            <td>BANK NAME</td>
                            <td>IBAN</td>
                            <td>DATE</td>
                            <td>AMOUNT<SortingArrows /></td>
                            <td>UTR#</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRows colors={colors} status={"approved"} />
                        <TableRows colors={colors} status={"pending"} />
                        <TableRows colors={colors} status={"decline"} />
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentInformationTable;

const TableRows = ({ colors, status }: any) => {
    return (
        <tr
            className="text-[13px] font-[500] leading-[50px] border-b"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px]">23235235345345</td>
            <td>Canara Bank</td>
            <td>23235235345345</td>
            <td>01 Jan 2024, 11:30 AM</td>
            <td><FaIndianRupeeSign className="inline-block" />5000</td>
            <td>#235345234534534</td>
            <td>
                {status === "approved" && <p style={{letterSpacing: "0.1px"}} className="bg-[#daf2d5] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#2b872a] flex justify-center items-center">Verified</p>}
                {status === "pending" && <p style={{letterSpacing: "0.1px"}} className="bg-[#fff7cf] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#b9ab25] flex justify-center items-center">Pending</p>}
                {status === "decline" && <p style={{letterSpacing: "0.1px"}} className="bg-[#ffd6d6] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#fd3939] flex justify-center items-center">Decline</p>}
            </td>
            <td>
                <p className="w-[30px] h-[30px] flex justify-center items-center bg-[#d4eaff] rounded-full cursor-pointer"><FiEye className="text-[#3e64a7]" /></p>
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
