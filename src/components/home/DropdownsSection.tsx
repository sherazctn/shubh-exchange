import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

import Loader from "../Loader";
import { FaExclamationCircle } from "react-icons/fa";
import URL, { getLiveMarketsApi } from "../../api/api";
import { updateBets, updateBettingSlip, updateLiveMarkets, updateSelectedEvent } from "../../features/features";

const CricketDropdownsSection = ({ text, id }: any) => {

  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const bets = useSelector((state: any) => state.bets);
  const wallet = useSelector((state: any) => state.wallet);
  const webColor = useSelector((state: any) => state.websiteColor);
  const liveMarkets = useSelector((state: any) => state.liveMarkets);
  const adminGamesData = useSelector((state: any) => state.redisGames);
  const authentication = useSelector((state: any) => state.authentication);

  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [marketData, setMarketData] = useState([]);
  const [competitionsId, setCompetitionsId] = useState<any>([]);
  const [prevOdds, setPrevOdds] = useState<any>([]);
  const sportName = id === 1 ? "soccer" : id === 2 ? "tennnis" : "cricket";

  const handleBetClicked = (e: any, odd: any, gameName: any, selectionId: any, side: any, eventId: any, marketId: any, marketName: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!gameName) return;
    const profit = parseFloat((10 * (odd - 1)).toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: selectionId,
      gameName: gameName,
      loss,
      marketId: marketId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: id
    }
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const fn_getLiveMarkets = () => {
    const intervalId = setInterval(async () => {
      if (location.pathname !== "/") {
        clearInterval(intervalId);
        return;
      }

      const response = await getLiveMarketsApi(id);
      setMarketData(response?.data);
      dispatch(updateLiveMarkets({ ...liveMarkets, [sportName]: response?.data }));
      setLoader(false);
    }, 500);
  };

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
    }else{
      setTimeout(() => {
        setPrevOdds(marketData);
      }, 400);
    }
  }, [marketData]);

  useEffect(() => {
    fn_getLiveMarkets();
  }, [location.pathname]);

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
          {marketData?.length > 0 ? marketData?.map((competition: any, index) => (
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
                  {competition?.events?.map((event: any, i:number) => {
                    return (
                      <a
                        onClick={() => {
                          dispatch(updateSelectedEvent({
                            competitionName: competition?.competitionName,
                            eventId: event?.match_id,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate
                          }));
                          localStorage.setItem('selectedEvent', JSON.stringify({
                            competitionName: competition?.competitionName,
                            eventId: event?.match_id,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate
                          }))
                        }}
                        href={`/match?sportId=${id}&eventId=${event?.match_id}`}
                        className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer"
                      >
                        <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
                          {adminGamesData && (
                            <img
                              alt={text}
                              src={`${URL}/${adminGamesData?.find((g: any) => g?.id == id)?.image}`}
                              className="w-[25px] h-[25px] rounded-full object-cover"
                            />
                          )}
                          <p className="text-[14px]">
                            {event?.matchName}
                          </p>
                          <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
                            Live
                            <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center min-h-[65px] md:min-h-auto">
                          <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
                            Live
                            <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                          </div>
                          {event?.odd?.numberOfRunners === 3 ? (
                            <>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Back",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className={`font-[800] text-center text-[12px] sm:text-[14px]`}>
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Lay",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  "Back",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  "Lay",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Back",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Lay",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
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
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Back",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Lay",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                              </div>

                              <div
                                className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  -
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  -
                                </p>
                              </div>
                              <div
                                className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  -
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  -
                                </p>
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Back",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Lay",
                                  event?.match_id,
                                  event?.market_id,
                                  event?.marketname
                                )}
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
