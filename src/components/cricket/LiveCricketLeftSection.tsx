import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import Footer from "../footer/page";
import RightSlider from "../sports/RightSlider";
import { updateBets, updateBettingSlip, updateSlipTab, updateWallet } from "../../features/features";

// import cashoutImg from "../../assets/cashout.png";

import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { getUpdatedBookmaker, getUpdatedFancyMarket, placeBetsApi } from "../../api/api";

const LiveCricketLeftSection = ({ extraMarkets, markets, selectedEvent, runners, sportId, eventId }: any) => {

  const [tabs, setTabs] = useState("Main");
  const [oddsPrice, setOddsPrice] = useState([]);
  const divHeight = `${window.innerHeight - 60}px`;
  const user = useSelector((state: any) => state.user);
  const [matchOdds, setMatchOdds] = useState<string[]>([]);

  const webColor = useSelector((state: any) => state.websiteColor);

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

  useEffect(() => {
    if (user?.oddsPrice) {
      setOddsPrice(user?.oddsPrice || [1000, 2000, 3000, 4000, 5000]);
    }
  }, [user]);

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="sm:min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[10px] sm:p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[20px] sm:text-[23px] text-center hidden sm:block">{selectedEvent?.competitionName}</p>
        <p className="text-[17px] sm:text-[22px] font-[700] sm:font-[500] text-center">{selectedEvent?.eventName}</p>
        <button className="live-match-btn mt-[3px] sm:mt-[10px]">{getEventDisplayText()}</button>
      </div>
      <div className="w-full mb-[10px] block lg:hidden">
        <RightSlider sportId={sportId} eventId={eventId} />
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
      <div className="flex flex-col gap-[10px]" style={{ minHeight: `${window.innerHeight - 490}px` }}>
        {markets?.map((item: any) => {
          const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
          return <MatchOdds oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
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
            <Bookmaker oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} />
          </>
        )}
        {(tabs === "Main" || tabs === "fancy") && (
          <>
            <Fancy oddsPrice={oddsPrice} webColor={webColor} eventId={eventId} tabs={tabs} setTabs={setTabs} eventName={selectedEvent?.eventName} />
          </>
        )}
        {tabs === "Main" && Object.keys(extraMarkets)?.length > 0 && (
          <ExtraMarkets oddsPrice={oddsPrice} data={extraMarkets} webColor={webColor} eventId={eventId} />
        )}
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

const MatchOdds = ({ oddsPrice, market, webColor, matchOdds, setMatchOdds, runner, sportId, eventId }: any) => {
  const dispatch = useDispatch();
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const [prevOdds, setPrevOdds] = useState<any>({});
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

  useEffect(() => {
    if (Object.keys(market)?.length > 0 && Object.keys(prevOdds)?.length === 0) {
      setPrevOdds(market);
    } else {
      setTimeout(() => {
        setPrevOdds(market);
      }, 400);
    }
  }, [market]);

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

  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!runnerName) return;
    dispatch(updateSlipTab('slip'));
    const profit = parseFloat((10 * (odd - 1)).toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: runnerId,
      gameName: runnerName,
      loss,
      marketId: market.marketId,
      marketName: market.marketName,
      odd: odd,
      profit,
      side: side,
      sportId: sportId,
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  };

  const handleMouseDown = (e: any, selectionId: any, num: any, side: any) => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setLongPress(true);
      setAmount(`${market.marketId}-${selectionId}-${num}-${side}`);
    }, 1000);

    const handleMouseUp = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleMouseUp);

      e.stopPropagation();
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleLongPress = (e: any, selectionId: any, num: any, side: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    let timer: NodeJS.Timeout;

    const startLongPress = () => {
      setLongPress(true);
      setAmount(`${market.marketId}-${selectionId}-${num}-${side}`);
    };

    const cancelLongPress = () => {
      clearTimeout(timer);
      document.removeEventListener('pointerup', cancelLongPress);
    };

    timer = setTimeout(startLongPress, 1000);

    document.addEventListener('pointerup', cancelLongPress, { passive: false });
  };

  useEffect(() => {
    if (longPress) {
      setTimeout(() => {
        setLongPress(false);
      }, 2000);
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
      marketId: market.marketId,
      marketName: market.marketName,
      odd: odd,
      profit,
      side: side,
      sportId: sportId
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
          onClick={(e) => fn_controlOddsView(e, market.marketId)}
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {market.marketName}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            {/* <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div> */}
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
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <BsGraphUp />
                    <p className="text-[15px] font-[500]">{item?.runnerName}</p>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                    {[2, 1, 0].map((index) => {
                      const i = odd?.ex?.availableToBack?.[index] || {};
                      const preI = prevOdd?.ex?.availableToBack?.[index] || {};
                      return (
                        <div
                          key={index}
                          className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                          onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Back")}
                          onMouseDown={(e) => handleMouseDown(e,
                            item?.selectionId,
                            index,
                            'Back'
                          )}
                          onTouchStart={(e) => handleLongPress(e,
                            item?.selectionId,
                            index,
                            'Back'
                          )}
                        >
                          <p className="font-[800] text-center text-[15px]">
                            {i.price || "-"}
                          </p>
                          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
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
                                  oddsPrice?.[0] || 1000
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
                                  oddsPrice?.[1] || 2000
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
                                  oddsPrice?.[2] || 3000
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
                                  oddsPrice?.[3] || 4000
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
                                  oddsPrice?.[4] || 5000
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
                          className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] relative cursor-pointer ${preI?.price !== i.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                          onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Lay")}
                          onMouseDown={(e) => handleMouseDown(e,
                            item?.selectionId,
                            index,
                            'Lay'
                          )}
                          onTouchStart={(e) => handleLongPress(e,
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
                                  oddsPrice?.[0] || 1000
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
                                  oddsPrice?.[1] || 2000
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
                                  oddsPrice?.[2] || 3000
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
                                  oddsPrice?.[3] || 4000
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
                                  oddsPrice?.[4] || 5000
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

const Bookmaker = ({ oddsPrice, webColor, eventId }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [tiedData, setTiedData] = useState([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

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
      eventId: eventId,
      gameId: runnerId,
      gameName: runnerName,
      loss,
      marketId: runnerId,
      marketName: "bookmaker",
      odd: odd,
      profit,
      side: side,
      sportId: "4",
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleMouseDown = (e: any, selectionId: any, num: any) => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setLongPress(true);
      setAmount(`${selectionId}-${num}`);
    }, 1000);

    const handleMouseUp = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleMouseUp);

      e.stopPropagation();
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleLongPress = (e: any, selectionId: any, num: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    let timer: NodeJS.Timeout;

    const startLongPress = () => {
      setLongPress(true);
      setAmount(`${selectionId}-${num}`);
    };

    const cancelLongPress = () => {
      clearTimeout(timer);
      document.removeEventListener('pointerup', cancelLongPress);
    };

    timer = setTimeout(startLongPress, 1000);

    document.addEventListener('pointerup', cancelLongPress, { passive: false });
  };

  useEffect(() => {
    if (longPress) {
      setTimeout(() => {
        setLongPress(false);
      }, 2000);
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
              className={`transition-all duration-300`}
            />
          </div>
        </div>
        {/* content */}
        <div>
          {data?.map((item: any) => {
            if (item?.s === "ACTIVE") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>

                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] relative cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back")}
                      onMouseDown={(e) => handleMouseDown(e,
                        `${item?.mid}-${item?.sid}`,
                        1
                      )}
                      onTouchStart={(e) => handleLongPress(e,
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
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] relative cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay")}
                      onMouseDown={(e) => handleMouseDown(e,
                        `${item?.mid}-${item?.sid}`,
                        2
                      )}
                      onTouchStart={(e) => handleLongPress(e,
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

                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        -
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
      </div>
    );
  } else {
    return null;
  }
};

const Fancy = ({ oddsPrice, webColor, eventId, tabs, setTabs, eventName }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const bets = useSelector((state: any) => state.bets);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

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
      eventId: eventId,
      gameId: runnerId,
      gameName: eventName,
      loss,
      marketId: runnerId,
      marketName: "fancy",
      odd: odd,
      profit,
      side: side,
      sportId: "4",
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleMouseDown = (e: React.MouseEvent, item: any, num: string) => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setLongPress(true);
      setAmount(`${item?.mid}-${item?.sid}-${num}`);
    }, 1000);

    const handleMouseUp = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleMouseUp);

      e.stopPropagation();
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleLongPress = (
    e: React.MouseEvent | React.TouchEvent,
    item: any,
    num: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    let timer: NodeJS.Timeout;

    const startLongPress = () => {
      setLongPress(true);
      setAmount(`${item?.mid}-${item?.sid}-${num}`);
    };

    const cancelLongPress = () => {
      clearTimeout(timer);
      document.removeEventListener('pointerup', cancelLongPress);
    };

    timer = setTimeout(startLongPress, 1000);

    document.addEventListener('pointerup', cancelLongPress, { passive: false });
  };

  useEffect(() => {
    if (longPress) {
      setTimeout(() => {
        setLongPress(false);
      }, 2000);
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

  const fn_immediateBet = async (e: React.MouseEvent, amount: number, item: any, odd: any, side: string) => {
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
    };
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            FANCY MARKET
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300`}
            />
          </div>
        </div>
        {/* content */}
        <div>
          {data?.map((item: any) => {
            if (item?.gstatus !== "SUSPENDED" && item?.gstatus !== "Ball Running" && item?.gstatus !== "Starting Soon.") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                      onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, "Lay")}
                      onMouseDown={(e) => handleMouseDown(e, item, '1')}
                      onTouchStart={(e) => handleLongPress(e, item, '1')}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.l1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.ls1}
                      </p>
                      {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                        <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l1, "Lay")}>{oddsPrice?.[0] || 1000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l1, "Lay")}>{oddsPrice?.[1] || 2000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l1, "Lay")}>{oddsPrice?.[2] || 3000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l1, "Lay")}>{oddsPrice?.[3] || 4000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l1, "Lay")}>{oddsPrice?.[4] || 5000}</button>
                        </div>
                      )}
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, "Back")}
                      onMouseDown={(e) => handleMouseDown(e, item, '2')}
                      onTouchStart={(e) => handleLongPress(e, item, '2')}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.b1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.bs1}
                      </p>
                      {showAmounts === `${item?.mid}-${item?.sid}-2` && (
                        <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.b1, "Back")}>{oddsPrice?.[0] || 1000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.b1, "Back")}>{oddsPrice?.[1] || 2000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.b1, "Back")}>{oddsPrice?.[2] || 3000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.b1, "Back")}>{oddsPrice?.[3] || 4000}</button>
                          <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.b1, "Back")}>{oddsPrice?.[4] || 5000}</button>
                        </div>
                      )}
                    </div>
                    <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                      <p className="text-[11px]">Min Bet: {item?.min}.00K</p>
                      <p className="text-[11px]">Max Bet: {item?.max}.00K</p>
                    </div>
                  </div>
                </div>
              )
            } else if (item?.gstatus === "SUSPENDED") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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

const ExtraMarkets = ({ oddsPrice, data, webColor, eventId }: any) => {
  const dispatch = useDispatch();
  const [showAmounts, setAmount] = useState("");
  const [longPress, setLongPress] = useState(false);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);

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
      gameName: runnerName,
      loss,
      marketId: runnerId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
    }
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const handleMouseDown = (e: React.MouseEvent, item: any, num: string) => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      setLongPress(true);
      setAmount(`${item?.mid}-${item?.sid}-${num}`);
    }, 1000);

    const handleMouseUp = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleMouseUp);

      e.stopPropagation();
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleLongPress = (
    e: React.MouseEvent | React.TouchEvent,
    item: any,
    num: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.userSelect = 'none';
      e.currentTarget.style.webkitUserSelect = 'none';
      e.currentTarget.style.touchAction = 'none';
    }

    let timer: NodeJS.Timeout;

    const startLongPress = () => {
      setLongPress(true);
      setAmount(`${item?.mid}-${item?.sid}-${num}`);
    };

    const cancelLongPress = () => {
      clearTimeout(timer);
      document.removeEventListener('pointerup', cancelLongPress);
    };

    timer = setTimeout(startLongPress, 1000);

    document.addEventListener('pointerup', cancelLongPress, { passive: false });
  };

  useEffect(() => {
    if (longPress) {
      setTimeout(() => {
        setLongPress(false);
      }, 2000);
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
      gameName: runnerName,
      loss,
      marketId: `${item?.mid}-${item?.sid}`,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: "4",
    };
    const response = await placeBetsApi([obj]);
    if (response?.status) {
      dispatch(updateWallet(response?.wallet));
      return toast.success(response?.message);
    } else {
      return toast.error(response?.message);
    }
  }

  if (Object.keys(data)?.length > 0) {
    return (
      <>
        {Object.keys(data)?.map((singleExtraMarket: any, index: number) => (
          <div key={index} className="bg-white shadow-sm rounded-[7px]" onClick={() => setAmount("")}>
            {/* header */}
            <div
              className="h-[47px] flex justify-between border-b cursor-pointer"
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
                  className={`transition-all duration-300`}
                />
              </div>
            </div>
            {/* content */}
            <div>
              {/* <div className={`${data[singleExtraMarket]?.length > 10 && singleExtraMarket === "cricketcasino" && "xl:grid xl:grid-flow-col xl:grid-rows-10"}`}> */}
              {data[singleExtraMarket]?.map((item: any) => {
                if (singleExtraMarket !== "tied_match") {
                  if (item?.gstatus?.toLowerCase() !== "suspended" && item?.gstatus !== "ball running") {
                    return (
                      <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                        <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                        </div>
                        <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                          {singleExtraMarket !== "cricketcasino" && (
                            <div
                              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                              onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay",)}
                              onMouseDown={(e) => handleMouseDown(e, item, '1')}
                              onTouchStart={(e) => handleLongPress(e, item, '1')}
                            >
                              <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                                {item?.l1}
                              </p>
                              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                {item?.ls1}
                              </p>
                              {showAmounts === `${item?.mid}-${item?.sid}-1` && (
                                <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                  <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[0] || 1000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[0] || 1000}</button>
                                  <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[1] || 2000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[1] || 2000}</button>
                                  <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[2] || 3000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[2] || 3000}</button>
                                  <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[3] || 4000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[3] || 4000}</button>
                                  <button style={{ backgroundColor: webColor }} className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]" onClick={(e) => fn_immediateBet(e, oddsPrice?.[4] || 5000, item, item?.l1, "Lay", singleExtraMarket, item?.nat)}>{oddsPrice?.[4] || 5000}</button>
                                </div>
                              )}
                            </div>
                          )}
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                            onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '2')}
                            onTouchStart={(e) => handleLongPress(e, item, '2')}
                          >
                            <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                              {item?.b1}
                            </p>
                            <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                              {item?.bs1}
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

                          <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]">
                            <p className="text-[11px]">Min Bet: {item?.min}.00K</p>
                            <p className="text-[11px]">Max Bet: {item?.max}.00K</p>
                          </div>
                        </div>
                      </div>
                    )
                  } else if (item?.gstatus?.toLowerCase() === "suspended") {
                    return (
                      <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                        <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
                  if (item?.mstatus?.toLowerCase() !== "suspended" && item?.mstatus !== "ball running") {
                    return (
                      <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                        <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                        </div>
                        <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.b3, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '1')}
                            onTouchStart={(e) => handleLongPress(e, item, '1')}
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
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.b2, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '2')}
                            onTouchStart={(e) => handleLongPress(e, item, '2')}
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
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Back",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '3')}
                            onTouchStart={(e) => handleLongPress(e, item, '3')}
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
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '4')}
                            onTouchStart={(e) => handleLongPress(e, item, '4')}
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
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.l2, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '5')}
                            onTouchStart={(e) => handleLongPress(e, item, '5')}
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
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer relative"
                            onClick={(e) => handleBetClicked(e, item?.l3, item?.nat, `${item?.mid}-${item?.sid}`, singleExtraMarket, "Lay",)}
                            onMouseDown={(e) => handleMouseDown(e, item, '6')}
                            onTouchStart={(e) => handleLongPress(e, item, '6')}
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
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
                          <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
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
          </div>
        ))}
      </>
    )
  } else {
    return null;
  }
};
