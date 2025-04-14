import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import RightSection from "../../components/sports/RightSection";
import { fn_getMarketsApi, fn_getMarketsOddsApi } from "../../api/newApis";
import LiveCricketLeftSection2 from "../../components/cricket/LiveCricketLeftSection2";
import { updateMobileMenu, updatePageNav, updateSelectedEvent } from "../../features/features";
import { getExtraMarketsByEventIdApi, retrieveMarketsToRedisApi, retrieveUpdatedOddsToRedisApi } from "../../api/api";

const LiveCricket = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const sportId = params.get('sportId');
  const eventId = params.get('eventId');
  const [markets, setMarkets] = useState([]);
  const [runners, setRunners] = useState([]);
  const [marketIds, setMarketIds] = useState([]);
  const [bookmaker, setBookmaker] = useState([]);
  const [extraMarkets, setExtraMarkets] = useState([]);
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const selectedEvent = useSelector((state: any) => state.selectedEvent);
  const sportPermission = useSelector((state: any) => state.sportPermission);

  const [eventDetails, setEventDetails] = useState<any>(null);
  const [allEventsOdds, setAllEventsOdds] = useState<any>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!sportId) return navigate("/");
    if (!eventId) return navigate("/");
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("cricket"));
    // if (sportPermission?.[sportId === "4" ? "cricket" : sportId === "1" ? "soccer" : sportId === "2" ? "tennis" : ""] === false) {
    //   window.location.href = "/";
    //   return;
    // }
    // fn_getMarket();
    // fn_getMarkets();
    // fn_getExtraMarkets();
    // fn_getMarketsByInterval();
    // if (Object.keys(selectedEvent)?.length === 0) {
    //   const storedEvent = localStorage.getItem('selectedEvent');
    //   if (storedEvent) {
    //     dispatch(updateSelectedEvent(JSON.parse(storedEvent)));
    //   } else {
    //     navigate("/");
    //   }
    // }
  }, [dispatch, sportId, eventId, selectedEvent, sportPermission]);

  // useEffect(() => {
  //   if (marketIds?.length > 0) {
  //     fn_getUpdatedOdds();
  //   }

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //       intervalRef.current = null;
  //     }
  //   };
  // }, [marketIds, location]);

  const fn_getMarket = async () => {
    const data = { sportId, eventId };
    const response = await retrieveMarketsToRedisApi(data);
    if (response?.status) {
      setMarkets(response?.data?.data);
      setRunners(response?.data?.runners);
      setMarketIds(response?.data?.marketIds);
      setBookmaker(response?.data?.bookmakersData);
    } else {
      // navigate("");
    }
  };

  const fn_getUpdatedOdds = async () => {
    if (location.pathname.includes("/match")) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(async () => {
        const response = await retrieveUpdatedOddsToRedisApi(marketIds);
        const updatedMarkets: any = markets.map((market: any) => {
          const updatedOdd = response?.data?.find((res: any) => res.marketId === market.marketId);
          return { ...market, odds: updatedOdd || null };
        });
        setMarkets(updatedMarkets);
      }, 500);
    }
  };

  const fn_getExtraMarkets = async () => {
    const response = await getExtraMarketsByEventIdApi(eventId);
    if (response?.status) {
      setExtraMarkets(response?.data);
    }
    setInterval(async () => {
      const response = await getExtraMarketsByEventIdApi(eventId);
      if (response?.status) {
        setExtraMarkets(response?.data);
      }
    }, 2000);
  };

  useEffect(() => {
    fn_getMarkets();

    const marketInterval = setInterval(() => {
      fn_getMarkets()
    }, 5 * 60 * 1000);

    return () => clearInterval(marketInterval);
  }, []);

  useEffect(() => {
    if (eventDetails) {
      fn_getMarketsOdds();

      const oddsInterval = setInterval(() => {
        fn_getMarketsOdds();
      }, 1000);

      return () => clearInterval(oddsInterval);
    }
  }, [eventDetails]);

  const fn_getMarkets = async () => {
    const data = { sportId, eventId };
    const response = await fn_getMarketsApi(data);
    if (response?.status) {
      setEventDetails(response?.data);
    }
  };

  const fn_getMarketsOdds = async () => {
    const response = await fn_getMarketsOddsApi(eventDetails?.formattedMarketIds);
    if (response?.status) {
      setAllEventsOdds(response?.data);
    }
  };

  return (
    <div className={`content pt-[68px] sm:pt-[60px] ${showSidebar ? "ps-[2px] sm:ps-[20px] lg:ps-[285px]" : "ps-[2px] sm:ps-[20px] lg:ps-[85px]"} pe-[2px] sm:pe-[20px] flex`}>
      <LiveCricketLeftSection2 allEventsOdds={allEventsOdds} eventDetails={eventDetails} extraMarkets={extraMarkets} markets={markets} selectedEvent={selectedEvent} runners={runners} sportId={sportId} eventId={eventId} bookmaker={bookmaker} />
      <RightSection sportId={sportId} eventId={eventId} selectedEvent={selectedEvent} />
    </div>
  );
};

export default LiveCricket;