import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { GoDotFill } from "react-icons/go"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { updateBettingSlip } from "../../features/features"
import { ImCross } from "react-icons/im"

const BetSlip = () => {
    const dispatch = useDispatch();
    const bettingSlip = useSelector((state: any) => state.bettingSlip);
    const [tabs, setTabs] = useState("slip");
    return (
        <div className={`bet-slip-main w-full sm:w-[350px] sm:right-[50px] h-[500px] p-[5px] transition-all duration-1000 ${bettingSlip === "close" ? "bottom-[-455px]" : bettingSlip === "hide" ? "bottom-[-500px]" : "bottom-0"}`}>
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
    return (
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[395px]">
            <div>
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-[4px]">
                        <GoDotFill className="text-[15px]" />
                        <span className="text-[14px] font-[600]">Namibia vs USA</span>
                    </p>
                    <ImCross className="text-[red] text-[10px] cursor-pointer" />
                </div>
                <div className="flex gap-[10px]">
                    <input type="number" min={1} className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]" />
                    <input type="number" min={1} className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]" />
                </div>
                <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                    <span>Min Bet: 10</span>
                    <span>Max Bet: 100k</span>
                    <span>Max Profit: 2.5M</span>
                </p>
                <div className="text-[11px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:gap-0 sm:justify-between">
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">5000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">25000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">50000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">100000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">200000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">500000</button>
                </div>
                <div className="flex border-t border-gray-200 my-[10px] pt-[8px]">
                    <div className="flex-1 border-e border-gray-200 px-[5px]">
                        <p className="text-center text-[13px] font-[600]">After Winning</p>
                        <p className="flex text-[11px] items-center justify-between mt-[4px]">
                            <span>Current Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">20,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] items-center justify-between">
                            <span>Added Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">5,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                            <span>Net Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">25,000</span>
                            </span>
                        </p>
                    </div>
                    <div className="flex-1 border-e border-gray-200 px-[5px]">
                        <p className="text-center text-[13px] font-[600]">After Lossing</p>
                        <p className="flex text-[11px] items-center justify-between mt-[4px]">
                            <span>Current Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">20,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] items-center justify-between">
                            <span>Loss Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">5,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                            <span>Net Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">15,000</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <p className="flex items-center gap-[4px]">
                        <GoDotFill className="text-[15px]" />
                        <span className="text-[14px] font-[600]">Namibia vs USA</span>
                    </p>
                    <ImCross className="text-[red] text-[10px] cursor-pointer" />
                </div>
                <div className="flex gap-[10px]">
                    <input type="number" min={1} className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]" />
                    <input type="number" min={1} className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]" />
                </div>
                <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                    <span>Min Bet: 10</span>
                    <span>Max Bet: 100k</span>
                    <span>Max Profit: 2.5M</span>
                </p>
                <div className="text-[11px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:gap-0 sm:justify-between">
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">5000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">25000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">50000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">100000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">200000</button>
                    <button className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] w-[50px]">500000</button>
                </div>
                <div className="flex border-t border-gray-200 my-[10px] pt-[8px]">
                    <div className="flex-1 border-e border-gray-200 px-[5px]">
                        <p className="text-center text-[13px] font-[600]">After Winning</p>
                        <p className="flex text-[11px] items-center justify-between mt-[4px]">
                            <span>Current Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">20,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] items-center justify-between">
                            <span>Added Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">5,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                            <span>Net Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">25,000</span>
                            </span>
                        </p>
                    </div>
                    <div className="flex-1 border-e border-gray-200 px-[5px]">
                        <p className="text-center text-[13px] font-[600]">After Lossing</p>
                        <p className="flex text-[11px] items-center justify-between mt-[4px]">
                            <span>Current Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">20,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] items-center justify-between">
                            <span>Loss Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">5,000</span>
                            </span>
                        </p>
                        <p className="flex text-[11px] font-[500] items-center justify-between border-t mt-[2px] border-b border-gray-300 pt-[3px] pb-[1px]">
                            <span>Net Amount:</span>
                            <span className="flex items-center">
                                <FaIndianRupeeSign className="mt-[-2px] text-[12px]" />
                                <span className="w-[45px] text-end">15,000</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <button className="w-full min-h-[43px] bg-[--main-color] font-[600] rounded-[5px] text-[15px] text-[--text-color]">
                Place Bets
            </button>
            <button className="w-full min-h-[43px] border-[2px] border-[--main-color] bg-gray-200 font-[600] rounded-[5px] text-[15px]">
                Cancel
            </button>
        </div>
    )
}

const OpenBet = () => {
    return(
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[395px]">
            <p className="text-[13px] text-gray-600">You have no matched or unmatched bets.</p>
        </div>
    )
}