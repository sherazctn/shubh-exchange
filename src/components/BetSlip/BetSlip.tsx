import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { GoDotFill } from "react-icons/go"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { updateBettingSlip } from "../../features/features"
import { ImCross } from "react-icons/im"

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs"

const BetSlip = () => {
    const dispatch = useDispatch();
    const bettingSlip = useSelector((state: any) => state.bettingSlip);
    const [tabs, setTabs] = useState("slip");
    return (
        <div className={`bet-slip-main w-full sm:w-[450px] sm:right-[20px] h-[660px] p-[5px] transition-all duration-1000 ${bettingSlip === "close" ? "bottom-[-615px]" : bettingSlip === "hide" ? "bottom-[-660px]" : "bottom-0"}`}>
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
                {tabs === "slip" && <BetSlipTab />}
                {tabs === "open" && <OpenBet />}
            </div>
        </div>
    )
}

export default BetSlip;

const BetSlipTab = () => {
    const [input1, setInput1] = useState<any>();
    const [input2, setInput2] = useState<any>();
    const [view1, setView1] = useState<boolean>(true);
    const [view2, setView2] = useState<boolean>(true);
    return (
        <div className="flex bg-white p-[5px] flex-col justify-between gap-[7px] h-[560px]">
            {/* bets */}
            <div className="flex flex-1 flex-col gap-[7px] overflow-auto">
                {view1 && (
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-[4px]">
                                <GoDotFill className="text-[15px]" />
                                <span className="text-[15px] font-[600]">Namibia vs USA</span>
                            </p>
                            <ImCross className="text-[red] text-[10px] cursor-pointer" onClick={() => setView1(false)} />
                        </div>
                        <div className="flex gap-[10px]">
                            <input
                                min={1}
                                type="number"
                                value={input1}
                                onChange={(e) => setInput1(e.target.value)}
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                            <input
                                min={1}
                                type="number"
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                        </div>
                        <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                            <span>Min Bet: 10</span>
                            <span>Max Bet: 100k</span>
                            <span>Max Profit: 2.5M</span>
                        </p>
                        <div className="text-[11px] mt-[2px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:justify-between">
                            <button onClick={() => setInput1(5000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">5000</button>
                            <button onClick={() => setInput1(25000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">25000</button>
                            <button onClick={() => setInput1(50000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">50000</button>
                            <button onClick={() => setInput1(100000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">100000</button>
                            <button onClick={() => setInput1(200000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">200000</button>
                            <button onClick={() => setInput1(500000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">500000</button>
                        </div>
                        <div className="flex border-t border-gray-200 my-[10px] pt-[5px]">
                            <div className="flex-1 border-e border-gray-200 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-green-600">
                                    After Winning<BsGraphUpArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">20,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">5,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-green-600 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedUp className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">25,000</span>
                                    </span>
                                </p>
                            </div>
                            <div className="flex-1 border-e border-gray-200 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-red-500">
                                    After Lossing<BsGraphDownArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">20,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">5,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-red-500 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedDown className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                        <span className="w-[45px] text-end">15,000</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {view2 && (
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-[4px]">
                                <GoDotFill className="text-[15px]" />
                                <span className="text-[15px] font-[600]">Namibia vs USA</span>
                            </p>
                            <ImCross className="text-[red] text-[10px] cursor-pointer" onClick={() => setView2(false)} />
                        </div>
                        <div className="flex gap-[10px]">
                            <input
                                min={1}
                                type="number"
                                value={input2}
                                onChange={(e) => setInput2(e.target.value)}
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                            <input
                                min={1}
                                type="number"
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                        </div>
                        <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                            <span>Min Bet: 10</span>
                            <span>Max Bet: 100k</span>
                            <span>Max Profit: 2.5M</span>
                        </p>
                        <div className="text-[11px] mt-[2px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:justify-between">
                            <button onClick={() => setInput2(5000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">5000</button>
                            <button onClick={() => setInput2(10000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">25000</button>
                            <button onClick={() => setInput2(50000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">50000</button>
                            <button onClick={() => setInput2(100000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">100000</button>
                            <button onClick={() => setInput2(200000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">200000</button>
                            <button onClick={() => setInput2(500000)} className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]">500000</button>
                        </div>
                        <div className="flex border-t border-gray-200 my-[10px] pt-[5px]">
                            <div className="flex-1 border-e border-gray-200 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-green-600">
                                    After Winning<BsGraphUpArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">20,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">5,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-green-600 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedUp className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">25,000</span>
                                    </span>
                                </p>
                            </div>
                            <div className="flex-1 border-e border-gray-200 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-red-500">
                                    After Lossing<BsGraphDownArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">20,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">5,000</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] text-red-500 font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                                    <span>Net Amount:<TiArrowSortedDown className="inline-block text-[18px] ms-[5px]" /></span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                        <span className="w-[45px] text-end">15,000</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* buttons */}
            <div>
                <button className="w-full min-h-[43px] bg-[--main-color] font-[600] rounded-[5px] text-[15px] text-[--text-color]">
                    Place Bets
                </button>
                <button className="w-full mt-[7px] min-h-[43px] border-[2px] border-[--main-color] bg-gray-200 font-[600] rounded-[5px] text-[15px]">
                    Cancel
                </button>
            </div>
        </div>
    )
}

const OpenBet = () => {
    return (
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[560px]">
            <p className="text-[13px] text-gray-600">You have no matched or unmatched bets.</p>
        </div>
    )
}