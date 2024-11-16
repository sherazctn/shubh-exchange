import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { retrieveMarketsToRedisApi } from "../../api/api";
import RightSection from "../../components/sports/RightSection";
import { updateMobileMenu, updatePageNav, updateSelectedEvent } from "../../features/features";
import LiveCricketLeftSection from "../../components/cricket/LiveCricketLeftSection";

const LiveCricket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sportId = params.get('sportId');
  const eventId = params.get('eventId');
  const [markets, setMarkets] = useState([]);
  const [runners, setRunners] = useState([]);
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const liveCricket = useSelector((state: any) => state.liveCricket);
  const selectedEvent = useSelector((state: any) => state.selectedEvent);
  useEffect(() => {
    if (!sportId) return navigate("/");
    if (!eventId) return navigate("/");
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("cricket"));
    fn_getMarket();
    if (Object.keys(selectedEvent)?.length === 0) {
      const storedEvent = localStorage.getItem('selectedEvent');
      if (storedEvent) {
        dispatch(updateSelectedEvent(JSON.parse(storedEvent)));
      } else {
        navigate("/");
      }
    }
  }, [dispatch, sportId, eventId, selectedEvent]);
  const fn_getMarket = async () => {
    const data = { sportId, eventId };
    const response = await retrieveMarketsToRedisApi(data);
    if (response?.status) {
      setMarkets(response?.data?.data);
      setRunners(response?.data?.runners);
    } else {
      navigate("");
    }
  };
  const singleLiveCricket = liveCricket?.find((item: any) => item?.Id);
  return (
    <div className={`content pt-[68px] sm:pt-[60px] ${showSidebar ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]" : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"} pe-[10px] sm:pe-[20px] flex`}>
      <LiveCricketLeftSection singleLiveCricket={singleLiveCricket} markets={markets} selectedEvent={selectedEvent} runners={runners} />
      <RightSection />
    </div>
  );
};

export default LiveCricket;
