import { useSelector } from "react-redux";

import Sidebar from "../../components/sidebar/page";
import HeroSection from "../../components/home/HeroSection";
import CardsSection from "../../components/home/cardsSection";
// live matches
import CricketDropdownsSection from "../../components/home/DropdownsSection";
import SoccerDropdownsSection from "../../components/home/SoccerDropdownSection";
import TennisDropdownsSection from "../../components/home/TennisDropdownSection";
// upcoming matches
import UpcomingCricketMatches from "../../components/home/UpcomingCricketMatches";
import UpcomingSoccerMatches from "../../components/home/UpcomingSoccerMatches";
// footer
import Footer from "../../components/footer/page";

const Home = () => {
  const showSidebar = useSelector((state: any) => state.showSidebar);
  return (
    <div className="main-section">
      <Sidebar />
      <div
        className={`content pt-[68px] sm:pt-[78px] ${
          showSidebar
            ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
            : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
        } pe-[10px] sm:pe-[20px] pb-[20px] transition-all duration-500`}
      >
        <HeroSection />
        <CardsSection />
        {/* live matches */}
        <CricketDropdownsSection text={"Live Cricket"} />
        <SoccerDropdownsSection text={"Live Soccer"} />
        <TennisDropdownsSection text={"Live Tennis"} />
        {/* upcoming matches */}
        <UpcomingCricketMatches text={"Cricket"} />
        <UpcomingSoccerMatches text={"Soccer"} />
        <UpcomingSoccerMatches text={"Tennis"} />
        <hr className="border-[1px] border-gray-300 my-[40px]" />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
