import { Modal } from 'antd';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { fn_cashoutApi } from '../../api/newApis';
import toast from 'react-hot-toast';

const CashoutModal = ({ showModal, fn_closeModal, webColor, amount, eventId, marketId }: any) => {

    const fn_submit = async () => {
        const response = await fn_cashoutApi({ eventId, marketId: String(marketId), amount: Number(amount.toFixed(2)) });
        if (response?.status) {
            fn_closeModal();
            toast.success(response?.message);
            window.location.reload();
        } else {
            return toast.error(response?.message);
        }
    };

    return (
        <Modal title="" open={showModal} onCancel={fn_closeModal} footer={null} style={{ fontFamily: "Roboto" }} width={500} centered>
            <p className="text-[19px] font-[600] mt-[-5px]">Cashout Amount</p>
            <div className='w-full max-h-[300px] overflow-auto'>
                <table className="table-fixed w-full my-[20px]">
                    <tr style={{ height: "38px" }}>
                        <td
                            className="text-left ps-[15px] text-white font-[500] text-[16px] border-[1px]"
                            style={{ backgroundColor: webColor, borderColor: webColor }}
                        >
                            Cashout Amount
                        </td>
                        <td
                            className={`text-left ps-[15px] font-[500] text-[16px] border-[1px] ${amount > 0 ? "text-green-600" : amount < 0 ? "text-red-600" : "text-gray-600"
                                }`}
                            style={{ borderColor: webColor }}
                        >
                            <FaIndianRupeeSign className='inline-block mt-[-2px]' /> {(amount).toFixed(2)}
                        </td>
                    </tr>
                </table>
            </div>
            <div className='flex w-full gap-[10px] mt-[10px]'>
                <button className='h-[35px] flex-1 text-white rounded-[5px]' style={{ backgroundColor: "gray" }} onClick={fn_closeModal}>Cancel</button>
                <button className='h-[35px] flex-1 text-white rounded-[5px]' style={{ backgroundColor: webColor }} onClick={fn_submit}>Cashout</button>
            </div>
        </Modal>
    );
};

export default CashoutModal;