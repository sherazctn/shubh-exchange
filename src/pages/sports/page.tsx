import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateMobileMenu } from "../../features/features";
import RightSection from "../../components/sports/RightSection";
import LeftSection from "../../components/sports/LeftSection";

const Sports = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: any) => state.showSidebar);
  useEffect(() => {
    dispatch(updateMobileMenu(false));
  }, [dispatch]);
  return (
    <div
      className={`content pt-[68px] sm:pt-[60px] ${
        showSidebar
          ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
          : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
      } pe-[10px] sm:pe-[20px] flex`}
    >
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default Sports;
