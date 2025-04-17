import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

import Footer from "../footer/page";
import MainMarkets from './MainMarkets';
import NormalMarkets from './NormalMarkets';
import RightSlider from "../sports/RightSlider";

const LiveCricketLeftSection2 = ({ allEventsOdds, eventDetails, extraMarkets, markets, selectedEvent, runners, sportId, eventId }: any) => {

  const [tabs, setTabs] = useState("Main");
  const [oddsPrice, setOddsPrice] = useState([]);
  const divHeight = `${window.innerHeight - 60}px`;
  const user = useSelector((state: any) => state.user);
  const [cricketScore, setCricketScore] = useState({});
  const [matchOdds, setMatchOdds] = useState<string[]>([]);

  const oddRate = useSelector((state: any) => state.oddRate);
  const webColor = useSelector((state: any) => state.websiteColor);
  const pendingBets = useSelector((state: any) => state.pendingBets);

  const oneTouchEnable = useSelector((state: any) => state.oneTouchEnable);
  const trigger = useSelector((state: any) => state.trigger);

  const eventDate: any = eventDetails?.date ? parseISO(eventDetails.date) : null;
  const [eventsCompleteDetail, setEventCompleteDetail] = useState<any>(null);

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

  useEffect(() => {
    if (sportId === "4") {
      // fn_getCricketScore();
      setInterval(() => {
        // fn_getCricketScore();
      }, 1500);
    };
  }, []);

  useEffect(() => {
    if (allEventsOdds?.length > 0 && eventDetails?.markets) {
      const updatedMarkets = eventDetails.markets.map((market: any) => {
        const singleMarketOdds = allEventsOdds.find((m: any) => m.marketId === market.marketId);

        const updatedRunners = market.runners.map((r: any) => {
          const runnerOdds = singleMarketOdds?.runners?.find((run: any) => run.selectionId === r.selectionId);
          return {
            ...r,
            ex: runnerOdds?.ex || null,
          };
        });

        return {
          ...market,
          runners: updatedRunners,
        };
      });
      setEventCompleteDetail({ ...eventDetails, markets: updatedMarkets });
    }
  }, [allEventsOdds]);

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="sm:min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[10px] sm:p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[19px] text-center hidden sm:block">{eventDetails?.competitionName}</p>
        <p className="text-[17px] sm:text-[23px] font-[700] sm:font-[500] text-center">{eventDetails?.eventName}</p>
        <button className="live-match-btn mt-[3px] sm:mt-[10px]">{getEventDisplayText()}</button>
      </div>
      <div className="w-full mb-[10px] block lg:hidden">
        <RightSlider sportId={sportId} eventId={eventId} cricketScore={cricketScore} selectedEvent={selectedEvent} webColor={webColor} />
      </div>

      <div style={{ minHeight: `${window.innerHeight - 490}px` }}>
        <div className="flex flex-col gap-[10px]">
          {eventsCompleteDetail?.markets?.map((item: any) => {
            const filterData = null;
            if ((item?.marketName === "Match Odds" || item?.marketName === "Tied Match") && sportId == "4") return;
            return <NormalMarkets singleMarket={item} oddsPrice={oddsPrice} market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} sportId={sportId} eventId={eventId} pendingBets={pendingBets} oneTouchEnable={oneTouchEnable} trigger={trigger} oddRate={oddRate} eventName={eventDetails?.eventName} />
          })}
          {extraMarkets?.map((market: any) => {
            if (market?.mname === "oddeven") return;
            const marketType = (market?.mname === "MATCH_ODDS" || market?.mname === "TIED_MATCH") ? "m1" : (market?.mname === "Bookmaker") ? "m3" : "m2";
            return (
              <MainMarkets market={market} marketType={marketType} webColor={webColor} eventId={eventId} tabs={tabs} eventName={eventDetails?.eventName} pendingBets={pendingBets} oneTouchEnable={oneTouchEnable} trigger={trigger} />
            )
          })}
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default LiveCricketLeftSection2;
