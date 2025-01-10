import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

import Loader from "../Loader";
import { FaExclamationCircle } from "react-icons/fa";
import URL, { getLiveMarketsApi, placeBetsApi } from "../../api/api";
import { updateBets, updateBettingSlip, updateLiveMarkets, updateSelectedEvent, updateSlipTab, updateWallet } from "../../features/features";

const CricketDropdownsSection = ({ text, id }: any) => {

  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const user = useSelector((state: any) => state.user);
  const wallet = useSelector((state: any) => state.wallet);
  const webColor = useSelector((state: any) => state.websiteColor);
  const liveMarkets = useSelector((state: any) => state.liveMarkets);
  const adminGamesData = useSelector((state: any) => state.redisGames);
  const authentication = useSelector((state: any) => state.authentication);

  const timerRef = useRef<any>();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [showAmounts, setAmount] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [prevOdds, setPrevOdds] = useState<any>([]);
  const [longPress, setLongPress] = useState(false);
  const [competitionsId, setCompetitionsId] = useState<any>([]);
  const [oddsPrice, setOddsPrice] = useState([]);
  const sportName = id === 1 ? "soccer" : id === 2 ? "tennnis" : "cricket";

  const handleStart = (e: any, selectionId: any, marketId: any, num: any) => {
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
      setAmount(`${marketId}-${selectionId}-${num}`);
    }, 2000);

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

  const handleBetClicked = (e: any, odd: any, gameName: any, selectionId: any, side: any, eventId: any, marketId: any, marketName: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (longPress) return;
    if (showAmounts !== "") setAmount("");
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!gameName) return;
    dispatch(updateSlipTab('slip'));
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
    const updatedBets = [obj];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  };

  useEffect(() => {
    if (longPress) {
      const timeout = setTimeout(() => {
        setLongPress(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [longPress]);

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

  const fn_immediateBet = async (e: any, odd: any, gameName: any, selectionId: any, side: any, eventId: any, marketId: any, marketName: any, amount: number) => {
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
      marketId: marketId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: id
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
    if (prevOdds?.length === 0 && marketData?.length !== 0) {
      setPrevOdds(marketData);
    } else {
      setTimeout(() => {
        setPrevOdds(marketData);
      }, 400);
    }
  }, [marketData]);

  useEffect(() => {
    fn_getLiveMarkets();
  }, [location.pathname]);

  useEffect(() => {
    if (user?.oddsPrice) {
      setOddsPrice(user?.oddsPrice || [1000, 2000, 3000, 4000, 5000]);
    }
  }, [user, authentication]);

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
                  {competition?.events?.map((event: any, i: number) => {
                    return (
                      <a
                        onClick={() => {
                          dispatch(updateSelectedEvent({
                            competitionName: competition?.competitionName,
                            eventId: event?.eventId,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate,
                            inPlay: true
                          }));
                          localStorage.setItem('selectedEvent', JSON.stringify({
                            competitionName: competition?.competitionName,
                            eventId: event?.eventId,
                            eventName: event?.matchName,
                            date: event?.date || event?.openDate,
                            inPlay: true
                          }))
                        }}
                        href={`/match?sportId=${id}&eventId=${event?.eventId}`}
                        className="min-h-[65px] border-b sm:pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[2px] sm:px-[11px] cursor-pointer"
                      >
                        <div className="flex md:w-auto items-center gap-2 sm:gap-4 ms-2.5 min-h-[50px] sm:min-h-[55px] md:min-h-auto">
                          {adminGamesData && (
                            <img
                              alt={text}
                              src={`${URL}/${adminGamesData?.find((g: any) => g?.id == id)?.image}`}
                              className="w-[25px] h-[25px] rounded-full object-cover"
                            />
                          )}
                          <p className="text-[12px] sm:text-[14px]">
                            {event?.matchName}
                          </p>
                          <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
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
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Back",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e, event?.odd?.runners?.[0]?.selectionId, event?.market_id, 1)}
                                onTouchStart={(e) => handleStart(e, event?.odd?.runners?.[0]?.selectionId, event?.market_id, 1)}
                              >
                                <p className={`font-[800] text-center text-[12px] sm:text-[14px]`}>
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[0]?.selectionId}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Lay",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e, event?.odd?.runners?.[0]?.selectionId, event?.market_id, 2)}
                                onTouchStart={(e) => handleStart(e, event?.odd?.runners?.[0]?.selectionId, event?.market_id,2)}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[0]?.selectionId}-2` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  "Back",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[2]?.selectionId}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  "Lay",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[2]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[2]?.selectionId}-2` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[2]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Back",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[1]?.selectionId}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Lay",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[1]?.selectionId}-2` && (
                                  <div className="absolute right-0 top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Back",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                              >
                                <p className={`font-[800] text-center text-[12px] sm:text-[14px]`}>
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[0]?.selectionId}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  "Lay",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[0]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[0]?.selectionId}-2` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[0]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
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
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Back",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  1
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[1]?.selectionId}-1` && (
                                  <div className="absolute top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Back",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div
                                className={`h-[43px] sm:h-[47px] w-full sm:w-[47px] sm:rounded-[5px] flex flex-col justify-between py-[6px] relative ${prevOdds?.[index]?.events?.[i]?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
                                onClick={(e) => handleBetClicked(
                                  e,
                                  event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                  event?.matchName,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  "Lay",
                                  event?.eventId,
                                  event?.market_id,
                                  event?.marketname
                                )}
                                onMouseDown={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                                onTouchStart={(e) => handleStart(e,
                                  event?.odd?.runners?.[1]?.selectionId,
                                  event?.market_id,
                                  2
                                )}
                              >
                                <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price || "-"}
                                </p>
                                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                                  {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size || "-"}
                                </p>
                                {showAmounts === `${event?.market_id}-${event?.odd?.runners?.[1]?.selectionId}-2` && (
                                  <div className="absolute right-0 top-[43px] sm:top-[47px] bg-white border shadow-md z-[99] w-[120px] min-h-[30px] rounded-[6px] p-[5px] flex flex-col gap-[4px]">
                                    <button
                                      style={{ backgroundColor: webColor }}
                                      className="text-white text-[12px] font-[500] w-full rounded-[6px] py-[5px]"
                                      onClick={(e) => fn_immediateBet(
                                        e,
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
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
                                        event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                                        event?.matchName,
                                        event?.odd?.runners?.[1]?.selectionId,
                                        "Lay",
                                        event?.eventId,
                                        event?.market_id,
                                        event?.marketname,
                                        oddsPrice?.[4] || 5000
                                      )}
                                    >
                                      {oddsPrice?.[4] || 5000}
                                    </button>
                                  </div>
                                )}
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
