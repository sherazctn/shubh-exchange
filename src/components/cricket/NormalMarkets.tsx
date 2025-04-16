import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { voiceLanguage } from "../../assets/data";
import { fn_calculatingBets, getOpenBetsByUserApi, marketOddsFormulation, placeBetsApi } from "../../api/api";
import { updateBets, updateBettingSlip, updatePendingBets, updateRecentExp, updateSlipTab, updateTrigger, updateWallet } from "../../features/features";

import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";

const NormalMarkets = ({ singleMarket, oddsPrice, market, webColor, matchOdds, setMatchOdds, runner, sportId, eventId, pendingBets, oneTouchEnable, trigger, oddRate, eventName }: any) => {

    const timerRef = useRef<any>();
    const dispatch = useDispatch();
    const [showAmounts, setAmount] = useState("");
    const [longPress, setLongPress] = useState(false);
    const [prevOdds, setPrevOdds] = useState<any>({});
    const wallet = useSelector((state: any) => state.wallet);
    const expCalculation = useSelector((state: any) => state.expCalculation);
    const authentication = useSelector((state: any) => state.authentication);

    const [totalCal, setTotalCal] = useState<any>(null);

    const recentExp = useSelector((state: any) => state.recentExp);

    useEffect(() => {
        if (pendingBets?.length > 0) {
            const specificMarketBets = pendingBets?.filter((bet: any) => bet?.marketId === market.marketId)
            const result: any = fn_calculatingBets(specificMarketBets);
            if (result) {
                console.log("result ", result);
                setTotalCal(result);
            }
        }
    }, [pendingBets]);

    const fn_controlOddsView = (e: any, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        const findId = matchOdds.find((m: any) => m === id);
        if (findId) {
            const updatedData = matchOdds.filter((m: any) => m !== id);
            setMatchOdds(updatedData);
        } else {
            setMatchOdds((prev: any) => ([...prev, id]));
        }
    };

    const handleBetClicked = async (e: any, odd: any, runnerId: any, side: string, selectionName: string, size: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (longPress) return;
        if (showAmounts !== "") setAmount("");
        if (!authentication) return toast.error("Login Yourself")
        if (!odd) return;
        if (odd >= 4) return toast.error("Odds above 4 not accepted");
        if (!eventName) return;
        if (oneTouchEnable) {
            dispatch(updateTrigger(trigger + 1));
            fn_immediateBet(e, odd, eventName, runnerId, side, Number(localStorage.getItem('oneTouch') || 10), selectionName);
            return;
        };
        dispatch(updateSlipTab('slip'));
        const profit = parseFloat((10 * (odd - 1)).toFixed(2));
        const loss = 10;
        const obj = {
            afterLoss: wallet - 10,
            afterWin: wallet + profit,
            amount: 10,
            stake: 10,
            eventId: eventId,
            gameId: runnerId,
            gameName: eventName,
            loss,
            marketId: singleMarket.marketId,
            marketName: singleMarket.marketName,
            odd: odd,
            profit: side === "Back" ? Number(((parseFloat(odd) - 1) * 10).toFixed(2)) : 10, //
            exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) - 1) * 10).toFixed(2)), //
            side: side,
            sportId: sportId,
            selectionName: selectionName,
            size
        };
        const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketId === market.marketId);
        const updatedCalculation = marketOddsFormulation(obj, updatedPendingBets);
        dispatch(updateRecentExp(updatedCalculation));
        const updatedBets = [obj];
        dispatch(updateBets(updatedBets));
        dispatch(updateBettingSlip("open"));
    };

    const handleStart = (e: any, selectionId: any, num: any, side: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.userSelect = 'none';
            e.currentTarget.style.webkitUserSelect = 'none';
            e.currentTarget.style.touchAction = 'none';
        }

        timerRef.current = setTimeout(() => {
            setLongPress(true);
            setAmount(`${market.marketId}-${selectionId}-${num}-${side}`);
        }, 1000);

        document.addEventListener('mouseup', handleEnd, { passive: false });
        document.addEventListener('touchend', handleEnd, { passive: false });
        document.addEventListener('touchmove', handleEnd, { passive: false });
    };

    const handleEnd = (e: any) => {
        clearTimeout(timerRef.current);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('touchmove', handleEnd);
    };

    useEffect(() => {
        if (longPress) {
            const timeout = setTimeout(() => {
                setLongPress(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [longPress]);

    const fn_immediateBet = async (e: any, odd: any, gameName: any, selectionId: any, side: any, amount: number, selectionName: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (!authentication) return toast.error("Login Yourself");
        const profit = parseFloat((amount * (odd - 1)).toFixed(2));
        const loss = amount;
        setAmount("");
        const obj = {
            afterLoss: wallet - amount,
            afterWin: wallet + profit,
            amount: amount,
            stake: amount,
            eventId: eventId,
            gameId: selectionId,
            gameName: gameName,
            loss,
            marketId: market.marketId,
            marketName: market.marketName,
            odd: odd,
            profit: side === "Back" ? Number(((parseFloat(odd) - 1) * amount).toFixed(2)) : amount,
            exposure: side === "Back" ? -amount : -Number(((parseFloat(odd) - 1) * amount).toFixed(2)),
            side: side,
            sportId: sportId,
            selectionName: selectionName
        };
        const response = await placeBetsApi([obj]);
        if (response?.status) {
            const selectedLanguage = Number(localStorage.getItem('voiceLanguage')) || 0;
            const lan = voiceLanguage[selectedLanguage];
            const msg = new SpeechSynthesisUtterance();
            msg.text = lan.line || 'Bet has been placed';
            msg.lang = lan.name || 'en';
            // window.speechSynthesis.speak(msg);
            dispatch(updateBets([]));
            if (!oneTouchEnable) dispatch(updateSlipTab("open"));
            dispatch(updateWallet(response?.wallet));
            dispatch(updateRecentExp({}));
            const res = await getOpenBetsByUserApi(null);
            if (res?.status) {
                dispatch(updatePendingBets(res?.data));
                console.log(res?.data);
            }
            return toast.success(response?.message);
        } else {
            return toast.error(response?.message);
        }
    };

    const calculatePrice = (price: any) => {
        let finalPrice = price || 0;
        let value = oddRate?.value || 0;
        let type = oddRate?.type || "";

        if (type === "percentage") {
            finalPrice -= (finalPrice * value) / 100;
        } else if (type === "number") {
            finalPrice -= value;
        }

        const fixed = finalPrice.toFixed(2);

        if (fixed === "0.00") {
            return "-";
        }

        return fixed.endsWith(".00") ? parseInt(fixed) : fixed;
    };

    const prevOddsRef = useRef<any>({});
    const currentOddsRef = useRef<any>({});

    useEffect(() => {
        if (singleMarket?.runners) {
            const updatedOdds: any = {};

            singleMarket.runners.forEach((runner: any) => {
                updatedOdds[runner.selectionId] = runner;
            });

            currentOddsRef.current = updatedOdds;

            // Delay updating prevOdds by 400ms
            const timeout = setTimeout(() => {
                prevOddsRef.current = { ...currentOddsRef.current };
            }, 400);

            return () => clearTimeout(timeout); // Cleanup on component unmount or re-run
        }
    }, [singleMarket?.runners]);

    if (singleMarket) {
        return (
            <div className="bg-white shadow-sm rounded-[7px]">
                <div
                    className="h-[47px] flex justify-between border-b cursor-pointer"
                    onClick={(e) => { fn_controlOddsView(e, singleMarket.marketId); setAmount("") }}
                >
                    <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
                        {singleMarket?.marketName}
                    </div>
                    <div className="flex gap-[7px] items-center pe-[10px]">
                        <IoIosArrowUp className={`transition-all duration-300 ${matchOdds.find((m: any) => m === singleMarket?.marketId) ? "rotate-180" : "rotate-0"}`} />
                    </div>
                </div>
                {singleMarket && singleMarket?.runners && !matchOdds.find((m: any) => m === singleMarket?.marketId) && (
                    <div>
                        <div className="min-h-[20px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-end items-center px-[4px] sm:px-[10px] border-b">
                            <div className="flex flex-row w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-end sm:justify-center items-center">
                                <div className={`h-[20px] w-full sm:w-[47px] sm:rounded-[5px] hidden sm:flex flex-col justify-between py-[6px] relative`}></div>
                                <div className={`h-[20px] w-full sm:w-[47px] sm:rounded-[5px] hidden sm:flex flex-col justify-between py-[6px] relative`}></div>
                                <div className={`h-[25px] border-[2px] border-blue-500 w-[57px] sm:w-[47px] sm:rounded-[5px] flex justify-center items-center py-[6px] relative text-[13px] font-[500] bg-[--blue]`}>
                                    Back
                                </div>
                                <div className={`h-[25px] border-[2px] border-red-500 w-[57px] sm:w-[47px] sm:rounded-[5px] flex justify-center items-center py-[6px] relative text-[13px] font-[500] bg-[--red]`}>
                                    Lay
                                </div>
                                <div className={`h-[20px] w-full sm:w-[47px] sm:rounded-[5px] hidden sm:flex flex-col justify-between py-[6px] relative`}></div>
                                <div className={`h-[20px] w-full sm:w-[47px] sm:rounded-[5px] hidden sm:flex flex-col justify-between py-[6px] relative`}></div>
                            </div>
                        </div>
                        {singleMarket?.runners?.map((item: any, index: any) => {
                            const odd = item
                            const prevOdd = item;
                            return (
                                <>
                                    <div key={index} className="min-h-[20px] py-[4px] flex flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                                        <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                                            <BsGraphUp />
                                            <p className="text-[13px] sm:text-[15px] font-[500] text-nowrap">{item?.runnerName}</p>
                                            <div className={`text-[11px] font-[600] sm:absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                                                <p>
                                                    {totalCal?.profitableRunner == item?.selectionId && totalCal?.side === "Back" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                                                    {totalCal?.profitableRunner != item?.selectionId && totalCal?.side === "Back" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                                                    {totalCal?.profitableRunner == item?.selectionId && totalCal?.side === "Lay" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                                                    {totalCal?.profitableRunner != item?.selectionId && totalCal?.side === "Lay" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                                                </p>
                                                <p>
                                                    {recentExp?.recentObjDetails?.marketId === market.marketId && recentExp?.profitableRunner == item?.selectionId && recentExp?.side === "Back" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                                                    {recentExp?.recentObjDetails?.marketId === market.marketId && recentExp?.profitableRunner != item?.selectionId && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                                                    {recentExp?.recentObjDetails?.marketId === market.marketId && recentExp?.profitableRunner == item?.selectionId && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                                                    {recentExp?.recentObjDetails?.marketId === market.marketId && recentExp?.profitableRunner != item?.selectionId && recentExp?.side === "Lay" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row w-auto sm:flex-wrap sm:gap-[11px] justify-end sm:justify-center items-center">
                                            {[2, 1, 0].map((index) => {
                                                if (window.innerWidth < 640 && index !== 0) return null;
                                                const i = odd?.ex?.availableToBack?.[index] || {};
                                                const preI = prevOdd?.ex?.availableToBack?.[index] || {};
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`h-[43px] border sm:h-[47px] w-[57px] sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                                        onClick={(e) => handleBetClicked(e, i?.price, item?.selectionId, "Back", item?.runnerName, i?.size)}
                                                        onMouseDown={(e) => handleStart(e,
                                                            item?.selectionId,
                                                            index,
                                                            'Back'
                                                        )}
                                                        onTouchStart={(e) => handleStart(e,
                                                            item?.selectionId,
                                                            index,
                                                            'Back'
                                                        )}
                                                    >
                                                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                                            {calculatePrice(i.price)}
                                                        </p>
                                                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                                            {i.size || "-"}
                                                        </p>
                                                        {showAmounts === `${market?.marketId}-${item?.selectionId}-${index}-Back` && (
                                                            <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Back",
                                                                        oddsPrice?.[0] || 1000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[0] || 1000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Back",
                                                                        oddsPrice?.[1] || 2000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[1] || 2000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Back",
                                                                        oddsPrice?.[2] || 3000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[2] || 3000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Back",
                                                                        oddsPrice?.[3] || 4000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[3] || 4000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Back",
                                                                        oddsPrice?.[4] || 5000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[4] || 5000}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            {[0, 1, 2].map((index) => {
                                                if (window.innerWidth < 640 && index !== 0) return null;
                                                const i = odd?.ex?.availableToLay?.[index] || {};
                                                const preI = prevOdd?.ex?.availableToLay?.[index] || {};
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`h-[43px] border sm:h-[47px] w-[57px] sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                                        onClick={(e) => handleBetClicked(e, i?.price, item?.selectionId, "Lay", item?.runnerName, i?.size)}
                                                        onMouseDown={(e) => handleStart(e,
                                                            item?.selectionId,
                                                            index,
                                                            'Lay'
                                                        )}
                                                        onTouchStart={(e) => handleStart(e,
                                                            item?.selectionId,
                                                            index,
                                                            'Lay'
                                                        )}
                                                    >
                                                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                                            {calculatePrice(i.price)}
                                                        </p>
                                                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                                            {i.size || "-"}
                                                        </p>
                                                        {showAmounts === `${market?.marketId}-${item?.selectionId}-${index}-Lay` && (
                                                            <div className="absolute top-[43px] sm:top-[47px] right-0 bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Lay",
                                                                        oddsPrice?.[0] || 1000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[0] || 1000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Lay",
                                                                        oddsPrice?.[1] || 2000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[1] || 2000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Lay",
                                                                        oddsPrice?.[2] || 3000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[2] || 3000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Lay",
                                                                        oddsPrice?.[3] || 4000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[3] || 4000}
                                                                </button>
                                                                <button
                                                                    style={{ backgroundColor: webColor }}
                                                                    className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                                                    onClick={(e) => fn_immediateBet(
                                                                        e,
                                                                        i?.price,
                                                                        `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`,
                                                                        item?.selectionId,
                                                                        "Lay",
                                                                        oddsPrice?.[4] || 5000,
                                                                        item?.runnerName
                                                                    )}
                                                                >
                                                                    {oddsPrice?.[4] || 5000}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default NormalMarkets;