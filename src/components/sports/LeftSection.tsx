import AOS from "aos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

import { IoIosArrowUp } from "react-icons/io";

import Footer from "../footer/page";
import URL, { getAvailableGames, getSingleMarketOddsApi } from "../../api/api";
import Loader from "../Loader";

const LeftSection = () => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [tab, setTab] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const eventData = useSelector((state: any) => state.eventData);
  const [singleEventData, setSingleEventData] = useState({});
  useEffect(() => {
    AOS.init({ once: true });
    fn_getGames();
  }, []);
  useEffect(() => {
    if (eventData?.length > 0 && tab !== "") {
      setLoader(false);
      setSingleEventData(eventData?.find((i: any) => i.sportName === tab));
    }
  }, [eventData, tab]);
  const fn_controlTabs = (id: string) => {
    setTab(id)
  };
  const fn_getGames = async () => {
    setLoader(true)
    const response: any = await getAvailableGames();
    if (response?.status) {
      setData(response?.data);
      setTab(response?.data[0]?.name);
      if (eventData?.length > 0) {
        setLoader(false);
        setSingleEventData(eventData?.find((i: any) => i.sportName === response?.data[0]?.name));
      }
    } else {
      setLoader(false);
    }
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
              className={`sports-left-top-tabs shadow-sm ${tab === item?.name
                ? "bg-[#f3f3f3] border"
                : " bg-white"
                }`}
              style={{ borderColor: webColor }}
              onClick={() => fn_controlTabs(item?._id)}
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
      {!loader ? Object.keys(singleEventData)?.length > 0 && <CricketTab singleEventData={singleEventData} webColor={webColor} tab={tab} /> : (<div className="flex justify-center py-[20px]"><Loader color={webColor} size={25} /></div>)}
      <br />
      <Footer />
    </div>
  );
};

export default LeftSection;

const List = ({ webColor, event, tab }: { webColor: string; event: any; tab: string }) => {
  const [loader, setLoader] = useState(true);
  const currentDate = new Date();
  const eventDate = new Date(event?.date);
  const isLive = eventDate <= currentDate;
  const eventDateString = parseISO(event?.date);
  const [odds, setOdds] = useState<any>({});

  let dayLabel;
  if (isToday(eventDateString)) {
    dayLabel = 'Live';
  } else if (isTomorrow(eventDateString)) {
    dayLabel = 'Tomorrow';
  } else if (eventDateString > currentDate) {
    dayLabel = format(eventDateString, 'dd MMM yyyy');
  } else {
    dayLabel = 'Live';
  }

  const timeLabel = format(eventDateString, 'HH:mm');

  const fn_getOdds = async () => {
    const response = await getSingleMarketOddsApi(event.eventId, tab === "soccer" ? 1 : tab === "tennis" ? 2 : tab === "cricket" ? 4 : null);
    setLoader(false);
    if (response?.status) {
      setOdds(response?.data?.data);
    }
  };
  useEffect(() => {
    fn_getOdds();
  }, []);
  return (
    <div className="border-b p-[7px] flex flex-col lg:flex-row gap-[10px] items-center justify-between cursor-pointer">
      <div className="flex gap-[10px] w-full lg:w-auto">
        <div className="min-w-[70px] sm:min-w-[80px] h-[50px] text-[--text-color] sm:h-[55px] rounded-[7px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
          <p className="text-[11px] sm:text-[13px] font-[500]">{timeLabel}</p>
          <p className="text-[10px] sm:text-[12px] font-[500]">{dayLabel}</p>
        </div>
        <div className="flex flex-col gap-[5px] justify-center">
          <p className="text-[11px] sm:text-[13px] font-[500]">
            {event?.eventName}
          </p>
          {isLive && (
            <p className="text-[10px] text-[--text-color] sm:text-[12px] font-[500] px-[10px] rounded-[7px] py-[3px] w-[max-content]" style={{ backgroundColor: webColor }}>
              Live
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end flex-wrap gap-[6px] sm:gap-[10px]">
        {loader ? (
          <Loader color={webColor} size={25} />
        ) : odds ? (
          <>
            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[0]?.ex?.availableToBack?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[0]?.ex?.availableToBack?.[0].size}
              </p>
            </div>
            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--red] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[0]?.ex?.availableToLay?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[0]?.ex?.availableToLay?.[0].size}
              </p>
            </div>

            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[1]?.ex?.availableToBack?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[1]?.ex?.availableToBack?.[0].size}
              </p>
            </div>
            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--red] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[1]?.ex?.availableToLay?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[1]?.ex?.availableToLay?.[0].size}
              </p>
            </div>

            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[2]?.ex?.availableToBack?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[2]?.ex?.availableToBack?.[0].size}
              </p>
            </div>
            <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--red] flex flex-col gap-[4px] justify-center items-center">
              <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
                {odds?.runners?.[2]?.ex?.availableToLay?.[0].price}
              </p>
              <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
                {odds?.runners?.[2]?.ex?.availableToLay?.[0].size}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div >
  );
};

const CricketTab = ({ webColor, singleEventData, tab }: { webColor: string; singleEventData: any, tab: string }) => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      {singleEventData?.competitions?.map((competition: any) => (
        <div>
          <div
            onClick={() => setSub1(!sub1)}
            className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
            style={{ backgroundColor: webColor }}
          >
            <p className="text-[13px] sm:text-[15px] font-[500]">{competition?.competitionName}</p>
            <div className="flex items-center gap-[10px]">
              <p className="text-[13px] sm:text-[15px] font-[500]">{competition?.events?.length}</p>
              <IoIosArrowUp
                className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"
                  }`}
              />
            </div>
          </div>
          {sub1 && (
            <div className="bg-white rounded-b-[7px]">
              {competition?.events?.map((event: any) => (
                <List webColor={webColor} event={event} tab={tab} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
