import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateMobileMenu, updatePageNav } from "../../features/features";
import RightSection from "../../components/sports/RightSection";
import LiveCricketLeftSection from "../../components/cricket/LiveCricketLeftSection";

const LiveCricket = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const liveCricket = useSelector((state: any) => state.liveCricket);
  useEffect(() => {
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("cricket"));
  }, [dispatch]);
  const singleLiveCricket = liveCricket?.find((item: any) => item?.Id);
  return (
    <div className={`content pt-[68px] sm:pt-[60px] ${showSidebar ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]" : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"} pe-[10px] sm:pe-[20px] flex`}>
      <LiveCricketLeftSection singleLiveCricket={singleLiveCricket} />
      <RightSection />
    </div>
  );
};

export default LiveCricket;
