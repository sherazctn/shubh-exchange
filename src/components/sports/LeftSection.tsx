import aos from "aos";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { FaExclamationCircle, FaLock } from "react-icons/fa";

import spadesAnimation from "../../assets/animations/spades.json";
import tennisAnimation from "../../assets/animations/tennis.json";
import cricketAnimation from "../../assets/animations/cricket.json";
import footballAnimation from "../../assets/animations/football-player.json";

import Loader from "../Loader";
import Footer from "../footer/page";
import { updateSelectedEvent } from "../../features/features";
import { getAvailableGames, getMarketOddsApi, getSingleSportMarketsApi } from "../../api/api";

const LeftSection = () => {

  const [tab, setTab] = useState("");
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(true);
  const [marketData, setMarketData] = useState([]);
  const divHeight = `${window.innerHeight - 60}px`;
  const [contentLoader, setContentLoader] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const sportPermission = useSelector((state: any) => state.sportPermission);

  const queryGame = searchParams.get('game') || null;

  useEffect(() => {
    if (queryGame) {
      if (queryGame === "cricket") {
        setTab("4");
      } else if (queryGame === "soccer") {
        setTab("1");
      } else if (queryGame === "tennis") {
        setTab("2");
      }
    }
    fn_getGames(queryGame);
    aos.init({ once: true });
  }, []);

  useEffect(() => {
    fn_getInPlayMarkets(tab);
  }, [tab]);

  const fn_controlTabs = (id: string) => {
    setTab(id)
  };

  const fn_getGames = async (gameType: string | null) => {
    setLoader(true);
    const response: any = await getAvailableGames();
    if (response?.status) {
      setLoader(false);
      setData(response?.data);
      if (tab === "") {
        setTab(response?.data[0]?.name === "cricket" ? "4" : response?.data[0]?.name === "soccer" ? "1" : response?.data[0]?.name === "tennis" ? "2" : "");
      }
      if (gameType) {
        const gameTab = gameType === "cricket" ? "4" : gameType === "soccer" ? "1" : gameType === "tennis" ? "2" : "";
        setTab(gameTab);
        fn_getInPlayMarkets(gameTab);
      }
    } else {
      setLoader(false);
    }
  };

  const fn_getInPlayMarkets = async (tab: string) => {
    if (tab === "") return;
    const response = await getSingleSportMarketsApi(tab);
    if (response?.status) {
      setMarketData(response?.data);
    }
    setContentLoader(false);
  };

  return (
    <div
      className="w-[100%] xl:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      {/* tabs */}
      <div className="h-[67px] flex gap-[8px] sm:gap-[15px] overflow-auto">
        {!loader ? (
          <>
            {data?.map((item: any) => (
              <div
                className={`sports-left-top-tabs shadow-sm ${tab == "4" && item?.name === "cricket"
                  ? "bg-[#f3f3f3] border"
                  : tab == "1" && item?.name === "soccer" ? "bg-[#f3f3f3] border"
                    : tab == "2" && item?.name === "tennis" ? "bg-[#f3f3f3] border"
                      : " bg-white"
                  }`}
                style={{ borderColor: webColor }}
                onClick={() => {
                  fn_controlTabs(item?.name === "cricket" ? "4" : item?.name === "soccer" ? "1" : item?.name === "tennis" ? "2" : "");
                  setContentLoader(true);
                }}
              >
                {item?.name === "cricket" && <Lottie animationData={cricketAnimation} loop={true} className="h-[27px] sm:h-[30px]" />}
                {item?.name === "soccer" && <Lottie animationData={footballAnimation} loop={true} className="h-[27px] sm:h-[30px]" />}
                {item?.name === "tennis" && <Lottie animationData={tennisAnimation} loop={true} className="h-[27px] sm:h-[30px]" />}
                <p className="font-[500] text-[14px] capitalize">{item?.name}</p>
              </div>
            ))}
            <div
              className={`sports-left-top-tabs shadow-sm bg-white`}
              style={{ borderColor: webColor }}
              onClick={() => toast.error("Coming Soon")}
            >
              <Lottie animationData={spadesAnimation} loop={true} className="h-[27px] sm:h-[30px]" />
              <p className="font-[500] text-[14px] capitalize">Casino</p>
            </div>
          </>
        ) : (
          <div className="p-[18px]"><Loader color={webColor} size={25} /></div>
        )}
      </div>
      {!contentLoader ? (
        <AllTabs sportPermission={sportPermission} webColor={webColor} competitions={marketData} tab={tab} />
      ) : (
        <div className="mb-[10px] mt-[15px]" style={{ minHeight: `${window.innerHeight - 340}px` }}><Loader size={25} color={webColor} /></div>
      )}
      <Footer />
    </div>
  );
};

export default LeftSection;

const AllTabs = ({ webColor, competitions, tab, sportPermission }: { webColor: string; competitions: any; tab: any, sportPermission: any }) => {
  const [competitionsId, setCompetitionsId] = useState<any>([]);

  // Sort competitions based on totalMatched in descending order
  const sortedCompetitions = competitions.sort((a: any, b: any) => {
    const totalMatchedA = a.events.reduce((sum: number, event: any) => sum + event.odd.totalMatched, 0);
    const totalMatchedB = b.events.reduce((sum: number, event: any) => sum + event.odd.totalMatched, 0);
    return totalMatchedB - totalMatchedA;
  });

  const fn_updateCompetitionsId = (id: string) => {
    setCompetitionsId((prevIds: any) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((existingId: string) => existingId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]" style={{ minHeight: `${window.innerHeight - 330}px` }}>
      {sortedCompetitions?.length > 0 ? sortedCompetitions?.map((comp: any) => (
        <div key={comp?.competitionId}>
          <div
            onClick={() => fn_updateCompetitionsId(comp?.competitionId)}
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
                <List event={event} webColor={webColor} tab={tab} compName={comp?.competitionName} sportPermission={sportPermission} />
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

const List = ({ event, webColor, tab, compName, sportPermission }: any) => {

  const dispatch = useDispatch();
  const [odds, setOdds] = useState<any>({});
  const smallText = tab === "4" ? "cricket" : tab === "1" ? "soccer" : tab === "2" ? "tennis" : "";

  const fn_getUpdatedOdds = async () => {
    const response = await getMarketOddsApi(event?.market_id);
    if (response?.status) {
      setOdds(response?.data)
    }
  }

  useEffect(() => {
    fn_getUpdatedOdds();
  }, [event]);

  return (
    <a
      href={sportPermission?.[smallText] === false ? "#" : `/match?sportId=${tab}&eventId=${event?.eventId}`}
      className={`min-h-[65px] relative border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] ${sportPermission?.[smallText] === false ? "cursor-not-allowed" : "cursor-pointer"}`}
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
      {sportPermission?.[smallText] === false && (
        <div className="absolute w-full h-full bg-black opacity-60 left-0 top-0 z-50 flex justify-center items-center">
          <FaLock className="text-center text-white text-[20px]" />
        </div>
      )}
      <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
        <p className="text-[14px]">
          {event?.matchName}
        </p>
        {new Date() >= new Date(event?.openDate) && (
          <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
            Live
            <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center min-h-[65px] md:min-h-auto">
        {new Date() >= new Date(event?.openDate) && (
          <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
            Live
            <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
          </div>
        )}
        {odds?.numberOfRunners === 3 ? (
          <>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[0]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[0]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[0]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[0]?.ex?.availableToLay[0]?.size}
              </p>
            </div>

            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[2]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[2]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[2]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[2]?.ex?.availableToLay[0]?.size}
              </p>
            </div>

            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[1]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[1]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[1]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[1]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[0]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[0]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[0]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[0]?.ex?.availableToLay[0]?.size}
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
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[1]?.ex?.availableToBack[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[1]?.ex?.availableToBack[0]?.size}
              </p>
            </div>
            <div
              className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
            >
              <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                {odds?.runners?.[1]?.ex?.availableToLay[0]?.price}
              </p>
              <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                {odds?.runners?.[1]?.ex?.availableToLay[0]?.size}
              </p>
            </div>
          </>
        )}
      </div>
    </a>
  );

};
