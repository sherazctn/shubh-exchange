import { Modal } from 'antd';
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import Footer from "../footer/page";
import RightSlider from "../sports/RightSlider";
import { updateBets, updateBettingSlip, updatePendingBets, updateRecentExp, updateSlipTab, updateTrigger, updateWallet } from "../../features/features";

import { TbLadder } from "react-icons/tb";
import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { voiceLanguage } from '../../assets/data';
import { fancy_calculatingBets, fancy_marketOddsFormulation, fn_calculatingBets, fn_fancyModalCalculation, fn_getCricketScoreApi, getOpenBetsByUserApi, getUpdatedBookmaker, getUpdatedBookmaker2, getUpdatedBookmaker3, getUpdatedFancyMarket, marketOddsFormulation, placeBetsApi } from "../../api/api";

const LiveCricketLeftSection2 = ({ allEventsOdds, eventDetails, extraMarkets, markets, selectedEvent, runners, sportId, eventId }: any) => {

  const [tabs, setTabs] = useState("Main");
  const [oddsPrice, setOddsPrice] = useState([]);
  const divHeight = `${window.innerHeight - 60}px`;
  const user = useSelector((state: any) => state.user);
  const [matchOddMrId, setMatchOddMrId] = useState("");
  const [cricketScore, setCricketScore] = useState({});
  const [matchOdds, setMatchOdds] = useState<string[]>([]);

  const oddRate = useSelector((state: any) => state.oddRate);
  const fancyRate = useSelector((state: any) => state.fancyRate);
  const webColor = useSelector((state: any) => state.websiteColor);
  const pendingBets = useSelector((state: any) => state.pendingBets);
  const bookmakerRate = useSelector((state: any) => state.bookmakerRate);

  const oneTouchEnable = useSelector((state: any) => state.oneTouchEnable);
  const trigger = useSelector((state: any) => state.trigger);

  const eventDate: any = eventDetails?.date ? parseISO(eventDetails.date) : null;
  const [eventsCompleteDetail, setEventCompleteDetail] = useState<any>(null);

  const getEventDisplayText = () => {
    if (!eventDate) return '';

    const currentDate = new Date();

    if (isBefore(eventDate, currentDate)) {
      return "In Play";
    }

    if (isToday(eventDate)) {
      return `Today, ${format(eventDate, "hh:mm a")}`;
    }

    if (isTomorrow(eventDate)) {
      return `Tomorrow, ${format(eventDate, "hh:mm a")}`;
    }

    return format(eventDate, "dd MMM yyyy, hh:mm a");
  };

  const fn_getCricketScore = async () => {
    const response = await fn_getCricketScoreApi(eventId);
    if (response?.status) {
      setCricketScore(response?.data);
    }
  }

  useEffect(() => {
    if (user?.oddsPrice) {
      setOddsPrice(user?.oddsPrice || [1000, 2000, 3000, 4000, 5000]);
    }
  }, [user]);

  useEffect(() => {
    if (sportId === "4") {
      // fn_getCricketScore();
      setInterval(() => {
        // fn_getCricketScore();
      }, 1500);
    };
  }, []);

  useEffect(() => {
    setMatchOddMrId(markets?.find((m: any) => m?.marketName === "Match Odds")?.marketId);
  }, [markets]);

  useEffect(() => {
    if (allEventsOdds?.length > 0 && eventDetails?.markets) {
      const updatedMarkets = eventDetails.markets.map((market: any) => {
        const singleMarketOdds = allEventsOdds.find((m: any) => m.marketId === market.marketId);

        const updatedRunners = market.runners.map((r: any) => {
          const runnerOdds = singleMarketOdds?.runners?.find((run: any) => run.selectionId === r.selectionId);
          return {
            ...r,
            ex: runnerOdds?.ex || null,
          };
        });

        return {
          ...market,
          runners: updatedRunners,
        };
      });
      setEventCompleteDetail({ ...eventDetails, markets: updatedMarkets });
    }
  }, [allEventsOdds]);

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="sm:min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[10px] sm:p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[19px] text-center hidden sm:block">{eventDetails?.competitionName}</p>
        <p className="text-[17px] sm:text-[23px] font-[700] sm:font-[500] text-center">{eventDetails?.eventName}</p>
        <button className="live-match-btn mt-[3px] sm:mt-[10px]">{getEventDisplayText()}</button>
      </div>
      <div className="w-full mb-[10px] block lg:hidden">
        <RightSlider sportId={sportId} eventId={eventId} cricketScore={cricketScore} selectedEvent={selectedEvent} webColor={webColor} />
      </div>

      <div style={{ minHeight: `${window.innerHeight - 490}px` }}>
        <div className="flex flex-col gap-[10px]">
          {eventsCompleteDetail?.markets?.map((item: any) => {
            const filterData = null;
            if ((item?.marketName === "Match Odds" || item?.marketName === "Tied Match") && sportId == "4") return;
            return <MatchOdds singleMarket={item} oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} pendingBets={pendingBets} oneTouchEnable={oneTouchEnable} trigger={trigger} oddRate={oddRate} />
          })}
          {extraMarkets?.map((market: any) => {
            const marketType = (market?.mname === "MATCH_ODDS" || market?.mname === "Bookmaker" || market?.mname === "TIED_MATCH") ? "m1" : "m2";
            return (
              <Fancy market={market} marketType={marketType} webColor={webColor} eventId={eventId} tabs={tabs} eventName={eventDetails?.eventName} pendingBets={pendingBets} oneTouchEnable={oneTouchEnable} trigger={trigger} />
            )
          })}
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default LiveCricketLeftSection2;

const MatchOdds = ({ singleMarket, oddsPrice, market, webColor, matchOdds, setMatchOdds, runner, sportId, eventId, pendingBets, oneTouchEnable, trigger, oddRate }: any) => {

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

  const handleBetClicked = async (e: any, odd: any, runnerName: any, runnerId: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (odd >= 4) return toast.error("Odds above 4 not accepted");
    if (!runnerName) return;
    if (oneTouchEnable) {
      // dispatch(updateBettingSlip("open"));
      // dispatch(updateSlipTab("open"));
      dispatch(updateTrigger(trigger + 1));
      fn_immediateBet(e, odd, runnerName, runnerId, side, Number(localStorage.getItem('oneTouch') || 10), selectionName);
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
      gameName: runnerName,
      loss,
      marketId: market.marketId,
      marketName: market.marketName,
      odd: odd,
      profit: side === "Back" ? Number(((parseFloat(odd) - 1) * 10).toFixed(2)) : 10,
      exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) - 1) * 10).toFixed(2)),
      side: side,
      sportId: sportId,
      selectionName: selectionName
    };
    const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketId === market.marketId);
    const updatedCalculation = marketOddsFormulation(obj, updatedPendingBets);
    console.log("updatedCalculation ==> ", updatedCalculation)
    dispatch(updateRecentExp(updatedCalculation));
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  };

  const handleStart = (e: any, selectionId: any, num: any, side: any) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent default behavior like text selection or scrolling
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

  // Update odds when new data arrives
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
                            onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Back", item?.runnerName)}
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
                            onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Lay", item?.runnerName)}
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

const Fancy = ({ market, marketType, oddsPrice, webColor, eventId, tabs, setTabs, eventName, pendingBets, oneTouchEnable, trigger, fancyRate }: any) => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<any>(null);
  const [data, setData] = useState<any>([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [viewFancy, setViewFancy] = useState(true);
  const [oneTimeRendered, setOneTimeRendered] = useState(false);
  const recentExp = useSelector((state: any) => state.recentExp);
  const [selectedFancyBets, setSelectedFancyBets] = useState([]);

  const fn_closeModal = () => {
    setShowModal(false);
  };

  const fn_openModal = async (item: any) => {
    const mId = `${item?.mid}-${item?.sid}`;
    setOneTimeRendered(true);
    const checkBet = pendingBets?.filter((bet: any) => bet?.marketId == mId);
    const scores = checkBet?.map((bet: any) => {
      const selectionNameArray = bet?.selectionName.split(" ");
      const score = parseFloat(selectionNameArray?.[selectionNameArray?.length - 1]);
      return { score: score, side: bet?.side, exposure: bet?.exposure, profit: bet?.profit, stake: bet?.stake, odd: bet?.odd };
    })?.sort((a: any, b: any) => a.score - b.score);
    const data = await fn_fancyModalCalculation(scores || []) as any;
    console.log("data ", data);
    setSelectedFancyBets(data || []);
    if (checkBet?.length > 0) {
      setShowModal(true);
      // setShowModal(false);
    }
  };

  const fn_totalCal = (marketId: any): any => {
    const filteredPendingBets = pendingBets?.filter((bet: any) => bet?.marketId === marketId);
    const result: any = fancy_calculatingBets(filteredPendingBets);
    return result;
  };

  // const fn_updateFancyMarket = async () => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //   }

  //   intervalRef.current = setInterval(async () => {
  //     const response = await getUpdatedFancyMarket(eventId);
  //     if (response?.status) {
  //       if (response?.data) {
  //         const updatedBets = bets?.map((b: any) => {
  //           const singleMarket = response?.data?.find(
  //             (market: any) => `${market?.mid}-${market?.sid}` === b?.marketId
  //           );

  //           if (singleMarket && b?.marketId === `${singleMarket?.mid}-${singleMarket?.sid}`) {
  //             if (b.status !== singleMarket?.gstatus) {
  //               return { ...b, status: singleMarket?.gstatus };
  //             }
  //           }
  //           return b;
  //         });
  //         if (JSON.stringify(updatedBets) !== JSON.stringify(bets)) {
  //           dispatch(updateBets(updatedBets));
  //         }
  //         if (tabs === "Main") {
  //           // setData(response?.data?.slice(0, 5));
  //           setData(response?.data);
  //         } else {
  //           setData(response?.data);
  //         }
  //       }
  //     }
  //   }, 500);
  // };

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string, selectionName: string, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
    if (oneTouchEnable) {
      // dispatch(updateBettingSlip("open"));
      // dispatch(updateSlipTab("open"));
      dispatch(updateTrigger(trigger + 1));
      fn_immediateBet(e, Number(localStorage.getItem('oneTouch') || 10), item, odd, side, selectionName);
      return;
    };
    dispatch(updateSlipTab('slip'));
    const profit = parseFloat((10 * (odd - 1))?.toFixed(2));
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
      marketId: runnerId,
      marketName: "fancy",
      odd: parseFloat(odd),
      profit: side === "Back" ? Number(((parseFloat(odd) / 100) * 10).toFixed(2)) : 10,
      exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) / 100) * 10).toFixed(2)),
      side: side,
      sportId: "4",
      selectionName: selectionName
    };
    console.log("obj ==> ", obj);
    const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketName === "fancy" && bet?.marketId == runnerId) || [];
    console.log("updatedPendingBets ", updatedPendingBets);
    const updatedCalculation = fancy_marketOddsFormulation(obj, updatedPendingBets);
    dispatch(updateRecentExp(updatedCalculation));
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  };

  const handleStart = (e: any, item: any, num: any) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent default behavior like text selection or scrolling
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    timerRef.current = setTimeout(() => {
      setLongPress(true);
      setAmount(`${item?.mid}-${item?.sid}-${num}`);
    }, 1000);

    // Add listeners to cancel the long press if the user releases the touch or mouse early
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

  useEffect(() => {
    setTimeout(() => {
      setOneTimeRendered(false);
    }, 1000);
  }, [oneTimeRendered]);

  // useEffect(() => {
  //   if (eventId) {
  //     fn_updateFancyMarket();
  //   }
  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [eventId, tabs, bets]);

  const fn_immediateBet = async (e: React.MouseEvent, amount: number, item: any, odd: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    setAmount("");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    const obj = {
      afterLoss: wallet - amount,
      afterWin: wallet + profit,
      amount: amount,
      stake: amount,
      eventId: eventId,
      gameId: `${item?.mid}-${item?.sid}`,
      gameName: eventName,
      loss,
      marketId: `${item?.mid}-${item?.sid}`,
      marketName: "fancy",
      odd: parseFloat(odd),
      profit: side === "Back" ? Number(((parseFloat(odd) / 100) * amount).toFixed(2)) : amount,
      exposure: side === "Back" ? -amount : -Number(((parseFloat(odd) / 100) * amount).toFixed(2)),
      side: side,
      sportId: "4",
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
    let value = fancyRate?.value || 0;
    let type = fancyRate?.type || "";

    if (type === "percentage") {
      finalPrice -= (finalPrice * value) / 100;
    } else if (type === "number") {
      finalPrice -= value;
    }

    finalPrice = parseFloat(finalPrice.toFixed(2));

    if (finalPrice <= 0) {
      return "-";
    }

    return finalPrice % 1 === 0 ? finalPrice.toFixed(0) : finalPrice.toString();
  };

  const calculateSize = (price: any) => {
    let finalPrice = price || 0;
    let value = fancyRate?.value || 0;
    let type = fancyRate?.type || "";

    if (type === "percentage") {
      finalPrice -= (finalPrice * value) / 100;
    } else if (type === "number") {
      finalPrice -= value;
    }

    finalPrice = parseFloat(finalPrice.toFixed(0));

    if (finalPrice <= 0) {
      return "-";
    } else {
      return finalPrice.toFixed(0);
    }
  };

  if (market?.section?.length > 0 && marketType === "m2") {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* {showModal && <FancyModal showModal={showModal} fn_closeModal={fn_closeModal} webColor={webColor} selectedFancyBets={selectedFancyBets} />} */}
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setViewFancy(!viewFancy);
            setAmount("");
          }}
        >
          <div className="text-[--text-color] uppercase flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {market?.mname}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <div className='flex flex-col items-end gap-[3px]'>
              <p className='text-[11px] italic text-gray-600 leading-[12px]'>Min Bet: {market?.min} INR</p>
              <p className='text-[11px] italic text-gray-600 leading-[12px]'>Max Bet: {market?.max} INR</p>
            </div>
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewFancy ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
        <div>
          <div className="min-h-[20px] py-[4px] flex flex-row gap-[5px] justify-end items-center px-[4px] sm:px-[10px] border-b">
            <div className="flex flex-wrap sm:gap-[11px] justify-end sm:justify-center items-center relative">
              <div className="h-[25px] w-[57px] sm:w-[47px] border-[2px] border-red-500 sm:rounded-[5px] bg-[--red] flex justify-center items-center text-[13px] font-[500] py-[6px] cursor-pointer relative">
                No
              </div>
              <div className="h-[25px] w-[57px] border-[2px] border-blue-500 sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex justify-center items-center text-[13px] font-[500] py-[6px] cursor-pointer">
                Yes
              </div>
            </div>
          </div>
          {market?.section?.map((item: any) => {
            if (item?.gstatus !== "SUSPENDED" && item?.gstatus !== "Ball Running" && item?.gstatus !== "Starting Soon.") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto flex-1 relative">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                      <p>
                        {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                        {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:gap-[11px] justify-end sm:justify-center items-center relative">
                    {/* lay odd */}
                    <div
                      className="h-[43px] sm:h-[47px] w-[57px] sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                      onClick={(e) => handleBetClicked(e, item?.ls1, `${item?.nat} ${item?.l1}`, `${item?.mid}-${item?.sid}`, "Lay", `${item?.nat} ${item?.l1}`, item)}
                      onMouseDown={(e) => handleStart(e, item, '1')}
                      onTouchStart={(e) => handleStart(e, item, '1')}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {calculatePrice(item?.odds?.find((i: any) => i?.oname === "lay1")?.odds)}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {calculateSize(item?.odds?.find((i: any) => i?.oname === "lay1")?.size)}
                      </p>
                      {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                        <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[0] || 1000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[1] || 2000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[2] || 3000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[3] || 4000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[4] || 5000}</button>
                        </div>
                      )}
                    </div>
                    {/* back odd */}
                    <div
                      className="h-[43px] sm:h-[47px] w-[57px] border sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.bs1, `${item?.nat} ${item?.b1}`, `${item?.mid}-${item?.sid}`, "Back", `${item?.nat} ${item?.b1}`, item)}
                      onMouseDown={(e) => handleStart(e, item, '2')}
                      onTouchStart={(e) => handleStart(e, item, '2')}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {calculatePrice(item?.odds?.find((i: any) => i?.oname === "back1")?.odds)}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {calculateSize(item?.odds?.find((i: any) => i?.oname === "back1")?.size)}
                      </p>
                      {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                        <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.bs1, "Back", `${item?.nat} ${item?.b1}`)}>{oddsPrice?.[0] || 1000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.bs1, "Back", `${item?.nat} ${item?.b1}`)}>{oddsPrice?.[1] || 2000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.bs1, "Back", `${item?.nat} ${item?.b1}`)}>{oddsPrice?.[2] || 3000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.bs1, "Back", `${item?.nat} ${item?.b1}`)}>{oddsPrice?.[3] || 4000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.bs1, "Back", `${item?.nat} ${item?.b1}`)}>{oddsPrice?.[4] || 5000}</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "SUSPENDED") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      SUSPENDED
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "Ball Running") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      Ball Running
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "Starting Soon.") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[12px] flex justify-center items-center">
                      Starting Soon.
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  } else if (market?.section?.length > 0 && marketType === "m1") {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setAmount("");
          }}
        >
          <div className="text-[--text-color] uppercase flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {market?.mname}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <div className='flex flex-col items-end gap-[3px]'>
              <p className='text-[11px] italic text-gray-600 leading-[12px]'>Min Bet: {market?.min} INR</p>
              <p className='text-[11px] italic text-gray-600 leading-[12px]'>Max Bet: {market?.max} INR</p>
            </div>
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewFancy ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
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
          {market?.section?.map((item: any) => {
            if (item?.gstatus !== "SUSPENDED" && item?.gstatus !== "Ball Running" && item?.gstatus !== "Starting Soon.") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto flex-1 relative">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                      <p>
                        {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                        {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:gap-[11px] justify-end sm:justify-center items-center relative">
                    {item?.odds?.map((i: any) => (
                      <div
                        className={`h-[43px] sm:h-[47px] w-[57px] sm:w-[47px] border sm:rounded-[5px] flex flex-col justify-between py-[6px] cursor-pointer relative ${i?.otype === "back" ? "bg-[--blue]" : "bg-[--red]"}`}
                        onClick={(e) => handleBetClicked(e, item?.ls1, `${item?.nat} ${item?.l1}`, `${item?.mid}-${item?.sid}`, "Lay", `${item?.nat} ${item?.l1}`, item)}
                        onMouseDown={(e) => handleStart(e, item, '1')}
                        onTouchStart={(e) => handleStart(e, item, '1')}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          {calculatePrice(i?.odds)}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          {calculateSize(i?.size)}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[0] || 1000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[1] || 2000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[2] || 3000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[3] || 4000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.ls1, "Lay", `${item?.nat} ${item?.l1}`)}>{oddsPrice?.[4] || 5000}</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            } else if (item?.gstatus === "SUSPENDED") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      SUSPENDED
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "Ball Running") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                      <p>
                        <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      Ball Running
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "Starting Soon.") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[4px] sm:px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[13px] sm:text-[15px] font-[500] cursor-pointer capitalize" onClick={() => fn_openModal(item)}>{item?.nat}</p>
                    {pendingBets?.find((pb: any) => pb?.marketId == `${item?.mid}-${item?.sid}`) && <TbLadder className='cursor-pointer' onClick={() => fn_openModal(item)} />}
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                    <div className="h-[25px] rounded-[7px] w-[105px] bg-[--suspended-odds-dark] mt-[2px] absolute text-white font-[500] text-[12px] flex justify-center items-center">
                      Starting Soon.
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

