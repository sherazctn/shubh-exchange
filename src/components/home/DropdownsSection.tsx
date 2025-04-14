import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

import Loader from "../Loader";
import URL from "../../api/api";
import { FaExclamationCircle, FaLock } from "react-icons/fa";
import { fn_getLiveEventsApi, fn_getMarketsOddsApi } from "../../api/newApis";
import { updateLiveMarkets, updateSelectedEvent } from "../../features/features";

const CricketDropdownsSection = ({ text, id, smallText }: any) => {

  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const liveMarkets = useSelector((state: any) => state.liveMarkets);
  const adminGamesData = useSelector((state: any) => state.redisGames);
  const sportPermission = useSelector((state: any) => state.sportPermission);

  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [prevOdds, setPrevOdds] = useState<any>([]);
  const [marketData, setMarketData] = useState<any>([]);
  const [competitionsId, setCompetitionsId] = useState<any>([]);
  const sportName = id === 1 ? "soccer" : id === 2 ? "tennnis" : "cricket";

  const fn_controlMatchesView = (id: string) => {
    setCompetitionsId((prevIds: any) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((existingId: string) => existingId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  useEffect(() => {
    if (prevOdds?.length === 0 && marketData?.length !== 0) {
      setPrevOdds(marketData);
    } else {
      setTimeout(() => {
        setPrevOdds(marketData);
      }, 400);
    }
  }, [marketData]);

  useEffect(() => {
    let liveMarketsInterval: any;

    const fetchLiveMarkets = async () => {
      try {
        const response = await fn_getLiveEventsApi(id);
        const competitions = response?.data?.competitions || [];
        setMarketData(competitions);
        dispatch(updateLiveMarkets({ ...liveMarkets, [sportName]: competitions }));
        setLoader(false);
      } catch (error) {
        console.error("Error fetching live events:", error);
      }
    };

    // Initial fetch
    if (location.pathname === "/") {
      fetchLiveMarkets();

      // Set interval after initial fetch
      liveMarketsInterval = setInterval(() => {
        fetchLiveMarkets();
      }, 10 * 60 * 1000); // 10 minutes
    }

    return () => {
      clearInterval(liveMarketsInterval);
    };
  }, [location.pathname]);

  // 2. Fetch Market Odds every 30s based on existing marketData
  useEffect(() => {
    let marketsOddsInterval: any;

    const fn_getMarketsOdds = async (matchOddMarketId: string) => {
      try {
        const response = await fn_getMarketsOddsApi(matchOddMarketId);
        setMarketData((prevData: any) =>
          prevData.map((competition: any) => ({
            ...competition,
            events: competition.events.map((event: any) =>
              event.matchOddMarketId === matchOddMarketId
                ? { ...event, odd: response?.data?.[0] }
                : event
            ),
          }))
        );
      } catch (error) {
        console.log("error while fetching markets odds", error);
      }
    };

    const fetchMarketsOdds = async () => {
      for (const competition of marketData) {
        for (const event of competition?.events || []) {
          if (event?.matchOddMarketId) {
            await fn_getMarketsOdds(event.matchOddMarketId);
          }
        }
      }
    };

    if (location.pathname === "/" && marketData?.length > 0) {
      fetchMarketsOdds();

      marketsOddsInterval = setInterval(() => {
        fetchMarketsOdds();
      }, 5 * 1000); // 30 seconds
    }

    return () => {
      clearInterval(marketsOddsInterval);
    };
  }, [location.pathname, marketData.length]);

  return (
    <div className="mt-[15px]">
      <div
        className="flex items-center gap-4 w-[max-content] cursor-pointer"
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-[18px] font-[500]">{text}</p>
        <IoIosArrowUp
          className={`text-[20px] transition-all duration-300 ${dropdown ? "-rotate-180" : ""
            }`}
        />
      </div>
      {dropdown ? !loader ? (
        <div className="flex flex-col gap-[10px]">
          {marketData?.length > 0 ? marketData?.map((competition: any, index: number) => (
            <div key={competition?.competitionId} className="bg-white mt-[5px] rounded-[7px]">
              {/* header */}
              <div
                onClick={() => fn_controlMatchesView(competition?.competitionId)}
                className="text-[--text-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] sm:text-[15px] justify-between cursor-pointer"
                style={{ backgroundColor: webColor }}
              >
                <p>{competition?.competitionName}</p>
                <div className="flex items-center gap-[10px]">
                  <p>{competition?.events?.length}</p>
                  <IoIosArrowUp
                    className={`${!competitionsId.includes(competition?.competitionId) ? "-rotate-180" : ""} transition-all duration-300`}
                  />
                </div>
              </div>
              {/* content */}
              {!competitionsId.includes(competition?.competitionId) && (
                <div>
                  {competition?.events?.map((event: any, i: number) => {
                    return (
                      <a
                        onClick={(e) => {
                          if (sportPermission?.[smallText] === false) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          dispatch(updateSelectedEvent({
                            competitionName: competition?.competitionName,
                            eventId: event?.eventId,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate,
                            inPlay: true
                          }));
                          localStorage.setItem("selectedEvent", JSON.stringify({
                            competitionName: competition?.competitionName,
                            eventId: event?.eventId,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate,
                            inPlay: true
                          }));
                          window.location.href = `/match?sportId=${id}&eventId=${event?.eventId}`;
                        }}
                        href={`/match?sportId=${id}&eventId=${event?.eventId}`}
                        className={`relative min-h-[65px] border-b sm:pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[2px] sm:px-[11px] cursor-pointer ${sportPermission?.[smallText] === false ? "cursor-not-allowed pointer-events-none" : ""}`}
                      >
                        {sportPermission?.[smallText] === false && (
                          <div className="absolute w-full h-full bg-black opacity-60 left-0 top-0 z-50 flex justify-center items-center">
                            <FaLock className="text-center text-white text-[20px]" />
                          </div>
                        )}
                        <div className="flex w-full md:w-auto items-center gap-2 sm:gap-4 ms-2.5 min-h-[50px] sm:min-h-[55px] md:min-h-auto relative">
                          {adminGamesData && (
                            <img
                              alt={text}
                              src={`${URL}/${adminGamesData?.find((g: any) => g?.id == id)?.image}`}
                              className="w-[25px] h-[25px] rounded-full object-cover"
                            />
                          )}
                          <p className="text-[12px] sm:text-[14px]">
                            {event?.eventName}
                          </p>
                          <div className="absolute right-[10px] top-1/2 -translate-y-1/2 flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center" style={{ backgroundColor: webColor }}>
                            Live
                            <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                          </div>
                        </div>
                        <div className="flex w-full sm:w-auto sm:flex-wrap sm:gap-[11px] items-center mb-[2px] sm:mb-0 sm:min-h-[65px] md:min-h-auto">
                          <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
                            Live
                            <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                          </div>
                          {event?.odd?.numberOfRunners === 3 ? (
                            <>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                              >
                                <p className={`font-[800] text-center text-[12px] sm:text-[14px]`}>
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                              >
                                <p className={`font-[800] text-center text-[12px] sm:text-[14px]`}>
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>

                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  -
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  -
                                </p>
                              </div>
                              <div
                                className="h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  -
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  -
                                </p>
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          )) : (
            <div><p className="text-[15px] mb-[10px] flex items-center text-gray-600"><FaExclamationCircle className="pe-[5px] text-[22px]" />No Live Match Found</p></div>
          )}
        </div>
      ) : (
        <div><Loader size={25} color={webColor} /></div>
      ) : null}
    </div>
  );
};

export default CricketDropdownsSection;
