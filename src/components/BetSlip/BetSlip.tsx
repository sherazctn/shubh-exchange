import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { GoDotFill } from "react-icons/go"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { updateBets, updateBettingSlip } from "../../features/features"
import { ImCross } from "react-icons/im"

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs"

const BetSlip = () => {
    const dispatch = useDispatch();
    const bettingSlip = useSelector((state: any) => state.bettingSlip);
    const [tabs, setTabs] = useState("slip");
    const inputRef = useRef<any>(null);

    const webColor = useSelector((state: any) => state.websiteColor);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [bettingSlip, tabs]);

    return (
        <div className={`bet-slip-main w-full sm:w-[450px] sm:right-[20px] h-[670px] p-[5px] transition-all duration-1000 ${bettingSlip === "close" ? "bottom-[-625px]" : bettingSlip === "hide" ? "bottom-[-670px]" : "bottom-0"}`} style={{ backgroundColor: webColor }}>
            <div
                className="flex justify-between items-center mt-[7px] mb-[9px] cursor-pointer px-[10px] text-[--text-color]"
                onClick={() => dispatch(updateBettingSlip(bettingSlip === "close" ? "open" : "close"))}
            >
                <p className="font-[600]">Betting Slip</p>
                <MdOutlineKeyboardArrowDown className={`text-[22px] transition-all duration-1000 ${bettingSlip === "close" ? "rotate-180" : "rotate-0"}`} />
            </div>
            <div className="p-[5px] bg-gray-200 rounded-t-[7px]">
                <div>
                    <button
                        className={`w-[100px] h-[45px] rounded-tl-[7px] text-[15px] font-[500] cursor-pointer ${tabs === "slip" ? "bg-white" : "bg-transparent"}`}
                        onClick={() => setTabs("slip")}
                    >Bet Slip</button>
                    <button
                        className={`w-[100px] h-[45px] text-[15px] font-[500] cursor-pointer ${tabs === "open" ? "bg-white" : "bg-transparent"}`}
                        onClick={() => setTabs("open")}
                    >Open Bet</button>
                </div>
                {tabs === "slip" && <BetSlipTab webColor={webColor} inputRef={inputRef} />}
                {tabs === "open" && <OpenBet />}
            </div>
        </div>
    )
}

export default BetSlip;

const BetSlipTab = ({ webColor, inputRef }: { webColor: string, inputRef: any }) => {
    const dispatch = useDispatch();
    const [input1, setInput1] = useState<any>();
    const [input2, setInput2] = useState<any>();
    const [view1, setView1] = useState<boolean>(true);
    const [view2, setView2] = useState<boolean>(true);

    const bets = useSelector((state: any) => state.bets);
    const wallet = useSelector((state: any) => state.wallet);

    const fn_keyDown = (e: any) => {
        e.preventDefault();
        if (e.key === '1') {
            setInput1('1000');
        } else if (e.key === '2') {
            setInput1('2000');
        } else if (e.key === '3') {
            setInput1('3000');
        } else if (e.key === '4') {
            setInput1('4000');
        } else if (e.key === '5') {
            setInput1('5000');
        } else if (e.key === 'ArrowUp') {
            setInput1((prev: any) => {
                const newValue = (parseInt(prev, 10) || 0) + 1;
                return newValue.toString();
            });
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            setInput1((prev: any) => {
                const newValue = (parseInt(prev, 10) || 0) - 1;
                return newValue.toString();
            });
            e.preventDefault();
        }
    }
    const fn_keyDown2 = (e: any) => {
        e.preventDefault();
        if (e.key === '1') {
            setInput2('1000');
        } else if (e.key === '2') {
            setInput2('2000');
        } else if (e.key === '3') {
            setInput2('3000');
        } else if (e.key === '4') {
            setInput2('4000');
        } else if (e.key === '5') {
            setInput2('5000');
        } else if (e.key === 'ArrowUp') {
            setInput2((prev: any) => {
                const newValue = (parseInt(prev, 10) || 0) + 1;
                return newValue.toString();
            });
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            setInput2((prev: any) => {
                const newValue = (parseInt(prev, 10) || 0) - 1;
                return newValue.toString();
            });
            e.preventDefault();
        }
    }

    const fn_changeAmountInput = (value: any, index: any) => {
        const updatedBets = bets.map((bet: any, i: any) => {
            if (i === index) {
                return { ...bet, amount: parseInt(value), afterWin: wallet + parseInt(value), afterLoss: wallet - parseInt(value) };
            }
            return bet;
        });
        dispatch(updateBets(updatedBets));
    }

    const fn_closeBet = (index: any) => {
        const updatedBets = bets.filter((_: any, i: any) => i !== index);
        dispatch(updateBets(updatedBets));
    }

    return (
        <div className="flex flex-col justify-between gap-[7px] h-[570px]">
            {/* bets */}
            <div className="flex flex-1 flex-col gap-[5px] overflow-auto">
                {bets?.length > 0 && bets?.map((item: any, index: any) => (
                    <div key={index} className="px-[5px] pb-[5px] pt-[7px] bg-white">
                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-[4px] mb-[5px]">
                                <GoDotFill className="text-[15px]" />
                                <span className="text-[15px] font-[600]">{item?.gameName}</span>
                            </p>
                            <ImCross className="text-[red] text-[10px] cursor-pointer me-[5px]" onClick={() => fn_closeBet(index)} />
                        </div>
                        <div className="flex gap-[10px]">
                            <input
                                min={1}
                                value={item?.odd}
                                type="number"
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                            <input
                                min={1}
                                type="number"
                                value={item?.amount}
                                onChange={(e) => fn_changeAmountInput(e.target.value, index)}
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                        </div>
                        <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                            <span>Min Bet: 10</span>
                            <span>Max Bet: 100k</span>
                            <span>Max Profit: 2.5M</span>
                        </p>
                        <div className="text-[11px] mt-[2px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:justify-between">
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">5000</button>
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">25000</button>
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">50000</button>
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">100000</button>
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">200000</button>
                            <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">500000</button>
                        </div>
                        <div className="flex border-t border-gray-200 my-[10px] pt-[5px]">
                            <div className="flex-1 border-e-[2px] border-gray-500 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-green-600 pt-[5px] pb-[7px]">
                                    After Winning<BsGraphUpArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{wallet}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.amount}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-green-600 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedUp className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.afterWin}</span>
                                    </span>
                                </p>
                            </div>
                            <div className="flex-1 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-red-500 pt-[5px] pb-[7px]">
                                    After Lossing<BsGraphDownArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{wallet}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.amount}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-red-500 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedDown className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                        <span className="w-[45px] text-end">{item?.afterLoss}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* buttons */}
            <div>
                <button className="w-full min-h-[43px] font-[600] rounded-[5px] text-[15px] text-[--text-color]" style={{ backgroundColor: webColor }}>
                    Place Bets
                </button>
                <button className="w-full mt-[7px] min-h-[43px] border-[2px] bg-gray-200 font-[600] rounded-[5px] text-[15px]" style={{ borderColor: webColor, color: webColor }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

const OpenBet = () => {
    return (
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[570px]">
            <p className="text-[13px] text-gray-600">You have no matched or unmatched bets.</p>
        </div>
    )
}