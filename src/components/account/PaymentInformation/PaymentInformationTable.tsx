import { useSelector } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import URL, { formatDate, getUserDepositApi } from "../../../api/api";
import { useEffect, useState } from "react";
import { Modal } from 'antd';
import Loader from "../../Loader";

const PaymentInformationTable = ({ colors }: any) => {
    const panelMainColor = useSelector((state: any) => state.panelMainColor);
    const panelSecColor = useSelector((state: any) => state.panelSecColor);

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        fn_getDeposit();
    }, [])

    const fn_getDeposit = async () => {
        const response = await getUserDepositApi();
        if (response?.status) {
            setLoader(false);
            setData(response?.data?.reverse())
        } else {
            setLoader(false)
            setData([]);
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem({});
    }

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
                            <td className="ps-[5px]">Sr No.</td>
                            <td>TRN-ID</td>
                            <td>BANK NAME</td>
                            <td>DATE</td>
                            <td>AMOUNT<SortingArrows /></td>
                            <td>Status</td>
                            <td>View</td>
                        </tr>
                    </thead>
                    <tbody>
                        {!loader ?
                            data?.length > 0 && data?.map((item, index) => (
                                <TableRows item={item} index={index + 1} colors={colors} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setSelectedItem={setSelectedItem} />
                            )) : (
                                <tr>
                                    <td colSpan={7} className="text-center h-[40px] pt-[10px]"><Loader size={25} color={panelSecColor} /></td>
                                </tr>
                            )}
                    </tbody>
                </table>

            </div>
            {/* modal */}
            <Modal
                title=""
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                onClose={closeModal}
                style={{ fontFamily: "Roboto" }}
                centered
                width={900}
                footer={null}
            >
                <p className="text-[25px] font-[700]">Deposited Transaction Details</p>
                <div className="my-[20px] flex gap-[30px]">
                    <div className="max-w-[400px]">
                        <img alt="" src={`${URL}/${selectedItem?.receipt}`} className="rounded-[20px] max-h-[500px] object-contain lg:min-w-[300px]" />
                    </div>
                    <div className="flex-1 max-w-[400px] flex flex-col gap-[20px]">
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Id</p>
                            <p className="text-[19px] font-[600]">{selectedItem?.transactionId}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Bank Name</p>
                            <p className="text-[19px] font-[600]">{selectedItem?.bank?.bank}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Time</p>
                            <p className="text-[19px] font-[600]">{<td>{formatDate(selectedItem?.createdAt)}</td>}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Transaction Amount</p>
                            <p className="text-[22px] font-[600]"><FaIndianRupeeSign className="inline-block" />{selectedItem?.amount}</p>
                        </div>
                        <div>
                            <p className="text-[17px] font-[500] text-gray-800">Status</p>
                            <p className="text-[22px] font-[600] mt-[5px]">
                                {selectedItem?.status === "approved" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#2b872a] flex justify-center items-center">Approved</p>}
                                {selectedItem?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#b9ab25] flex justify-center items-center">Pending</p>}
                                {selectedItem?.status === "decline" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[35px] rounded-full w-[100px] text-[14px] font-[600] text-[#fd3939] flex justify-center items-center">Decline</p>}
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PaymentInformationTable;

const TableRows = ({ colors, item, index, isModalOpen, setIsModalOpen, setSelectedItem }: any) => {
    return (
        <tr
            className="text-[13px] font-[500] leading-[50px] border-b"
            style={{ borderColor: colors.line, color: colors.subText }}
        >
            <td className="ps-[5px]">{index}</td>
            <td className="ps-[5px]">{item?.transactionId}</td>
            <td>{item?.bank?.bank}</td>
            <td>{formatDate(item?.createdAt)}</td>
            <td><FaIndianRupeeSign className="inline-block" />{item?.amount}</td>
            <td>
                {item?.status === "approved" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#daf2d5] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#2b872a] flex justify-center items-center">Approved</p>}
                {item?.status === "pending" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#fff7cf] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#b9ab25] flex justify-center items-center">Pending</p>}
                {item?.status === "decline" && <p style={{ letterSpacing: "0.1px" }} className="bg-[#ffd6d6] h-[30px] rounded-full w-[80px] text-[12px] font-[600] text-[#fd3939] flex justify-center items-center">Decline</p>}
            </td>
            <td>
                <p
                    className="w-[30px] h-[30px] flex justify-center items-center bg-[#d4eaff] rounded-full cursor-pointer"
                    onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setSelectedItem(item)
                    }}
                >
                    <FiEye className="text-[#3e64a7]" />
                </p>
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
