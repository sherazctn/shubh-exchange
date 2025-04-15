import aos from "aos";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import casino from "../../assets/Casino.svg"
import matka from "../../assets/Matka.svg"
import avitor from "../../assets/Aviator.svg"
import horseRiding from "../../assets/Horse Racing.svg"
import basketBall from "../../assets/Basket Ball.svg"
import rugby from "../../assets/Rugby.svg"
import boxingIcon from "../../assets/Boxing.svg"
import baseball from "../../assets/Baseball.svg"
import golfIcon from "../../assets/Golf.svg"
import snooker from "../../assets/Snooker.svg"
import eSports from "../../assets/e-Sports.svg"

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { FaExclamationCircle, FaLock } from "react-icons/fa";

import Loader from "../Loader";
import Footer from "../footer/page";
import allSport from "../../assets/inplay.png";
import URL, { getAvailableGames, getInplayMarketsApi } from "../../api/api";
import { updateSelectedEvent } from "../../features/features";
import { MdWatchLater } from "react-icons/md";
import { fn_getLiveEventsApi, fn_getMarketsOddsApi } from "../../api/newApis";

const LeftSection = () => {
  const location = useLocation();
  const divHeight = `${window.innerHeight - 60}px`;
  const [tab, setTab] = useState("all");
  const toastRef = useRef<string | null>(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [marketData, setMarketData] = useState<any>([]);
  const webColor = useSelector((state: any) => state.websiteColor);
  const sportPermission = useSelector((state: any) => state.sportPermission);

  useEffect(() => {
    aos.init({ once: true });
    fn_getGames();
  }, []);

  useEffect(() => {
    if (tab !== "") {
      fetchMarkets();
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
    } else {
      setLoader(false);
    }
  };

  const fetchMarkets = async () => {
    try {
      const response = await fn_getLiveEventsApi(2);
      setMarketData(response?.data?.competitions);
    } catch (error) {
      console.error("Error fetching in-play markets:", error);
    }
  };

  const fn_getInPlayMarkets = () => {
    let intervalId: NodeJS.Timeout;

    // Start the interval
    intervalId = setInterval(() => {
      if (location.pathname === "/in-play") {
        fetchMarkets();
      } else {
        clearInterval(intervalId); // Clear interval if not on the correct page
      }
    }, 20 * 1000);

    // Return a cleanup function to clear the interval
    return () => clearInterval(intervalId);
  };

  const fn_comingsoon = () => {
    if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }
    toastRef.current = toast.error('Coming Soon', {
      icon: <MdWatchLater style={{ color: 'orange' }} />,
      duration: 4000,
      position: 'top-center'
    });
  };

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

  useEffect(() => {
    let marketsOddsInterval: any;

    if (location.pathname === "/in-play" && marketData?.length > 0) {
      fetchMarketsOdds();

      marketsOddsInterval = setInterval(() => {
        fetchMarketsOdds();
      }, 2000);
    }

    return () => {
      clearInterval(marketsOddsInterval);
    };
  }, [location.pathname, marketData]);

  return (
    <div
      className="w-[100%] xl:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      {/* tabs */}
      <div className="h-[67px] flex gap-[8px] sm:gap-[15px] overflow-auto">
        {!loader ? (
          data?.length > 0 ? (
            <>
              {/* Static "All" Tab */}
              <div
                className={`sports-left-top-tabs shadow-sm ${tab === "all" ? "bg-[#f3f3f3] border" : "bg-white"
                  }`}
                style={{ borderColor: webColor }}
                onClick={() => fn_controlTabs("all")}
              >
                <img
                  alt="img"
                  src={allSport}
                  className="w-[24px] h-[24px] rounded-full object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">All</p>
              </div>

              {/* Dynamic Tabs */}
              {data.map((item: any) => (
                <div
                  key={item?.name}
                  className={`sports-left-top-tabs shadow-sm ${tab === "4" && item?.name === "cricket"
                    ? "bg-[#f3f3f3] border"
                    : tab === "1" && item?.name === "soccer"
                      ? "bg-[#f3f3f3] border"
                      : tab === "2" && item?.name === "tennis"
                        ? "bg-[#f3f3f3] border"
                        : "bg-white"
                    }`}
                  style={{ borderColor: webColor }}
                  onClick={() =>
                    fn_controlTabs(
                      item?.name === "cricket"
                        ? "4"
                        : item?.name === "soccer"
                          ? "1"
                          : item?.name === "tennis"
                            ? "2"
                            : ""
                    )
                  }
                >
                  <img
                    alt="img"
                    src={`${URL}/${item?.image}`}
                    className="w-[27px] h-[27px] rounded-full object-cover"
                  />
                  <p className="font-[500] text-[13px] capitalize">{item?.name}</p>
                </div>
              ))}
              {/* casino */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={casino}
                  className="w-[27px] h-[27px] rounded-full object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Casino</p>
              </div>
              {/* matka */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={matka}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Matka</p>
              </div>
              {/* aviator */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={avitor}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Aviator</p>
              </div>
              {/* horse riding */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={horseRiding}
                  className="w-[27px] h-[27px] object-cover scale-[1.2]"
                />
                <p className="font-[500] text-[13px] capitalize">Horse Riding</p>
              </div>
              {/* basket ball */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={basketBall}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Basket Ball</p>
              </div>
              {/* rugby */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={rugby}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Rugby</p>
              </div>
              {/* boxing */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={boxingIcon}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Boxing</p>
              </div>
              {/* baseball */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={baseball}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Baseball</p>
              </div>
              {/* golf */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={golfIcon}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Golf</p>
              </div>
              {/* snooker */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={snooker}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">Snooker</p>
              </div>
              {/* e-sports */}
              <div
                className={`sports-left-top-tabs shadow-sm bg-white`}
                style={{ borderColor: webColor }}
                onClick={fn_comingsoon}
              >
                <img
                  alt="img"
                  src={eSports}
                  className="w-[27px] h-[27px] object-cover"
                />
                <p className="font-[500] text-[13px] capitalize">e-Sports</p>
              </div>
            </>
          ) : (
            <p>No Game is Playing</p>
          )
        ) : (
          <div className="p-[18px]">
            <Loader color={webColor} size={25} />
          </div>
        )}
      </div>
      <AllTabs webColor={webColor} competitions={marketData} tab={tab} sportPermission={sportPermission} />
      <Footer />
    </div>
  );
};

export default LeftSection;

const AllTabs = ({ webColor, competitions, tab, sportPermission }: { webColor: string; competitions: any; tab: any, sportPermission: any }) => {
  const [competitionsId, setCompetitionsId] = useState<any>([]);
  const adminGamesData = useSelector((state: any) => state.redisGames);
  const fn_controlMatchesView = (id: string) => {
    setCompetitionsId((prevIds: any) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((existingId: string) => existingId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  // Sort competitions based on totalMatched in descending order
  // const sortedCompetitions = competitions?.sort((a: any, b: any) => {
  //   const totalMatchedA = a.events.reduce((sum: number, event: any) => sum + (event?.odd?.totalMatched || 0), 0);
  //   const totalMatchedB = b.events.reduce((sum: number, event: any) => sum + (event?.odd?.totalMatched || 0), 0);
  //   return totalMatchedB - totalMatchedA;
  // });

  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]" style={{ minHeight: `${window.innerHeight - 330}px` }}>
      {competitions?.length > 0 ? competitions?.map((comp: any) => (
        <div key={comp?.competitionId}>
          <div
            onClick={() => fn_controlMatchesView(comp?.competitionId)}
            className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
            style={{ backgroundColor: webColor }}
          >
            <p className="text-[13px] sm:text-[15px] font-[500]">{comp?.competitionName}</p>
            <div className="flex items-center gap-[10px]">
              <p className="text-[13px] sm:text-[15px] font-[500]">{comp?.events?.length}</p>
              <IoIosArrowUp
                className={`transition-all duration-300 ${!competitionsId.includes(comp?.competitionId) ? "-rotate-180" : ""}`}
              />
            </div>
          </div>
          {!competitionsId.includes(comp?.competitionId) && (
            <div className="bg-white rounded-b-[7px]">
              {comp?.events?.length > 0 && comp?.events?.map((event: any) => (
                <List event={event} webColor={webColor} tab={tab} compName={comp?.competitionName} adminGamesData={adminGamesData} sportPermission={sportPermission} />
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

const List = ({ event, webColor, tab, compName, adminGamesData, sportPermission }: any) => {

  const dispatch = useDispatch();
  const [prevOdds, setPrevOdds] = useState<any>({});

  useEffect(() => {
    if (Object.keys(prevOdds)?.length === 0 && Object.keys(event)?.length !== 0) {
      setPrevOdds(event);
    } else {
      setTimeout(() => {
        setPrevOdds(event);
      }, 400);
    }
  }, [event]);

  return (
    <a
      className={`min-h-[65px] relative border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] ${sportPermission?.[event?.eventTypeId === 4 ? "cricket" : event?.eventTypeId == 1 ? "soccer" : event?.eventTypeId == 2 ? "tennis" : ""] === false ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      href={sportPermission?.[event?.eventTypeId === 4 ? "cricket" : event?.eventTypeId == 1 ? "soccer" : event?.eventTypeId == 2 ? "tennis" : ""] === false ? "#" : `/match?sportId=${event?.eventTypeId}&eventId=${event?.eventId}`}
      onClick={() => {
        dispatch(updateSelectedEvent({
          competitionName: compName,
          eventId: event?.eventId,
          eventName: event?.matchName,
          date: event?.date || event?.openDate
        }));
        localStorage.setItem('selectedEvent', JSON.stringify({
          competitionName: compName,
          eventId: event?.eventId,
          eventName: event?.matchName,
          date: event?.date || event?.openDate
        }))
      }}
    >
      {sportPermission?.[event?.eventTypeId === 4 ? "cricket" : event?.eventTypeId == 1 ? "soccer" : event?.eventTypeId == 2 ? "tennis" : ""] === false && (
        <div className="absolute w-full h-full bg-black opacity-60 left-0 top-0 z-50 flex justify-center items-center">
          <FaLock className="text-center text-white text-[20px]" />
        </div>
      )}
      <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
        {adminGamesData && (
          <img
            alt={event?.matchName}
            src={`${URL}/${adminGamesData?.find((g: any) => g?.id == event?.eventTypeId)?.image}`}
            className="w-[25px] h-[25px] rounded-full object-cover"
          />
        )}
        <p className="text-[14px]">
          {event?.eventName}
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
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.size || "-"}
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.size || "-"}
              </p>
            </div>

            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[2]?.ex?.availableToBack?.[0]?.size || "-"}
              </p>
            </div>

            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.size || "-"}
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.size || "-"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToLay?.[0]?.size || "-"}
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[0]?.ex?.availableToBack?.[0]?.size || "-"}
              </p>
            </div>

            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] bg-[--blue]`}
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                -
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                -
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] bg-[--red]`}
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                -
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                -
              </p>
            </div>

            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price ? "bg-[--blue-dark]" : "bg-[--blue]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToLay?.[0]?.size || "-"}
              </p>
            </div>
            <div
              className={`h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] flex flex-col justify-between py-[6px] ${prevOdds?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price !== event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price ? "bg-[--red-dark]" : "bg-[--red]"}`}

            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.price || "-"}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {event?.odd?.runners?.[1]?.ex?.availableToBack?.[0]?.size || "-"}
              </p>
            </div>
          </>
        )}
      </div>
    </a>
  );

};
