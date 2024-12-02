import toast from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// import { GoDotFill } from "react-icons/go"
import { ImCross } from "react-icons/im"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import cricketLogo from "../../assets/cricket-ball.png";
import emptySlip from "../../assets/empty-slip.png";

import Loader from "../Loader"
import URL, { getOpenBetsByUserApi, placeBetsApi } from "../../api/api"
import { updateBets, updateBettingSlip, updateWallet } from "../../features/features"
import { FaExclamationCircle } from "react-icons/fa"


const BetSlip = () => {
    const dispatch = useDispatch();
    const bettingSlip = useSelector((state: any) => state.bettingSlip);
    const [tabs, setTabs] = useState("slip");
    const inputRef = useRef<any>(null);
    const token: any = useSelector((state: any) => state.token);

    const webColor = useSelector((state: any) => state.websiteColor);
    const [openBets, setOpenBets] = useState([]);

    useEffect(() => {
        fn_getOpenBets();
    }, []);

    useEffect(() => {
        fn_getOpenBets();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [bettingSlip, tabs]);

    const fn_getOpenBets = async () => {
        const response = await getOpenBetsByUserApi(token);
        if (response?.status) {
            setOpenBets(response?.data?.reverse());
        } else {
            setOpenBets([]);
        }
    }

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
                {tabs === "slip" && <BetSlipTab webColor={webColor} inputRef={inputRef} fn_getOpenBets={fn_getOpenBets} setTabs={setTabs} />}
                {tabs === "open" && <OpenBet openBets={openBets} />}
            </div>
        </div>
    )
}

export default BetSlip;

const BetSlipTab = ({ webColor, inputRef, fn_getOpenBets, setTabs }: { webColor: string, inputRef: any, fn_getOpenBets: any, setTabs: any }) => {
    const dispatch = useDispatch();
    const redisGames = useSelector((state: any) => state.redisGames);

    const bets = useSelector((state: any) => state.bets);
    const wallet = useSelector((state: any) => state.wallet);
    const [loader, setLoader] = useState(false);

    const fn_keyDown = (e: any, index: number) => {
        e.preventDefault();

        let value;
        if (e.key === '1') {
            value = 1000;
        } else if (e.key === '2') {
            value = 2000;
        } else if (e.key === '3') {
            value = 3000;
        } else if (e.key === '4') {
            value = 4000;
        } else if (e.key === '5') {
            value = 5000;
        } else if (e.key === 'ArrowUp') {
            value = (parseInt(bets[index].amount || '0') + 1).toString();
        } else if (e.key === 'ArrowDown') {
            value = (parseInt(bets[index].amount || '0') - 1).toString();
        }
        if (value) {
            fn_changeAmountInput(value, index);
        }
    }

    const fn_changeOddInput = (value: any, index: any) => {
        const updatedBets = bets.map((bet: any, i: any) => {
            if (i === index) {
                const odd = parseFloat(value);
                const amount = bet.amount;
                const profit = parseFloat((amount * (odd - 1)).toFixed(2));
                const loss = amount;

                return {
                    ...bet,
                    odd: odd,
                    afterWin: wallet + profit,
                    afterLoss: wallet - loss,
                    profit: profit,
                    loss: loss
                };
            }
            return bet;
        });

        dispatch(updateBets(updatedBets));
    };

    const fn_changeAmountInput = (value: any, index: any) => {
        const updatedBets = bets.map((bet: any, i: any) => {
            if (i === index) {
                const amount = parseInt(value);
                const profit = parseFloat((amount * (bet.odd - 1)).toFixed(2));
                const loss = amount;

                return {
                    ...bet,
                    amount: amount,
                    afterWin: wallet + profit,
                    afterLoss: wallet - loss,
                    profit: profit,
                    loss: loss
                };
            }
            return bet;
        });

        dispatch(updateBets(updatedBets));
    }

    const fn_closeBet = (index: any) => {
        const updatedBets = bets.filter((_: any, i: any) => i !== index);
        dispatch(updateBets(updatedBets));
    }

    const fn_placeBet = async () => {
        if (bets?.length === 0) return toast.error("Select Match For Bet");
        const bettedAmount = bets?.reduce((acc: any, i: any) => {
            return acc + i?.amount
        }, 0);
        if (bettedAmount > wallet) {
            return toast.error("Not Enough Balance");
        }
        const suspendedBet = bets?.find(
            (b: any) => b?.status && (b?.status !== "active" && b?.status !== "ACTIVE")
        );
        if (suspendedBet) {
            return toast.error("Bet is Timed Out");
        }
        setLoader(true);
        const response = await placeBetsApi(bets);
        if (response?.status) {
            setLoader(false);
            fn_getOpenBets();
            dispatch(updateBets([]));
            setTabs("open");
            dispatch(updateWallet(response?.wallet));

            return toast.success(response?.message);
        } else {
            setLoader(false);
            return toast.error(response?.message);
        }
    }

    const fn_setAmount = (amount: number, index: number) => {
        const updatedBets = bets.map((bet: any, i: any) => {
            if (i === index) {
                const profit = parseFloat((amount * (bet.odd - 1)).toFixed(2));
                const loss = amount;

                return {
                    ...bet,
                    amount: amount,
                    afterWin: wallet + profit,
                    afterLoss: wallet - loss,
                    profit: profit,
                    loss: loss
                };
            }
            return bet;
        });

        dispatch(updateBets(updatedBets));
    };

    return (
        <div className="flex flex-col justify-between gap-[7px] h-[570px]">
            {/* bets */}
            <div className="flex flex-1 flex-col gap-[5px] overflow-auto">
                {bets?.length > 0 ? bets?.map((item: any, index: any) => (
                    <div key={index} className="px-[5px] pb-[5px] pt-[7px] bg-white">
                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-[4px] mb-[5px]">
                                {/* <GoDotFill className="text-[15px]" /> */}
                                <img alt="" src={`${URL}/${redisGames?.find((r:any) => r.id == item?.sportId).image}`} className="w-[20px] h-[20px]" />
                                <span className="text-[15px] font-[600]">{item?.gameName}</span>
                            </p>
                            <ImCross className="text-[red] text-[10px] cursor-pointer me-[5px]" onClick={() => fn_closeBet(index)} />
                        </div>
                        <div className="flex gap-[10px]">
                            <input
                                min={1}
                                value={item?.odd}
                                onChange={(e) => fn_changeOddInput(e.target.value, index)}
                                type="number"
                                className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                            />
                            {index === 0 ? (
                                <input
                                    ref={inputRef}
                                    min={1}
                                    type="number"
                                    value={item?.amount}
                                    // onKeyDown={(e) => fn_keyDown(e, index)}
                                    onChange={(e) => fn_changeAmountInput(e.target.value, index)}
                                    className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                                />) : (
                                <input
                                    min={1}
                                    type="number"
                                    value={item?.amount}
                                    // onKeyDown={(e) => fn_keyDown(e, index)}
                                    onChange={(e) => fn_changeAmountInput(e.target.value, index)}
                                    className="w-[60px] sm:w-[155px] bg-gray-100 border rounded focus:outline-none h-[28px] text-[13px] font-[500] px-[7px]"
                                />
                            )}
                        </div>
                        <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                            <span>Min Bet: 10</span>
                            <span>Max Bet: 100k</span>
                            <span>Max Profit: 2.5M</span>
                        </p>
                        <div className="text-[11px] mt-[2px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:justify-between">
                            {bets.map((bet: any, index: number) => (
                                <div key={index} className="flex gap-[5px]">
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(5000, index)}
                                    >
                                        5000
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(25000, index)}
                                    >
                                        25000
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(50000, index)}
                                    >
                                        50000
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(100000, index)}
                                    >
                                        100000
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(200000, index)}
                                    >
                                        200000
                                    </button>
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(500000, index)}
                                    >
                                        500000
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex border-t border-gray-200 my-[10px] pt-[5px]">
                            <div className="flex-1 border-e-[2px] border-gray-500 px-[5px]">
                                <p className="text-center text-[15px] font-[600] text-green-600 pt-[5px] pb-[7px]">
                                    After Winning<BsGraphUpArrow className="inline-block mt-[-3px] ms-[6px]" />
                                </p>
                                <p className="flex text-[13px] items-center justify-between mt-[5px]">
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.amount}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Profit Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.profit}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{wallet}</span>
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
                                    <span>Bet Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.amount}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Loss Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{item?.loss}</span>
                                    </span>
                                </p>
                                <p className="flex text-[13px] items-center justify-between">
                                    <span>Current Amount:</span>
                                    <span className="flex items-center">
                                        <FaIndianRupeeSign className="text-[14px]" />
                                        <span className="w-[45px] text-end">{wallet}</span>
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
                        <p className="text-[14px] mt-[-4px] text-end">Plateform Charger: <span className="font-[500]">{item?.adminCommision || 0}%</span></p>
                    </div>
                )) : (
                    <div className="flex justify-center flex-col items-center gap-[30px] mt-[90px]">
                        <img src={emptySlip} className="h-[250px]" />
                        <p className="flex items-center gap-[5px] text-[15px] font-[500]]"><FaExclamationCircle className="inline-block text-[22px]" /> Bet Slip is Empty</p>
                    </div>
                )}
            </div>
            {/* buttons */}
            {bets?.length > 0 && (
                <div>
                    <button className="w-full min-h-[43px] font-[600] flex justify-center items-center rounded-[5px] text-[15px] text-[--text-color]" disabled={loader} style={{ backgroundColor: webColor }} onClick={fn_placeBet}>
                        {!loader ? "Place Bets" : <Loader size={22} color="white" />}
                    </button>
                    <button className="w-full mt-[7px] min-h-[43px] border-[2px] bg-gray-200 font-[600] rounded-[5px] text-[15px]" style={{ borderColor: webColor, color: webColor }}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

const OpenBet = ({ openBets }: any) => {
    const redisGames = useSelector((state: any) => state.redisGames);
    return (
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[570px]">
            {openBets?.length === 0 ? (
                <p className="text-[13px] text-gray-600">You have no matched or unmatched bets.</p>
            ) : (
                <div>
                    <table className="w-full">
                        <tr className="h-[40px] bg-gray-100 text-[13px] font-[500]">
                            <td className="w-[50%]"></td>
                            <td>Odds</td>
                            <td>Stake</td>
                            <td>P/L(<FaIndianRupeeSign className="inline-block" />)</td>
                        </tr>
                        {openBets?.map((item: any) => (
                            <tr className="h-[40px] text-[13px] font-[500] border-b">
                                <td className="flex items-center gap-[3px]"><img alt="" src={`${URL}/${redisGames?.find((r:any) => r.id == item?.sportId).image}`} className="w-[20px] h-[20px]" />{item?.gameName}</td>
                                <td>{item?.odd}</td>
                                <td className="flex items-center gap-[2px]"><FaIndianRupeeSign />{item?.amount}</td>
                                <td>{item?.profit}/{item?.amount}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    )
}