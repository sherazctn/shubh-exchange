import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeroSection from "../../components/home/HeroSection";
import CardsSection from "../../components/home/cardsSection";
import { updateMobileMenu, updatePageNav } from "../../features/features";
// live matches
import CricketDropdownsSection from "../../components/home/DropdownsSection";
import SoccerDropdownsSection from "../../components/home/SoccerDropdownSection";
import TennisDropdownsSection from "../../components/home/TennisDropdownSection";
// upcoming matches
import UpcomingCricketMatches from "../../components/home/UpcomingCricketMatches";
import UpcomingSoccerMatches from "../../components/home/UpcomingSoccerMatches";

import CasinoSlider from "../../components/home/CasinoSlider";
// footer
import Footer from "../../components/footer/page";

const Home = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: any) => state.showSidebar);
  useEffect(() => {
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("home"));
  }, [dispatch]);
  return (
    <div
      className={`content pt-[68px] sm:pt-[78px] ${
        showSidebar
          ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
          : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
      } pe-[10px] sm:pe-[20px]`}
    >
      <HeroSection />
      <CardsSection />
      {/* live matches */}
      <CricketDropdownsSection text={"Live Cricket Match"} />
      <SoccerDropdownsSection text={"Live Soccer"} />
      <TennisDropdownsSection text={"Live Tennis"} />
      {/* upcoming matches */}
      <UpcomingCricketMatches text={"Cricket"} />
      <UpcomingSoccerMatches text={"Soccer"} />
      <UpcomingSoccerMatches text={"Tennis"} />
      {/* casino slider */}
      <CasinoSlider />
      <hr className="border-[1px] border-gray-300 my-[40px]" />
      <Footer />
    </div>
  );
};

export default Home;
