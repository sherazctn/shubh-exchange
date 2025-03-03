import toast from "react-hot-toast"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// import { GoDotFill } from "react-icons/go"
import { ImCross } from "react-icons/im"
import { HiSpeakerWave } from "react-icons/hi2";
import { FaIndianRupeeSign } from "react-icons/fa6"
import { FaExclamationCircle } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import emptySlip from "../../assets/empty-slip.png";

import Loader from "../Loader"
import { voiceLanguage } from "../../assets/data";
import URL, { fancy_marketOddsFormulation, getOpenBetsByUserApi, marketOddsFormulation, placeBetsApi } from "../../api/api"
import { updateBets, updateBettingSlip, updatePendingBets, updateRecentExp, updateSlipTab, updateWallet } from "../../features/features"

const BetSlip = () => {
    const dispatch = useDispatch();
    const bettingSlip = useSelector((state: any) => state.bettingSlip);
    const slipTab = useSelector((state: any) => state?.slipTab);
    const inputRef = useRef<any>(null);
    const token: any = useSelector((state: any) => state.token);

    const webColor = useSelector((state: any) => state.websiteColor);
    const [openBets, setOpenBets] = useState([]);
    const trigger = useSelector((state: any) => state.trigger);

    useEffect(() => {
        fn_getOpenBets();
    }, []);

    useEffect(() => {
        fn_getOpenBets();
        if (inputRef.current && window.innerWidth > 400) {
            // inputRef.current.focus();
        }
    }, [bettingSlip, slipTab, trigger]);

    const fn_getOpenBets = async () => {
        const response = await getOpenBetsByUserApi(token);
        if (response?.status) {
            setOpenBets(response?.data);
        } else {
            setOpenBets([]);
        }
    }

    const handleSelectClick = (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        localStorage.setItem('voiceLanguage', event.target.value)
    };

    return (
        <div className={`bet-slip-main w-full sm:w-[450px] sm:right-[20px] h-[405px] p-[5px] transition-all duration-1000 ${bettingSlip === "close" ? "bottom-[-360px]" : bettingSlip === "hide" ? "bottom-[-405px]" : "bottom-0"}`} style={{ backgroundColor: webColor }}>
            <div
                className="flex justify-between items-center mt-[7px] mb-[9px] cursor-pointer px-[10px] text-[--text-color] relative"
                onClick={() => dispatch(updateBettingSlip(bettingSlip === "close" ? "open" : "close"))}
            >
                <p className="font-[600]">Betting Slip</p>
                <MdOutlineKeyboardArrowDown className={`text-[22px] transition-all duration-1000 ${bettingSlip === "close" ? "rotate-180" : "rotate-0"}`} />
                <select className="bg-[black] absolute right-[40px] rounded-[5px] text-[15px] h-[23px] px-[5px]" onClick={handleSelectClick} onChange={handleLanguageChange}>
                    {voiceLanguage?.map((lan, index) => (
                        <option value={index} selected={Number(localStorage.getItem('voiceLanguage')) === index ? true : false} className="capitalize">{lan.label}</option>
                    ))}
                </select>
                <HiSpeakerWave className="absolute right-[125px] text-white" />
            </div>
            <div className="p-[5px] bg-gray-200 rounded-t-[7px]">
                <div>
                    <button
                        className={`w-[100px] h-[45px] rounded-tl-[7px] text-[15px] font-[500] cursor-pointer ${slipTab === "slip" ? "bg-white" : "bg-transparent"}`}
                        onClick={() => dispatch(updateSlipTab("slip"))}
                    >Bet Slip</button>
                    <button
                        className={`w-[100px] h-[45px] text-[15px] font-[500] cursor-pointer ${slipTab === "open" ? "bg-white" : "bg-transparent"}`}
                        onClick={() => dispatch(updateSlipTab("open"))}
                    >Open Bet</button>
                </div>
                {slipTab === "slip" && <BetSlipTab webColor={webColor} inputRef={inputRef} fn_getOpenBets={fn_getOpenBets} updateSlipTab={updateSlipTab} />}
                {slipTab === "open" && <OpenBet openBets={openBets} />}
            </div>
        </div>
    )
};

export default BetSlip;

const BetSlipTab = ({ webColor, inputRef, fn_getOpenBets, updateSlipTab }: { webColor: string, inputRef: any, fn_getOpenBets: any, updateSlipTab: any }) => {

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const pendingBets = useSelector((state: any) => state.pendingBets);

    const bets = useSelector((state: any) => state.bets);
    const wallet = useSelector((state: any) => state.wallet);
    const exposure = useSelector((state: any) => state.exposure);
    const redisGames = useSelector((state: any) => state.redisGames);
    const expCalculation = useSelector((state: any) => state.expCalculation);

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
                let profit = bet?.side === "Back" ? (parseFloat((amount * (bet.odd - 1)).toFixed(2))) : amount;
                let exposure = bet?.side === "Lay" ? -(parseFloat((amount * (bet.odd - 1)).toFixed(2))) : -amount;
                if (bet?.marketName === "bookmaker" || bet?.marketId?.includes("-") && bet?.marketName !== "tied_match" && bet?.marketName !== "oddeven" && !bet?.marketName?.includes("CrickCasino")) {
                    profit = bet?.side === "Back" ? (parseFloat((amount * (bet.odd / 100)).toFixed(2))) : amount;
                    exposure = bet?.side === "Lay" ? -(parseFloat((amount * (bet.odd / 100)).toFixed(2))) : -amount;
                }
                const loss = amount;
                const newObj = {
                    ...bet,
                    amount: amount,
                    afterWin: wallet + profit,
                    afterLoss: wallet - loss,
                    profit: profit,
                    loss: loss,
                    stake: amount,
                    exposure: exposure
                };
                const updatedPendingBets = pendingBets?.filter((bet: any) => {
                    if (bet?.marketName !== "fancy") {
                        const marketId = newObj.marketId?.includes("-") ? newObj.marketId?.split("-")?.[0] : newObj?.marketId;
                        const compareMarketId = bet.marketId?.includes("-") ? bet.marketId?.split("-")?.[0] : bet?.marketId;
                        return compareMarketId == marketId;
                    } else {
                        return bet?.marketId == newObj?.marketId
                    }
                });
                if (newObj?.marketName !== "fancy") {
                    const updatedCalculation = marketOddsFormulation(newObj, updatedPendingBets);
                    dispatch(updateRecentExp(updatedCalculation));
                    return {
                        ...bet,
                        amount: amount,
                        afterWin: wallet + profit,
                        afterLoss: wallet - loss,
                        profit: profit,
                        loss: loss,
                        stake: amount,
                        exposure: exposure
                    };
                } else {
                    const updatedCalculation = fancy_marketOddsFormulation(newObj, updatedPendingBets);
                    dispatch(updateRecentExp(updatedCalculation));
                    return {
                        ...bet,
                        amount: amount,
                        afterWin: wallet + profit,
                        afterLoss: wallet - loss,
                        profit: profit,
                        loss: loss,
                        stake: amount,
                        exposure: exposure
                    };
                }
            }
            return bet;
        });
        console.log("updatedBets ==> ", bets);
        dispatch(updateBets(updatedBets));
    };

    const fn_closeBet = (index: any) => {
        const updatedBets = bets.filter((_: any, i: any) => i !== index);
        dispatch(updateBets(updatedBets));
        dispatch(updateRecentExp({}));
    }

    const fn_placeBet = async () => {
        if (bets?.length === 0) return toast.error("Select Match For Bet");
        if (bets?.[0]?.amount === "" || !bets?.[0]?.amount) {
            return toast.error("Enter Amount");
        }
        const bettedAmount = bets?.reduce((acc: any, i: any) => {
            return acc + i?.amount
        }, 0);
        if (bets?.[0]?.amount > wallet) {
            return toast.error("Not Enough Balance");
        };
        if (bets?.[0]?.side === "Back") {
            if ((Math.abs(exposure) + bettedAmount) > wallet) {
                return toast.error("Not Enough Balance");
            };
        };
        if (bets?.[0]?.side === "Lay") {
            if ((Math.abs(exposure) + Math.abs(bets?.[0]?.exposure)) > wallet) {
                return toast.error("Not Enough Balance");
            };
        };
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
            const selectedLanguage = Number(localStorage.getItem('voiceLanguage')) || 0;
            const lan = voiceLanguage[selectedLanguage];
            const msg = new SpeechSynthesisUtterance();
            msg.text = lan.line || 'Bet has been placed';
            msg.lang = lan.name || 'en';
            window.speechSynthesis.speak(msg);
            fn_getOpenBets();
            dispatch(updateBets([]));
            dispatch(updateSlipTab("open"));
            dispatch(updateWallet(response?.wallet));
            dispatch(updateRecentExp({}));
            const res = await getOpenBetsByUserApi(null);
            if (res?.status) {
                dispatch(updatePendingBets(res?.data));
                console.log(res?.data);
            }
            return toast.success(response?.message);
        } else {
            setLoader(false);
            return toast.error(response?.message);
        }
    }

    const fn_setAmount = (amount: number, index: number) => {
        const updatedBets = bets.map((bet: any, i: any) => {
            if (i === index) {
                let profit = bet?.side === "Back" ? (parseFloat((amount * (bet.odd - 1)).toFixed(2))) : amount;
                let exposure = bet?.side === "Lay" ? -(parseFloat((amount * (bet.odd - 1)).toFixed(2))) : -amount;
                if (bet?.marketName === "bookmaker" || bet?.marketId?.includes("-") && bet?.marketName !== "tied_match" && bet?.marketName !== "oddeven" && !bet?.marketName?.includes("CrickCasino")) {
                    profit = bet?.side === "Back" ? (parseFloat((amount * (bet.odd / 100)).toFixed(2))) : amount;
                    exposure = bet?.side === "Lay" ? -(parseFloat((amount * (bet.odd / 100)).toFixed(2))) : -amount;
                }
                const loss = amount;
                const newObj = {
                    ...bet,
                    amount: amount,
                    afterWin: wallet + profit,
                    afterLoss: wallet - loss,
                    profit: profit,
                    loss: loss,
                    stake: amount,
                    exposure: exposure
                };
                const updatedPendingBets = pendingBets?.filter((bet: any) => {
                    if (bet?.marketName !== "fancy") {
                        const marketId = newObj.marketId?.includes("-") ? newObj.marketId?.split("-")?.[0] : newObj?.marketId;
                        const compareMarketId = bet.marketId?.includes("-") ? bet.marketId?.split("-")?.[0] : bet?.marketId;
                        return compareMarketId == marketId;
                    } else {
                        return bet?.marketId == newObj?.marketId
                    }
                });
                const updatedCalculation = marketOddsFormulation(newObj, updatedPendingBets);
                dispatch(updateRecentExp(updatedCalculation));
                if (newObj?.marketName !== "fancy") {
                    const updatedCalculation = marketOddsFormulation(newObj, updatedPendingBets);
                    dispatch(updateRecentExp(updatedCalculation));
                    return {
                        ...bet,
                        amount: amount,
                        afterWin: wallet + profit,
                        afterLoss: wallet - loss,
                        profit: profit,
                        loss: loss,
                        stake: amount,
                        exposure: exposure
                    };
                } else {
                    const updatedCalculation = fancy_marketOddsFormulation(newObj, updatedPendingBets);
                    dispatch(updateRecentExp(updatedCalculation));
                    return {
                        ...bet,
                        amount: amount,
                        afterWin: wallet + profit,
                        afterLoss: wallet - loss,
                        profit: profit,
                        loss: loss,
                        stake: amount,
                        exposure: exposure
                    };
                };
            }
            return bet;
        });
        dispatch(updateBets(updatedBets));
    };

    return (
        <div className="flex flex-col justify-between gap-[7px] h-[300px]">
            {/* bets */}
            <div className="flex flex-1 flex-col gap-[5px] overflow-auto">
                {bets?.length > 0 ? bets?.map((item: any, index: any) => (
                    <div key={index} className="px-[5px] pb-[5px] pt-[7px] bg-white">
                        <div className="flex justify-between items-center">
                            <p className="flex items-center gap-[4px] mb-[5px]">
                                {/* <GoDotFill className="text-[15px]" /> */}
                                <img alt="" src={`${URL}/${redisGames?.find((r: any) => r?.id == item?.sportId)?.image}`} className="w-[20px] h-[20px]" />
                                <span className="text-[15px] font-[600]">{item?.gameName}</span>
                            </p>
                            <ImCross className="text-[red] text-[10px] cursor-pointer me-[5px]" onClick={() => fn_closeBet(index)} />
                        </div>
                        <div className="flex gap-[10px]">
                            <input
                                min={1}
                                value={item?.odd}
                                // onChange={(e) => fn_changeOddInput(e.target.value, index)}
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
                        {/* <p className="flex text-[11px] mt-[5px] font-[500] gap-[15px] items-center text-[red]">
                            <span>Min Bet: 10</span>
                            <span>Max Bet: 100k</span>
                            <span>Max Profit: 2.5M</span>
                        </p> */}
                        <div className="text-[11px] mt-[10px] font-[600] flex-wrap sm:flex-nowrap flex gap-[5px] sm:justify-between">
                            {bets.map((bet: any, index: number) => (
                                <div key={index} className="flex gap-[5px] flex-nowrap overflow-auto">
                                    <button
                                        className="bg-gray-200 cursor-pointer border border-gray-400 h-[28px] pt-[3px] rounded-[4px] flex-1 min-w-[50px]"
                                        onClick={() => fn_setAmount(1000, index)}
                                    >
                                        1000
                                    </button>
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

                        <div className="flex border-t border-gray-200 my-[10px] pt-[15px]">
                            <div className="flex-1 border-e-[2px] border-gray-500 px-[5px]">
                                <p className="text-center text-[13px] font-[600] text-green-600 pt-[5px] pb-[7px]">
                                    <BsGraphUpArrow className="inline-block mt-[-3px] me-[6px]" />
                                    Winning Amount
                                    {" "}={" "}
                                    <FaIndianRupeeSign className="text-[13px] inline-block mt-[-2px]" />
                                    {bets?.[0]?.profit}
                                </p>
                            </div>
                            <div className="flex-1 px-[5px]">
                                <p className="text-center text-[13px] font-[600] text-red-500 pt-[5px] pb-[7px]">
                                    <BsGraphDownArrow className="inline-block mt-[-3px] me-[6px]" />
                                    Lossing Amount
                                    {" "}={" "}
                                    <FaIndianRupeeSign className="text-[13px] inline-block mt-[-2px]" />
                                    {bets?.[0]?.exposure}
                                </p>
                            </div>
                        </div>
                        {/* <p className="text-[14px] mt-[-4px] text-end">Plateform Charger: <span className="font-[500]">{item?.adminCommision || 0}%</span></p> */}
                    </div>
                )) : (
                    <div className="flex justify-center flex-col items-center gap-[30px] mt-[40px]">
                        <img src={emptySlip} className="h-[150px]" />
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
};

const OpenBet = ({ openBets }: any) => {
    const redisGames = useSelector((state: any) => state.redisGames);
    function formatSelectionName(name: string): string {
        return name.replace(/\s\d+$/, "");
    }
    return (
        <div className="flex bg-white p-[5px] flex-col gap-[7px] overflow-auto h-[300px]">
            {openBets?.length === 0 ? (
                <p className="text-[13px] text-gray-600">You have no matched or unmatched bets.</p>
            ) : (
                <div>
                    <table className="w-full">
                        <tr className="h-[40px] bg-gray-100 text-[13px] font-[500]">
                            <td className=""></td>
                            <td>Odds</td>
                            <td>Stake</td>
                        </tr>
                        {openBets?.map((item: any) => (
                            <tr className={`text-[13px] font-[500] border-b min-h-[45px] ${item?.side === "Back" ? "bg-[--blue]" : "bg-[--red]"}`}>
                                <td className="ps-[5px] flex items-center min-h-[45px] py-[5px]">
                                    <img alt="" src={`${URL}/${redisGames?.find((r: any) => r.id == item?.sportId).image}`} className="w-[20px] h-[20px] inline-block me-[5px]" />
                                    <p className="flex flex-col">
                                        <span className="leading-[16px]">{item?.marketName === "Tied Match" ? "Tied Match" : item?.marketName === "tied_match" ? "Tied_match" : item?.gameName.replace(/\d+$/, "")}</span>
                                        <span className="text-[11px] italic mt-[-1px]">
                                            {item?.marketId?.includes("-") ? formatSelectionName(item?.selectionName) : item?.selectionName}
                                        </span>
                                    </p>
                                </td>
                                <td className="min-w-[60px]">{item?.marketName === "fancy" ? item?.selectionName.match(/\d+(?!.*\d)/)?.[0] || item?.odd : item?.odd}</td>
                                <td className="min-w-[60px]"><FaIndianRupeeSign className="inline-block mt-[-1px] me-[2px]" />{item?.amount}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    )
};