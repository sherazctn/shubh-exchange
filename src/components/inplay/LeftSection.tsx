import aos from "aos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import allTabsImg from "../../assets/inplay.png";
import cricketBall from "../../assets/cricket-ball.png";
import soccerBall from "../../assets/soccer-ball.png";
import tennisBall from "../../assets/tennis-ball.png";
import { IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import Footer from "../footer/page";
import URL, { getAvailableGames, getInplayMarketsApi } from "../../api/api";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { updateBets, updateBettingSlip } from "../../features/features";
import { useLocation } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const LeftSection = () => {
  const location = useLocation();
  const divHeight = `${window.innerHeight - 60}px`;
  const [tab, setTab] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    aos.init({ once: true });
    fn_getGames();
  }, []);

  useEffect(() => {
    if (tab !== "") {
      const cleanup = fn_getInPlayMarkets();
      return cleanup;
    }
  }, [tab, location.pathname]);

  const fn_controlTabs = (id: string) => {
    setTab(id)
  };

  const fn_getGames = async () => {
    setLoader(true)
    const response: any = await getAvailableGames();
    if (response?.status) {
      setLoader(false);
      setData(response?.data);
      if (tab === "") {
        setTab(response?.data[0]?.name === "cricket" ? "4" : response?.data[0]?.name === "soccer" ? "1" : response?.data[0]?.name === "tennis" ? "2" : "");
      }
    } else {
      setLoader(false);
    }
  };

  const fn_getInPlayMarkets = () => {
    let intervalId: NodeJS.Timeout;

    const fetchMarkets = async () => {
      try {
        const response = await getInplayMarketsApi(tab);
        setMarketData(response?.data);
      } catch (error) {
        console.error("Error fetching in-play markets:", error);
      }
    };

    // Start the interval
    intervalId = setInterval(() => {
      if (location.pathname === "/in-play") {
        fetchMarkets();
      } else {
        clearInterval(intervalId); // Clear interval if not on the correct page
      }
    }, 500);

    // Return a cleanup function to clear the interval
    return () => clearInterval(intervalId);
  };

  return (
    <div
      className="w-[100%] xl:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      {/* tabs */}
      <div className="h-[67px] flex gap-[8px] sm:gap-[15px] overflow-auto">
        {!loader ?
          data?.length > 0 ? data?.map((item: any) => (
            <div
              className={`sports-left-top-tabs shadow-sm ${tab == "4" && item?.name === "cricket"
                ? "bg-[#f3f3f3] border"
                : tab == "1" && item?.name === "soccer" ? "bg-[#f3f3f3] border"
                  : tab == "2" && item?.name === "tennis" ? "bg-[#f3f3f3] border"
                    : " bg-white"
                }`}
              style={{ borderColor: webColor }}
              onClick={() => fn_controlTabs(item?.name === "cricket" ? "4" : item?.name === "soccer" ? "1" : item?.name === "tennis" ? "2" : "")}
            >
              <img alt="img" src={`${URL}/${item?.image}`} className="w-[27px] h-[27px] rounded-full object-cover" />
              <p className="font-[500] text-[14px] capitalize">{item?.name}</p>
            </div>
          )) : (
            <p>No Game is Playing</p>
          ) : (
            <div className="p-[18px]"><Loader color={webColor} size={25} /></div>
          )}
      </div>
      <AllTabs webColor={webColor} competitions={marketData} tab={tab} />
      <Footer />
    </div>
  );
};

export default LeftSection;

const AllTabs = ({ webColor, competitions, tab }: { webColor: string; competitions: any; tab: any }) => {
  const [sub1, setSub1] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      {competitions?.length > 0 ? competitions?.map((comp: any) => (
        <div key={comp?.competitionId}>
          <div
            onClick={() => setSub1(!sub1)}
            className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
            style={{ backgroundColor: webColor }}
          >
            <p className="text-[13px] sm:text-[15px] font-[500]">{comp?.competitionName}</p>
            <div className="flex items-center gap-[10px]">
              <p className="text-[13px] sm:text-[15px] font-[500]">{comp?.events?.length}</p>
              <IoIosArrowUp
                className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"}`}
              />
            </div>
          </div>
          {sub1 && (
            <div className="bg-white rounded-b-[7px]">
              {comp?.events?.length > 0 && comp?.events?.map((event: any) => (
                <List event={event} webColor={webColor} tab={tab} />
              ))}
            </div>
          )}
        </div>
      )) : (
        <p className="font-[500] text-[15px] text-gray-600 flex items-center gap-[10px] mt-[10px]"><FaExclamationCircle className="text-[20px]" />No Live Matches Available</p>
      )}
    </div>
  );
};

const List = ({ event, webColor, tab }: any) => {

  const dispatch = useDispatch();
  const authentication = useSelector((state: any) => state.authentication);
  const wallet = useSelector((state: any) => state.wallet);
  const bets = useSelector((state: any) => state.bets);

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
      sportId: tab
    }
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  return (
    <div className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer">
      <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
        <p className="text-[14px]">
          {event?.matchName}
        </p>
        <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
          Live
          <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
        </div>
      </div>
      <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center min-h-[65px] md:min-h-auto">
        <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
          Live
          <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
        </div>
        {event?.odd?.numberOfRunners === 3 ? (
          <>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
              onClick={(e) => handleBetClicked(
                e,
                event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.price,
                event?.matchName,
                event?.odd?.runners?.[0]?.selectionId,
                "Back",
                event?.match_id,
                event?.market_id,
                event?.marketname
              )}
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
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
                {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
              onClick={(e) => handleBetClicked(
                e,
                event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.price,
                event?.matchName,
                event?.odd?.runners?.[1]?.selectionId,
                "Lay",
                event?.match_id,
                event?.market_id,
                event?.marketname
              )}
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.size}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

};
