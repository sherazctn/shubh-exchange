import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import RightSlider from "./RightSlider";

import { updateSelectedEvent } from "../../features/features";
import URL, { fn_getCricketScoreApi, getPopularCricketEventsApi } from "../../api/api";

const RightSection = ({ sportId, eventId, selectedEvent }: any) => {
  const dispatch = useDispatch();
  const divHeight = `${window.innerHeight - 60}px`;
  const [showCasino, setShowCasino] = useState(true);
  const [popularEvents, setPopularEvents] = useState(true);
  const [popularEventsData, setPopularEventsData] = useState([]);
  const [cricketScore, setCricketScore] = useState({});

  const webColor = useSelector((state: any) => state.websiteColor);

  const redisGames = useSelector((state: any) => state.redisGames);
  const cricketSport = redisGames?.find((sport: any) => sport?.id == 4);

  const fn_getPopularEvents = async () => {
    const response = await getPopularCricketEventsApi();
    if (response?.status) {
      setPopularEventsData(response?.data);
    }
  }

  const fn_getCricketScore = async () => {
    const response = await fn_getCricketScoreApi(eventId);
    if (response?.status) {
      setCricketScore(response?.data);
    }
  }

  useEffect(() => {
    fn_getPopularEvents();
    // if (sportId === "4") {
    //   fn_getCricketScore();
    //   setInterval(() => {
    //     fn_getCricketScore();
    //   }, 1500);
    // }
  }, []);

  return (
    <div className="hidden lg:block w-[350px] xl:w-[450px] min-w-[350px] xl:min-w-[450px] pt-[13px] pb-[20px] overflow-auto" style={{ maxHeight: divHeight }}>
      <div className="rounded-[7px] p-[7px] bg-white">
        <button
          className={`sports-right-top-btn text-[--text-color] ${showCasino && "mb-[7px]"}`}
          style={{ backgroundColor: webColor }}
          onClick={() => setShowCasino(!showCasino)}
        >
          Live Match
        </button>
        {showCasino && <RightSlider cricketScore={cricketScore} sportId={sportId} eventId={eventId} selectedEvent={selectedEvent} webColor={webColor} />}
      </div>
      <div className="rounded-[7px] p-[7px] bg-white mt-[7px]">
        <button
          className={`sports-right-top-btn text-[--text-color] ${popularEvents && "mb-[7px]"}`}
          style={{ backgroundColor: webColor }}
          onClick={() => setPopularEvents(!popularEvents)}
        >
          Popular Events
        </button>
        {popularEvents && cricketSport && (
          <div className="px-[5px]">
            {popularEventsData?.slice(0, 7)?.map((event) => (
              <PopularEvents event={event} dispatch={dispatch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;

const PopularEvents = ({ event, dispatch }: any) => {

  const redisGames = useSelector((state: any) => state.redisGames);
  const cricketSport = redisGames?.find((sport: any) => sport?.id == 4);

  const eventDate: any = event?.date ? parseISO(event.date) : event?.openDate ? parseISO(event.openDate) : null;

  const getEventDisplayText = () => {
    if (!eventDate) return '';

    const currentDate = new Date();

    // If event is in the past
    if (isBefore(eventDate, currentDate)) {
      return "Live";
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
    <a
      onClick={() => {
        dispatch(updateSelectedEvent({
          competitionName: event?.competitionName,
          eventId: event?.match_id,
          eventName: event?.matchName,
          date: event?.date || event?.openDate
        }));
        localStorage.setItem('selectedEvent', JSON.stringify({
          competitionName: event?.competitionName,
          eventId: event?.eventId,
          eventName: event?.eventName,
          date: event?.date || event?.openDate
        }))
      }}
      href={`/match?sportId=4&eventId=${event?.eventId}`}
      key={event?.eventId}
      className="min-h-[50px] border-b flex justify-between items-center"
    >
      <div className="flex items-center gap-[15px]">
        <img alt="img" src={`${URL}/${cricketSport?.image}`} className="w-[21px] h-[21px]" />
        <div>
          <p className="text-[12px] font-[500] leading-[14px]">{event?.eventName?.split(" v ")[0]}</p>
          <p className="text-[11px] font-[500] leading-[12px]">{event?.eventName?.split(" v ")[1]}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-[500] leading-[12px]">{getEventDisplayText()}</p>
        {/* <div className="text-[12px] flex justify-end gap-1">
          <p className="text-[10px] bg-gray-300 py-[1px] px-[4px] rounded-[2px] w-[max-content]">
            F4
          </p>
          <p className="text-[10px] bg-gray-300 py-[1px] px-[4px] rounded-[2px] w-[max-content]">
            B
          </p>
        </div> */}
      </div>
    </a>
  );
};
