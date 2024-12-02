import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import Footer from "../footer/page";
import { updateBets, updateBettingSlip } from "../../features/features";

import cashoutImg from "../../assets/cashout.png";

import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { getUpdatedBookmaker, getUpdatedFancyMarket } from "../../api/api";

const LiveCricketLeftSection = ({ singleLiveCricket, markets, selectedEvent, runners, sportId, eventId }: any) => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [tabs, setTabs] = useState("Main");
  const [tiedMatch, setTiedMatch] = useState(true);
  const [matchOdds, setMatchOdds] = useState<string[]>([]);

  const webColor = useSelector((state: any) => state.websiteColor);
  const matchOddsData = [singleLiveCricket?.odds?.Runners[0], singleLiveCricket?.odds?.Runners[1]];
  const drawMatchData = singleLiveCricket?.odds?.Runners[2];

  const eventDate: any = selectedEvent?.date ? parseISO(selectedEvent.date) : null;

  const getEventDisplayText = () => {
    if (!eventDate) return '';

    const currentDate = new Date();

    // If event is in the past
    if (isBefore(eventDate, currentDate)) {
      return "In Play";
    }

    // If event is today
    if (isToday(eventDate)) {
      return `Today, ${format(eventDate, "hh:mm a")}`;
    }

    // If event is tomorrow
    if (isTomorrow(eventDate)) {
      return `Tomorrow, ${format(eventDate, "hh:mm a")}`;
    }

    // For future dates
    return format(eventDate, "dd MMM yyyy, hh:mm a");
  };

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[23px] text-center">{selectedEvent?.competitionName}</p>
        <p className="text-[22px] text-center">{selectedEvent?.eventName}</p>
        <button className="live-match-btn">{getEventDisplayText()}</button>
      </div>
      {/* tabs */}
      <div className="flex gap-[10px] overflow-auto mb-[10px]">
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
        {/* <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "bookmaker" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "bookmaker" ? webColor : "white" }}
          onClick={() => setTabs("bookmaker")}
        >
          Bookmaker
        </div>
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "line" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "line" ? webColor : "white" }}
          onClick={() => setTabs("line")}
        >
          Line
        </div>
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "fancy" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "fancy" ? webColor : "white" }}
          onClick={() => setTabs("fancy")}
        >
          Fancy
        </div> */}
      </div>
      <div className="flex flex-col gap-[10px]" style={{ minHeight: `${window.innerHeight - 490}px` }}>
        {markets?.map((item: any) => {
          if (tabs === "Main") {
            const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
            if (item?.marketName !== "Match Odds" && item?.marketName !== "Tied Match") return;
            return (
              <MatchOdds market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
            )
          } else if (tabs === "Match Odds") {
            const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
            if (item?.marketName !== "Match Odds") return;
            return (
              <MatchOdds market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
            )
          } else {
            const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
            if (item?.marketName === "Match Odds") return;
            if (item?.marketName === "Tied Match") return;
            return (
              <MatchOdds market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} />
            )
          }
        })}
        {tabs === "Main" && (
          <>
            <Bookmaker webColor={webColor} eventId={eventId} />
          </>
        )}
        {(tabs === "Main" || tabs === "fancy") && (
          <>
            <Fancy webColor={webColor} eventId={eventId} tabs={tabs} setTabs={setTabs} eventName={selectedEvent?.eventName} />
          </>
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

const MatchOdds = ({ market, webColor, matchOdds, setMatchOdds, runner, sportId, eventId }: any) => {
  const dispatch = useDispatch();
  const [prevOdds, setPrevOdds] = useState<any>({});
  const bets = useSelector((state: any) => state.bets);
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
  }
  const handleBetClicked = (e: any, odd: any, runnerName: any, runnerId: any, side: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!runnerName) return;
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
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }
  if (market.odds) {
    return (
      <div key={market.marketId} className="bg-white shadow-sm rounded-[7px]">
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
          onClick={(e) => fn_controlOddsView(e, market.marketId)}
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            {market.marketName}
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div>
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
                          className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] cursor-pointer ${preI?.price !== i.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                          onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Back")}
                        >
                          <p className="font-[800] text-center text-[15px]">
                            {i.price || "-"}
                          </p>
                          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                            {i.size || "-"}
                          </p>
                        </div>
                      );
                    })}
                    {[0, 1, 2].map((index) => {
                      const i = odd?.ex?.availableToLay?.[index] || {};
                      const preI = prevOdd?.ex?.availableToLay?.[index] || {};
                      return (
                        <div
                          key={index}
                          className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] cursor-pointer ${preI?.price !== i.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                          onClick={(e) => handleBetClicked(e, i?.price, `${runner?.runners?.[0]?.runnerName} v ${runner?.runners?.[1]?.runnerName}`, item?.selectionId, "Lay")}
                        >
                          <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                            {i.price || "-"}
                          </p>
                          <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                            {i.size || "-"}
                          </p>
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

const Bookmaker = ({ webColor, eventId }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>([]);
  const [tiedData, setTiedData] = useState([]);
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
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
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
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
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
      <div className="bg-white shadow-sm rounded-[7px]">
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            BOOKMAKER
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div>
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
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.b1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Back")}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                        {item?.b1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                        {item?.bs1}
                      </p>
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.l1, `${data?.[0]?.nat} v ${data?.[1]?.nat}`, `${item?.mid}-${item?.sid}`, "Lay")}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px] cursor-pointer">
                        {item?.l1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px] cursor-pointer">
                        {item?.ls1}
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

const Fancy = ({ webColor, eventId, tabs, setTabs, eventName }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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
            setData(response?.data?.slice(0, 5));
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
    if (!authentication) return toast.error("Login Yourself");
    if (!odd || odd == 0 || odd == 1) return;
    if (!runnerName) return;
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
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

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

  if (data?.length > 0) {
    return (
      <div className="bg-white shadow-sm rounded-[7px]">
        {/* header */}
        <div
          className="h-[47px] flex justify-between border-b cursor-pointer"
        >
          <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
            FANCY MARKET
          </div>
          <div className="flex gap-[7px] items-center pe-[10px]">
            <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
              <img alt="cashout" src={cashoutImg} className="w-[20px]" />
              CashOut
            </div>
            <HiMiniInformationCircle className="text-[20px]" />
            <IoIosArrowUp
              className={`transition-all duration-300`}
            />
          </div>
        </div>
        {/* content */}
        <div>
          {data?.map((item: any) => {
            if (item?.gstatus !== "SUSPENDED" && item?.gstatus !== "Ball Running") {
              return (
                <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                  <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                    <p className="text-[15px] font-[500] capitalize">{item?.nat}</p>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.b1, item?.nat, `${item?.mid}-${item?.sid}`, "Back")}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.b1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.bs1}
                      </p>
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer"
                      onClick={(e) => handleBetClicked(e, item?.l1, item?.nat, `${item?.mid}-${item?.sid}`, "Lay")}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.l1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.ls1}
                      </p>
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
                    <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] lg:ml-[-50px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      SUSPENDED
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.b1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.bs1}
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.l1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.ls1}
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
                    <div className="h-[25px] rounded-[7px] w-[200px] bg-[--suspended-odds-dark] lg:ml-[-50px] absolute text-white font-[500] text-[13px] flex justify-center items-center">
                      Ball Running
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.b1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.bs1}
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--suspended-odds] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.l1}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.ls1}
                      </p>
                    </div>
                    <div className="h-[43px] flex flex-col justify-center lg:me-[10px] italic text-gray-600 lg:min-w-[120px]"></div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        {tabs === "Main" && (
          <p
            className="px-[10px] py-[3px] text-[14px] font-[500] hover:underline cursor-pointer w-[max-content]"
            onClick={() => setTabs("fancy")}
          >
            See More
          </p>
        )}
      </div>
    );
  } else {
    return null;
  }
};

const TiedMatch = ({ tiedMatch, setTiedMatch, webColor, drawMatchData }: any) => {
  return (
    <div className="bg-white shadow-sm rounded-[7px]">
      <div
        className="h-[47px] flex justify-between border-b cursor-pointer"
        onClick={() => setTiedMatch(!tiedMatch)}
      >
        <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
          Tied Match
        </div>
        <div className="flex gap-[7px] items-center pe-[10px]">
          <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
            <img alt="cashout" src={cashoutImg} className="w-[20px]" />
            CashOut
          </div>
          <HiMiniInformationCircle className="text-[20px]" />
          <IoIosArrowUp
            className={`${!tiedMatch && "-rotate-180"
              } transition-all duration-300`}
          />
        </div>
      </div>
      {tiedMatch && (
        <div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <BsGraphUp />
              <p className="text-[15px] font-[500]">Yes</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              {drawMatchData?.ExchangePrices?.AvailableToBack?.map((i: any) => (
                <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                  <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                    {i?.price}
                  </p>
                  <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                    {i?.size}
                  </p>
                </div>
              ))}
              {drawMatchData?.ExchangePrices?.AvailableToLay?.map((i: any) => (
                <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                  <p className="font-[800] text-center text-[15px]">{i?.price}</p>
                  <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                    {i?.size}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
