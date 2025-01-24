import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import Footer from "../footer/page";
import RightSlider from "../sports/RightSlider";
import { updateBets, updateBettingSlip, updateRecentExp, updateSlipTab, updateWallet } from "../../features/features";

import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { fancy_calculatingBets, fancy_marketOddsFormulation, fn_calculatingBets, fn_getCricketScoreApi, getUpdatedBookmaker, getUpdatedBookmaker2, getUpdatedBookmaker3, getUpdatedFancyMarket, marketOddsFormulation, placeBetsApi } from "../../api/api";

const LiveCricketLeftSection = ({ extraMarkets, markets, selectedEvent, runners, sportId, eventId }: any) => {

  const [tabs, setTabs] = useState("Main");
  const [oddsPrice, setOddsPrice] = useState([]);
  const divHeight = `${window.innerHeight - 60}px`;
  const user = useSelector((state: any) => state.user);
  const [cricketScore, setCricketScore] = useState({});
  const [matchOdds, setMatchOdds] = useState<string[]>([]);

  const webColor = useSelector((state: any) => state.websiteColor);
  const pendingBets = useSelector((state: any) => state.pendingBets);

  const eventDate: any = selectedEvent?.date ? parseISO(selectedEvent.date) : null;

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
      fn_getCricketScore();
      setInterval(() => {
        fn_getCricketScore();
      }, 1500);
    }
  }, []);

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="sm:min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[10px] sm:p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[19px] text-center hidden sm:block">{selectedEvent?.competitionName}</p>
        <p className="text-[17px] sm:text-[23px] font-[700] sm:font-[500] text-center">{selectedEvent?.eventName}</p>
        <button className="live-match-btn mt-[3px] sm:mt-[10px]">{getEventDisplayText()}</button>
      </div>
      <div className="w-full mb-[10px] block lg:hidden">
        <RightSlider sportId={sportId} eventId={eventId} cricketScore={cricketScore} selectedEvent={selectedEvent} />
      </div>
      {/* tabs */}
      {/* <div className="flex gap-[10px] overflow-auto mb-[10px]">
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[max-content] px-[15px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "Main" ? `text-[--text-color]` : ""
            }`}
          style={{ backgroundColor: tabs === "Main" ? webColor : "white" }}
          onClick={() => setTabs("Main")}
        >
          Main Markets
        </div>
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[max-content] px-[15px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "Match Odds" ? `text-[--text-color]` : ""
            }`}
          style={{ backgroundColor: tabs === "Match Odds" ? webColor : "white" }}
          onClick={() => setTabs("Match Odds")}
        >
          Match Odds
        </div>
        {sportId == 4 && (
          <div
            className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[max-content] px-[15px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "fancy" ? `text-[--text-color]` : ""
              }`}
            style={{ backgroundColor: tabs === "fancy" ? webColor : "white" }}
            onClick={() => setTabs("fancy")}
          >
            Fancy
          </div>
        )}
        <div
          className={`h-[47px] pt-[1px] text-center text-nowrap rounded-[7px] text-[14px] min-w-[max-content]   flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "others" ? `text-[--text-color]` : ""
            }`}
          style={{ backgroundColor: tabs === "others" ? webColor : "white" }}
          onClick={() => setTabs("others")}
        >
          Other Markets
        </div>
      </div> */}
      <div style={{ minHeight: `${window.innerHeight - 490}px` }}>
        <div className="flex flex-col gap-[10px]">
          {markets?.map((item: any) => {
            const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
            if (item?.marketName === "Tied Match") return;
            return <MatchOdds oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} pendingBets={pendingBets} />
            if (tabs === "Main") {
              const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
              if (item?.marketName !== "Match Odds" && item?.marketName !== "Tied Match") return;
              return (
                <MatchOdds oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
              )
            } else if (tabs === "Match Odds") {
              const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
              if (item?.marketName !== "Match Odds") return;
              return (
                <MatchOdds oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
              )
            } else {
              const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
              if (item?.marketName === "Match Odds") return;
              if (item?.marketName === "Tied Match") return;
              return (
                <MatchOdds oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
              )
            }
          })}
          {tabs === "Main" && (
            <>
              <Bookmaker oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} pendingBets={pendingBets} />
              <Bookmaker2 oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} eventName={selectedEvent?.eventName} pendingBets={pendingBets} />
              <Bookmaker3 oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} eventName={selectedEvent?.eventName} pendingBets={pendingBets} />
            </>
          )}
          {(tabs === "Main" || tabs === "fancy") && (
            <>
              <Fancy oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} tabs={tabs} setTabs={setTabs} eventName={selectedEvent?.eventName} pendingBets={pendingBets} />
            </>
          )}
          {tabs === "Main" && Object.keys(extraMarkets)?.length > 0 && (
            <ExtraMarkets oddsPrice={oddsPrice} data={extraMarkets} webColor={webColor} eventId={eventId} eventName={selectedEvent?.eventName} />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] mt-[10px]">
          {tabs === "Main" && Object.keys(extraMarkets)?.length > 0 && (
            <ExtraMarkets2 oddsPrice={oddsPrice} data={extraMarkets} webColor={webColor} eventId={eventId} eventName={selectedEvent?.eventName} />
          )}
        </div>
        {/* {tabs === "all" && (
          <TiedMatch tiedMatch={tiedMatch} setTiedMatch={setTiedMatch} webColor={webColor} drawMatchData={drawMatchData} />
        )} */}
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default LiveCricketLeftSection;

const MatchOdds = ({ oddsPrice, market, webColor, matchOdds, setMatchOdds, runner, sportId, eventId, pendingBets }: any) => {
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
    if (Object.keys(market)?.length > 0 && Object.keys(prevOdds)?.length === 0) {
      setPrevOdds(market);
    } else {
      setTimeout(() => {
        setPrevOdds(market);
      }, 400);
    }
  }, [market]);

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
    }
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
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - amount,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: selectionId,
      gameName: gameName,
      loss,
      marketId: market.marketId,
      marketName: market.marketName,
      odd: odd,
      profit,
      side: side,
      sportId: sportId,
      selectionName: selectionName
    }
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  if (market.odds) {
    return (
      <div key={market.marketId} className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={(e) => { fn_controlOddsView(e, market.marketId); setAmount("") }}
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {market.marketName}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp className={`transition-all duration-300 ${matchOdds.find((m: any) => m === market.marketId) ? "rotate-180" : "rotate-0"}`} />
          </div>
        </div>
        {runner && market.odds && !matchOdds.find((m: any) => m === market.marketId) && (
          <div>
            {runner.runners?.map((item: any, index: any) => {
              const odd = market.odds.runners.find((run: any) => run.selectionId === item?.selectionId);
              const prevOdd = prevOdds?.odds?.runners?.find((run: any) => run?.selectionId === item?.selectionId);
              return (
                <div key={index} className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                    <BsGraphUp />
                    <p className="text-[13px] sm:text-[15px] font-[500]">{item?.runnerName}</p>
                    <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
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
                  <div className="flex flex-row w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-center items-center">
                    {[2, 1, 0].map((index) => {
                      const i = odd?.ex?.availableToBack?.[index] || {};
                      const preI = prevOdd?.ex?.availableToBack?.[index] || {};
                      return (
                        <div
                          key={index}
                          className={`h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
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
                            {i.price || "-"}
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
                      const i = odd?.ex?.availableToLay?.[index] || {};
                      const preI = prevOdd?.ex?.availableToLay?.[index] || {};
                      return (
                        <div
                          key={index}
                          className={`h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
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
                            {i.price || "-"}
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

const Bookmaker = ({ oddsPrice, webColor, eventId, pendingBets }: any) => {
  const timerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [tiedData, setTiedData] = useState([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [totalCal, setTotalCal] = useState<any>(null);
  const [viewBookmaker, setViewBookmaker] = useState(true);
  const recentExp = useSelector((state: any) => state.recentExp);

  useEffect(() => {
    if (pendingBets?.length > 0) {
      const specificMarketBets = pendingBets?.filter((bet: any) => bet?.marketName === "bookmaker");
      const result: any = fn_calculatingBets(specificMarketBets);
      if (result) {
        console.log("result ", result);
        setTotalCal(result);
      }
    }
  }, [pendingBets]);

  const fn_updateBookmaker = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      const response = await getUpdatedBookmaker(eventId);
      if (response?.status && response?.data?.bookmakersData) {
        const { bm1, bm2 } = response?.data?.bookmakersData;

        if (bets?.length > 0) {
          const updatedBets = bets.map((b: any) => {
            const singleMarket = bm1?.find((market: any) => `${market?.mid}-${market?.sid}` === b?.marketId);

            if (singleMarket && b?.marketId === `${singleMarket?.mid}-${singleMarket?.sid}`) {
              if (b?.status !== singleMarket?.s) {
                return { ...b, status: singleMarket?.s };
              }
            }
            return b;
          });

          if (JSON.stringify(updatedBets) !== JSON.stringify(bets)) {
            dispatch(updateBets(updatedBets));
          }
        }

        if (JSON.stringify(data) !== JSON.stringify(bm1)) {
          setData(bm1?.length > 0 ? bm1 : []);
        }
        if (JSON.stringify(tiedData) !== JSON.stringify(bm2)) {
          setTiedData(bm2?.length > 0 ? bm2 : []);
        }
      }
    }, 500);
  };

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
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
      gameName: runnerName,
      loss,
      marketId: runnerId,
      marketName: "bookmaker",
      odd: parseFloat(odd),
      profit: side === "Back" ? Number(((parseFloat(odd) / 100) * 10).toFixed(2)) : 10,
      exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) / 100) * 10).toFixed(2)),
      side: side,
      sportId: "4",
    };
    console.log("obj ==> ", obj);
    const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketName === "bookmaker");
    const updatedCalculation = marketOddsFormulation(obj, updatedPendingBets);
    console.log("updatedCalculation ==> ", updatedCalculation);
    dispatch(updateRecentExp(updatedCalculation));
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleStart = (e: any, selectionId: any, num: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    timerRef.current = setTimeout(() => {
      setLongPress(true);
      setAmount(`${selectionId}-${num}`);
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

  const fn_immediateBet = async (e: any, odd: any, gameName: any, selectionId: any, side: any, amount: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - amount,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: selectionId,
      gameName: gameName,
      loss,
      marketId: selectionId,
      marketName: "bookmaker",
      odd: odd,
      profit,
      side: side,
      sportId: "4"
    }
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  useEffect(() => {
    if (eventId) {
      fn_updateBookmaker();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eventId, bets]);

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setViewBookmaker(!viewBookmaker);
            setAmount("")
          }}
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            BOOKMAKER
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div> */}
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewBookmaker ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
        {viewBookmaker && (
          <div>
            {data?.map((item: any) => {
              if (item?.s === "ACTIVE") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Back" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Back" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Lay" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Lay" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                        </p>
                        <p>
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Back" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Lay" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-center items-center">
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>

                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back")}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.b1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.bs1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[0] || 1000
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[1] || 2000
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[2] || 3000
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[3] || 4000
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[4] || 5000
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay")}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.l1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.ls1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                          <div className="absolute top-[43px] sm:top-[47px] right-0 bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[0] || 1000
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[1] || 2000
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[2] || 3000
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[3] || 4000
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[4] || 5000
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
              } else {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                        SUSPENDED
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const Bookmaker2 = ({ oddsPrice, webColor, eventId, eventName, pendingBets }: any) => {
  const timerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [totalCal, setTotalCal] = useState<any>(null);
  const [viewBookmaker, setViewBookmaker] = useState(true);
  const recentExp = useSelector((state: any) => state.recentExp);

  useEffect(() => {
    if (pendingBets?.length > 0) {
      const specificMarketBets = pendingBets?.filter((bet: any) => bet?.marketName === "Tied Match" && bet?.marketId?.includes("-"));
      const result: any = fn_calculatingBets(specificMarketBets);
      if (result) {
        console.log("result ", result);
        setTotalCal(result);
      }
    }
  }, [pendingBets]);

  const fn_updateBookmaker = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      const response = await getUpdatedBookmaker2(eventId);
      if (response?.status && response?.data) {
        setData(response?.data?.length > 0 ? response?.data : []);
      }
    }, 500);
  };

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
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
      marketName: data?.[0]?.mname.toLowerCase() === "bookmaker" ? "bookmaker 2" : data?.[0]?.mname,
      odd: parseFloat(odd),
      profit: side === "Back" ? Number(((parseFloat(odd) / 100) * 10).toFixed(2)) : 10,
      exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) / 100) * 10).toFixed(2)),
      side: side,
      sportId: "4",
      selectionName: selectionName
    };
    console.log("obj ==> ", obj);
    const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketName === "Tied Match" && bet?.marketId?.includes("-"));
    const updatedCalculation = marketOddsFormulation(obj, updatedPendingBets);
    console.log("updatedCalculation ==> ", updatedCalculation);
    dispatch(updateRecentExp(updatedCalculation));
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleStart = (e: any, selectionId: any, num: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    timerRef.current = setTimeout(() => {
      setLongPress(true);
      setAmount(`${selectionId}-${num}`);
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
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - amount,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: selectionId,
      gameName: eventName,
      loss,
      marketId: selectionId,
      marketName: "bookmaker",
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: selectionName
    }
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  useEffect(() => {
    if (eventId) {
      fn_updateBookmaker();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eventId, bets]);

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setViewBookmaker(!viewBookmaker);
            setAmount("")
          }}
        >
          <div className="text-[--text-color] flex justify-center items-center capitalize rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {data?.[0]?.mname === "Bookmaker" ? "Bookmaker 2" : data?.[0]?.mname}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div> */}
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewBookmaker ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
        {viewBookmaker && (
          <div>
            {data?.map((item: any) => {
              if (item?.s === "ACTIVE") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Back" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Back" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Lay" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Lay" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                        </p>
                        <p>
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Back" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Lay" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-center items-center">
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>

                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", item?.nat)}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.b1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.bs1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[0] || 1000, item?.nat
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[1] || 2000, item?.nat
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[2] || 3000, item?.nat
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[3] || 4000, item?.nat
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[4] || 5000, item?.nat
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", item?.nat)}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.l1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.ls1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                          <div className="absolute top-[43px] sm:top-[47px] right-0 bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[0] || 1000, item?.nat
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[1] || 2000, item?.nat
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[2] || 3000, item?.nat
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[3] || 4000, item?.nat
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[4] || 5000, item?.nat
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
              } else {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Back" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Back" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Lay" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Lay" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                        </p>
                        <p>
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Back" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Lay" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                        SUSPENDED
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const Bookmaker3 = ({ oddsPrice, webColor, eventId, pendingBets }: any) => {
  const timerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [totalCal, setTotalCal] = useState<any>(null);
  const [viewBookmaker, setViewBookmaker] = useState(true);
  const recentExp = useSelector((state: any) => state.recentExp);

  useEffect(() => {
    if (pendingBets?.length > 0) {
      const specificMarketBets = pendingBets?.filter((bet: any) => bet?.marketName === "Tied Match" && bet?.marketId?.includes("-"));
      const result: any = fn_calculatingBets(specificMarketBets);
      if (result) {
        console.log("result ", result);
        setTotalCal(result);
      }
    }
  }, [pendingBets]);

  const fn_updateBookmaker = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      const response = await getUpdatedBookmaker3(eventId);
      if (response?.status && response?.data) {
        setData(response?.data?.length > 0 ? response?.data : []);
      }
    }, 500);
  };

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
    dispatch(updateSlipTab('slip'));
    const profit = parseFloat((10 * (odd - 1))?.toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: runnerId,
      gameName: runnerName,
      loss,
      marketId: runnerId,
      marketName: data?.[0]?.mname.toLowerCase() === "bookmaker" ? "bookmaker 2" : data?.[0]?.mname,
      odd: odd,
      profit: side === "Back" ? Number(((parseFloat(odd) / 100) * 10).toFixed(2)) : 10,
      exposure: side === "Back" ? -10 : -Number(((parseFloat(odd) / 100) * 10).toFixed(2)),
      side: side,
      sportId: "4",
      selectionName: selectionName,
      stake: 10
    }
    console.log("obj ==> ", obj);
    const updatedPendingBets = pendingBets?.filter((bet: any) => bet?.marketName === "Tied Match" || (bet?.marketId?.includes("-") && bet?.marketName != "fancy"));
    const updatedCalculation = marketOddsFormulation(obj, updatedPendingBets);
    console.log("updatedCalculation ==> ", updatedCalculation);
    dispatch(updateRecentExp(updatedCalculation));
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleStart = (e: any, selectionId: any, num: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    timerRef.current = setTimeout(() => {
      setLongPress(true);
      setAmount(`${selectionId}-${num}`);
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

  const fn_immediateBet = async (e: any, odd: any, gameName: any, selectionId: any, side: any, amount: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - amount,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: selectionId,
      gameName: gameName,
      loss,
      marketId: selectionId,
      marketName: data?.[0]?.mname.toLowerCase() === "bookmaker" ? "bookmaker 2" : data?.[0]?.mname,
      odd: odd,
      profit,
      side: side,
      sportId: "4"
    }
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  useEffect(() => {
    if (eventId) {
      fn_updateBookmaker();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eventId, bets]);

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setViewBookmaker(!viewBookmaker);
            setAmount("")
          }}
        >
          <div className="text-[--text-color] flex justify-center items-center capitalize rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {data?.[0]?.mname === "Bookmaker" ? "Bookmaker 2" : data?.[0]?.mname}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div> */}
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewBookmaker ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
        {viewBookmaker && (
          <div>
            {data?.map((item: any) => {
              if (item?.s === "ACTIVE") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Back" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Back" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] == item?.sid && totalCal?.side === "Lay" && (<span className="text-red-600">{totalCal?.totalExp}</span>)}
                          {totalCal?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && totalCal?.profitableRunner?.split("-")?.[1] != item?.sid && totalCal?.side === "Lay" && (<span className="text-green-600">{totalCal?.totalProfit}</span>)}
                        </p>
                        <p>
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Back" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] == item?.sid && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId?.split("-")?.[0] == item?.mid && recentExp?.profitableRunner?.split("-")?.[1] != item?.sid && recentExp?.side === "Lay" && (<span className="text-green-600">{recentExp?.totalProfit}</span>)}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-center items-center">
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>

                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", item?.nat)}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          1
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.b1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.bs1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[0] || 1000
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[1] || 2000
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[2] || 3000
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[3] || 4000
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back", oddsPrice?.[4] || 5000
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] relative cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", item?.net)}
                        onMouseDown={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                        onTouchStart={(e) => handleStart(e,
                          `${item?.mid}-${item?.sid}`,
                          2
                        )}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                          {item?.l1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                          {item?.ls1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                          <div className="absolute top-[43px] sm:top-[47px] right-0 bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[0] || 1000
                              )}
                            >
                              {oddsPrice?.[0] || 1000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[1] || 2000
                              )}
                            >
                              {oddsPrice?.[1] || 2000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[2] || 3000
                              )}
                            >
                              {oddsPrice?.[2] || 3000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[3] || 4000
                              )}
                            >
                              {oddsPrice?.[3] || 4000}
                            </button>
                            <button
                              style={{ backgroundColor: webColor }}
                              className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                              onClick={(e) => fn_immediateBet(
                                e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay", oddsPrice?.[4] || 5000
                              )}
                            >
                              {oddsPrice?.[4] || 5000}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          -
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          -
                        </p>
                      </div>
                      <div className="h-[43px] border sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
              } else {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                        SUSPENDED
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                      <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]"></p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]"></p>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const Fancy = ({ oddsPrice, webColor, eventId, tabs, setTabs, eventName, pendingBets }: any) => {
  const dispatch = useDispatch();
  const timerRef = useRef<any>(null);
  const [data, setData] = useState<any>([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [viewFancy, setViewFancy] = useState(true);
  const recentExp = useSelector((state: any) => state.recentExp);

  const fn_totalCal = (marketId: any): any => {
    const filteredPendingBets = pendingBets?.filter((bet: any) => bet?.marketId === marketId);
    const result: any = fancy_calculatingBets(filteredPendingBets);
    return result;
  };

  const fn_updateFancyMarket = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
      const response = await getUpdatedFancyMarket(eventId);
      if (response?.status) {
        if (response?.data) {
          const updatedBets = bets?.map((b: any) => {
            const singleMarket = response?.data?.find(
              (market: any) => `${market?.mid}-${market?.sid}` === b?.marketId
            );

            if (singleMarket && b?.marketId === `${singleMarket?.mid}-${singleMarket?.sid}`) {
              if (b.status !== singleMarket?.gstatus) {
                return { ...b, status: singleMarket?.gstatus };
              }
            }
            return b;
          });
          if (JSON.stringify(updatedBets) !== JSON.stringify(bets)) {
            dispatch(updateBets(updatedBets));
          }
          if (tabs === "Main") {
            // setData(response?.data?.slice(0, 5));
            setData(response?.data);
          } else {
            setData(response?.data);
          }
        }
      }
    }, 500);
  };

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
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
    if (eventId) {
      fn_updateFancyMarket();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [eventId, tabs, bets]);

  const fn_immediateBet = async (e: React.MouseEvent, amount: number, item: any, odd: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: `${item?.mid}-${item?.sid}`,
      gameName: eventName,
      loss,
      marketId: `${item?.mid}-${item?.sid}`,
      marketName: "fancy",
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: selectionName
    };
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  };

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={() => {
            setViewFancy(!viewFancy);
            setAmount("");
          }}
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            FANCY MARKET
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300 ${viewFancy ? "rotate-0" : "rotate-180"}`}
            />
          </div>
        </div>
        {/* content */}
        {viewFancy && (
          <div>
            {data?.map((item: any) => {
              if (item?.gstatus !== "SUSPENDED" && item?.gstatus !== "Ball Running" && item?.gstatus !== "Starting Soon.") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto flex-1 relative">
                      <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                          {/* {fn_totalCal(`${item?.mid}-${item?.sid}`)?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && fn_totalCal(`${item?.mid}-${item?.sid}`)?.side === "Back" && (<span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>)}
                          {fn_totalCal(`${item?.mid}-${item?.sid}`)?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && fn_totalCal(`${item?.mid}-${item?.sid}`)?.side === "Lay" && (<span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>)} */}
                        </p>
                        <p>
                          {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Back" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                          {recentExp?.recentObjDetails?.marketId == `${item?.mid}-${item?.sid}` && recentExp?.side === "Lay" && (<span className="text-red-600">{recentExp?.totalExp}</span>)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap sm:gap-[11px] justify-center items-center relative">
                      {/* lay odd */}
                      <div
                        className="h-[43px] sm:h-[47px] w-[55px] sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                        onClick={(e) => handleBetClicked(e, item?.ls1, item?.nat, `${item?.mid}-${item?.sid}`, "Lay", `${item?.nat} ${item?.l1}`)}
                        onMouseDown={(e) => handleStart(e, item, '1')}
                        onTouchStart={(e) => handleStart(e, item, '1')}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          {item?.l1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          {item?.ls1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l1, "Lay", item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l1, "Lay", item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l1, "Lay", item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l1, "Lay", item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l1, "Lay", item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                          </div>
                        )}
                      </div>
                      {/* back odd */}
                      <div
                        className="h-[43px] sm:h-[47px] w-[55px] border sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                        onClick={(e) => handleBetClicked(e, item?.bs1, `${item?.nat} ${item?.l1}`, `${item?.mid}-${item?.sid}`, "Back", `${item?.nat} ${item?.l1}`)}
                        onMouseDown={(e) => handleStart(e, item, '2')}
                        onTouchStart={(e) => handleStart(e, item, '2')}
                      >
                        <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                          {item?.b1}
                        </p>
                        <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                          {item?.bs1}
                        </p>
                        {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                          <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b1, "Back", item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b1, "Back", item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b1, "Back", item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b1, "Back", item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                            <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b1, "Back", item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                          </div>
                        )}
                      </div>
                      {/* range */}
                      <div className="h-[43px] ms-[7px] sm:ms-0 flex flex-col justify-end lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                        <p className="text-[11px]">Min Bet: {item?.min}.00 INR</p>
                        <p className="text-[11px]">Max Bet: {item?.max}.00 INR</p>
                      </div>
                    </div>
                  </div>
                )
              } else if (item?.gstatus === "SUSPENDED") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] mt-[2px] ml-[-50px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                      <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]"></div>
                    </div>
                  </div>
                )
              } else if (item?.gstatus === "Ball Running") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto relative flex-1">
                      <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                      <div className={`text-[11px] font-[600] absolute left-0 bottom-[-15px] w-full flex flex-row justify-between`}>
                        <p>
                          <span className="text-red-600">{fn_totalCal(`${item?.mid}-${item?.sid}`)?.totalExp}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] mt-[2px] ml-[-50px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                      <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]"></div>
                    </div>
                  </div>
                )
              } else if (item?.gstatus === "Starting Soon.") {
                return (
                  <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                    <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                      <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                    </div>
                    <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                      <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] mt-[2px] ml-[-50px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                      <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]"></div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        )}
        {/* {tabs === "Main" && (
          <p
            className="px-[10px] py-[3px] text-[14px] font-[500] hover:underline cursor-pointer w-[max-content]"
            onClick={() => setTabs("fancy")}
          >
            See More
          </p>
        )} */}
      </div>
    );
  } else {
    return null;
  }
};

const ExtraMarkets = ({ oddsPrice, data, webColor, eventId, eventName }: any) => {
  const dispatch = useDispatch();
  const timerRef = useRef<any>(null);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [hideMarkets, setHideMarkets] = useState<string[]>([]);

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, marketName: any, side: string, selectionName: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
    dispatch(updateSlipTab('slip'));
    const profit = parseFloat((10 * (odd - 1))?.toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: runnerId,
      gameName: eventName,
      loss,
      marketId: runnerId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: selectionName
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

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

  const fn_immediateBet = async (e: React.MouseEvent, amount: number, item: any, odd: any, side: string, marketName: any, runnerName: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: `${item?.mid}-${item?.sid}`,
      gameName: eventName,
      loss,
      marketId: `${item?.mid}-${item?.sid}`,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: runnerName
    };
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  const fn_controlMarketView = (marketName: string) => {
    console.log("marketName ", marketName);
    const findMarket = hideMarkets?.find((m) => m === marketName);
    if (findMarket) {
      const filterRemaining = hideMarkets?.filter((m) => m !== marketName);
      setHideMarkets(filterRemaining);
    } else {
      hideMarkets.push(marketName);
    }
  }

  if (Object.keys(data)?.length > 0) {
    return (
      <>
        {Object.keys(data)?.map((singleExtraMarket: any, index: number) => {
          if (data[singleExtraMarket]?.[0]?.gtype === "cricketcasino") return;
          return (
            <div key={index} className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
              {/* header */}
              <div
                className="h-[47px] flex justify-between border-b cursor-pointer"
                onClick={() => fn_controlMarketView(singleExtraMarket)}
              >
                <div className="text-[--text-color] uppercase flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
                  {singleExtraMarket}
                </div>
                <div className="flex gap-[7px] items-center pe-[10px]">
                  {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
                  <img alt="cashout" src={cashoutImg} className="w-[20px]" />
                  CashOut
                </div> */}
                  <HiMiniInformationCircle className="text-[20px]" />
                  <IoIosArrowUp
                    className={`transition-all duration-300 ${hideMarkets?.find((m) => m === singleExtraMarket) ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
              </div>
              {/* content */}
              {!hideMarkets?.find((m) => m === singleExtraMarket) && (
                <div>
                  {/* <div className={`${data[singleExtraMarket]?.length > 10 && singleExtraMarket === "cricketcasino" && "xl:grid xl:grid-flow-col xl:grid-rows-10"}`}> */}
                  {data[singleExtraMarket]?.map((item: any) => {
                    if (singleExtraMarket !== "tied_match" && item?.gtype === undefined) {
                      if (item?.gstatus?.toLowerCase() !== "suspended" && item?.gstatus !== "ball running") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap sm:gap-[11px] justify-center items-center relative">
                              {singleExtraMarket !== "cricketcasino" && (
                                <div
                                  className="h-[43px] sm:h-[47px] w-[55px] sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                  onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay", item?.nat)}
                                  onMouseDown={(e) => handleStart(e, item, '1')}
                                  onTouchStart={(e) => handleStart(e, item, '1')}
                                >
                                  <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                    {item?.l1 || "-"}
                                  </p>
                                  <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                    {item?.ls1 || "-"}
                                  </p>
                                  {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                                    <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l1, "Lay", singleExtraMarket, item?.nat,)}>{oddsPrice?.[0] || 1000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div
                                className="h-[43px] sm:h-[47px] w-[55px] sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                                onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '2')}
                                onTouchStart={(e) => handleStart(e, item, '2')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                  {item?.b1 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {item?.bs1 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>

                              <div className="h-[43px] ms-[7px] sm:ms-0 flex flex-col justify-end lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                                <p className="text-[11px]">Min Bet: {item?.min}.00 INR</p>
                                <p className="text-[11px]">Max Bet: {item?.max}.00 INR</p>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (item?.gstatus?.toLowerCase() === "suspended") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-30px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      } else if (item?.gstatus?.toLowerCase() === "ball running") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-20px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      }
                    } else if (singleExtraMarket === "tied_match") {
                      if (item?.mstatus?.toLowerCase() !== "suspended" && item?.mstatus !== "ball running") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex w-full sm:w-auto sm:flex-wrap sm:gap-[11px] justify-center items-center">
                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.b3, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '1')}
                                onTouchStart={(e) => handleStart(e, item, '1')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                  {item?.b3 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {item?.bs3 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>
                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.b2, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '2')}
                                onTouchStart={(e) => handleStart(e, item, '2')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                  {item?.b2 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {item?.bs2 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>

                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '3')}
                                onTouchStart={(e) => handleStart(e, item, '3')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                                  {item?.b1 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                                  {item?.bs1 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-3` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>
                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '4')}
                                onTouchStart={(e) => handleStart(e, item, '4')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                                  {item?.l1 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                                  {item?.ls1 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-4` && (
                                  <div className="absolute top-[43px] right-0 sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>

                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.l2, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '5')}
                                onTouchStart={(e) => handleStart(e, item, '5')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                  {item?.l2 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {item?.ls2 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-5` && (
                                  <div className="absolute top-[43px] right-0 sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l2, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>
                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] border sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                                onClick={(e) => handleBetClicked(e, item?.l3, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay", item?.nat)}
                                onMouseDown={(e) => handleStart(e, item, '6')}
                                onTouchStart={(e) => handleStart(e, item, '6')}
                              >
                                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                  {item?.l3 || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {item?.ls3 || "-"}
                                </p>
                                {showAmounts === `${item?.mid}-${item?.sid}-6` && (
                                  <div className="absolute top-[43px] right-0 sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                    <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l3, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      } else if (item?.mstatus?.toLowerCase() === "suspended") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-30px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      } else if (item?.mstatus?.toLowerCase() === "ball running") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-20px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      }
                    } else {
                      if (item?.status?.toLowerCase() !== "suspended" && item?.status !== "ball running") {
                        return (
                          item?.section?.map((i: any) => (
                            <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                              <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                                <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{i?.nat}</p>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex flex-wrap sm:gap-[11px] justify-center items-center relative">
                                  <div
                                    className="h-[43px] sm:h-[47px] w-[55px] sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                                    onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back", item?.nat)}
                                    onMouseDown={(e) => handleStart(e, item, i?.sid)}
                                    onTouchStart={(e) => handleStart(e, item, i?.sid)}
                                  >
                                    <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                      {i?.odds?.[0]?.odds}
                                    </p>
                                    <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                      {i?.odds?.[0]?.size}
                                    </p>
                                    {showAmounts === `${item?.mid}-${i?.sid}` && (
                                      <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                        <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                        <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                        <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                        <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                        <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b1, "Back", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                      </div>
                                    )}
                                  </div>

                                  <div className="h-[43px] ms-[7px] sm:ms-0 flex flex-col justify-end lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                                    <p className="text-[11px]">Min Bet: {i?.min}.00 INR</p>
                                    <p className="text-[11px]">Max Bet: {i?.max}.00 INR</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      } else if (item?.status?.toLowerCase() === "suspended") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-30px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      } else if (item?.status?.toLowerCase() === "ball running") {
                        return (
                          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                            </div>
                            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                              <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-20px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                              <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                            </div>
                          </div>
                        )
                      }
                    }
                  })}
                </div>
              )}
            </div>
          )
        })}
      </>
    )
  } else {
    return null;
  }
};

const ExtraMarkets2 = ({ oddsPrice, data, webColor, eventId, eventName }: any) => {
  const dispatch = useDispatch();
  const timerRef = useRef<any>(null);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  const [hideMarkets, setHideMarkets] = useState<string[]>([]);

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, marketName: any, side: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
    dispatch(updateSlipTab('slip'));
    const profit = parseFloat((10 * (odd - 1))?.toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: runnerId,
      gameName: eventName,
      loss,
      marketId: runnerId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: runnerName
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleStart = (e: any, item: any) => {
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
      setAmount(`${item?.mid}-${item?.sid}`);
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

  const fn_immediateBet = async (e: React.MouseEvent, amount: number, item: any, odd: any, side: string, marketName: any, runnerName: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself");
    const profit = parseFloat((amount * (odd - 1))?.toFixed(2));
    const loss = amount;
    if (wallet < amount) return toast.error("Not Enough Balance");
    setAmount("");
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: amount,
      eventId: eventId,
      gameId: `${item?.mid}-${item?.sid}`,
      gameName: eventName,
      loss,
      marketId: `${item?.mid}-${item?.sid}`,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
      selectionName: runnerName
    };
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  const fn_controlMarketView = (marketName: string) => {
    const findMarket = hideMarkets?.find((m) => m === marketName);
    if (findMarket) {
      const filterRemaining = hideMarkets?.filter((m) => m !== marketName);
      setHideMarkets(filterRemaining);
    } else {
      hideMarkets.push(marketName);
    }
  }

  if (Object.keys(data)?.length > 0) {
    return (
      <>
        {Object.keys(data)?.map((singleExtraMarket: any, index: number) => {
          if (data[singleExtraMarket]?.[0]?.gtype !== "cricketcasino") return;
          return (
            <div key={index} className="bg-white h-[max-content] shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
              {/* header */}
              <div
                className="h-[47px] flex justify-between border-b cursor-pointer"
                onClick={() => fn_controlMarketView(singleExtraMarket)}
              >
                <div className="text-[--text-color] uppercase flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
                  {singleExtraMarket}
                </div>
                <div className="flex gap-[7px] items-center pe-[10px]">
                  {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
                  <img alt="cashout" src={cashoutImg} className="w-[20px]" />
                  CashOut
                </div> */}
                  <HiMiniInformationCircle className="text-[20px]" />
                  <IoIosArrowUp
                    className={`transition-all duration-300 ${hideMarkets?.find((m) => m === singleExtraMarket) ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
              </div>
              {/* content */}
              {!hideMarkets?.find((m) => m === singleExtraMarket) && (
                <div>
                  {/* <div className={`${data[singleExtraMarket]?.length > 10 && singleExtraMarket === "cricketcasino" && "xl:grid xl:grid-flow-col xl:grid-rows-10"}`}> */}
                  {data[singleExtraMarket]?.map((item: any) => {
                    if (item?.status?.toLowerCase() !== "suspended" && item?.status !== "ball running") {
                      return (
                        item?.section?.map((i: any) => (
                          <div className="min-h-[55px] py-[4px] flex flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                              <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{i?.nat}</p>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex flex-nowrap sm:flex-wrap sm:gap-[11px] justify-center items-center relative">
                                <div
                                  className="h-[43px] sm:h-[47px] w-[55px] sm:w-[47px] border sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                                  onClick={(e) => handleBetClicked(e, i?.odds?.[0]?.odds, i?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back",)}
                                  onMouseDown={(e) => handleStart(e, i)}
                                  onTouchStart={(e) => handleStart(e, i)}
                                >
                                  <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                    {i?.odds?.[0]?.odds}
                                  </p>
                                  <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                    {i?.odds?.[0]?.size}
                                  </p>
                                  {authentication && showAmounts === `${item?.mid}-${i?.sid}` && (
                                    <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, i, i?.odds?.[0]?.odds, "Back", singleExtraMarket, i?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, i, i?.odds?.[0]?.odds, "Back", singleExtraMarket, i?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, i, i?.odds?.[0]?.odds, "Back", singleExtraMarket, i?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, i, i?.odds?.[0]?.odds, "Back", singleExtraMarket, i?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                      <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, i, i?.odds?.[0]?.odds, "Back", singleExtraMarket, i?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                    </div>
                                  )}
                                </div>

                                <div className="h-[43px] ms-[7px] sm:ms-0 flex flex-col justify-end lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                                  <p className="text-[11px] text-nowrap">Min Bet: {i?.min}.00 INR</p>
                                  <p className="text-[11px] text-nowrap">Max Bet: {i?.max}.00 INR</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )
                    } else if (item?.status?.toLowerCase() === "suspended") {
                      return (
                        <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                          <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                            <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                          </div>
                          <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                            <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-30px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                            <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                          </div>
                        </div>
                      )
                    } else if (item?.status?.toLowerCase() === "ball running") {
                      return (
                        <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                          <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                            <p className="text-[13px] sm:text-[15px] font-[500] capitalize">{item?.nat}</p>
                          </div>
                          <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center relative">
                            <div className="h-[25px] rounded-[7px] w-[160px] bg-[--suspended-odds-dark] mt-[2px] ml-[-20px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
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
                            <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[50px]"></div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              )}
            </div>
          )
        })}
      </>
    )
  } else {
    return null;
  }
};
