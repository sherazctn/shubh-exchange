import { Modal } from "antd";

const FancyModal = ({ showModal, fn_closeModal, webColor, selectedFancyBets }: any) => {
    return (
        <Modal title="" open={showModal} onCancel={fn_closeModal} footer={null} style={{ fontFamily: "Roboto" }} width={500} centered>
            <p className="text-[19px] font-[600] mt-[-5px]">Run Amount</p>
            <div className='w-full max-h-[300px] overflow-auto'>
                <table className="table-fixed w-full mt-[10px]">
                    <tr style={{ backgroundColor: webColor, height: "38px" }}>
                        <td
                            className="text-left ps-[15px] text-white font-[500] text-[16px] border-[1px]"
                            style={{ borderColor: webColor }}
                        >
                            Run
                        </td>
                        <td
                            className="text-right pe-[15px] text-white font-[500] text-[16px] border-r-[1px] border-y-[1px]"
                            style={{ borderColor: webColor }}
                        >
                            Amount
                        </td>
                    </tr>
                    {selectedFancyBets && selectedFancyBets?.length > 0 && selectedFancyBets?.map((score: any, index: number) => (
                        <tr key={index} style={{ height: "30px" }}>
                            <td className="text-left ps-[15px] font-[500] text-[14px] border-x-[1px] border-b-[1px] border-gray-300">
                                {score?.score}
                            </td>
                            <td
                                className={`text-right pe-[15px] font-[500] text-[14px] border-r-[1px] border-b-[1px] border-gray-300 ${score?.profit > 0 ? "text-green-500" : score?.profit < 0 ? "text-red-500" : "text-gray-500"}`}
                            >
                                {score?.profit}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </Modal>
    );
};

export default FancyModal