import { useEffect, useState } from "react";
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
  const redisGames = useSelector((state: any) => state.redisGames);
  const [loader, setLoader] = useState(true);
  const [sportIds, setSportIds] = useState([]);
  useEffect(() => {
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("home"));
  }, [dispatch]);
  useEffect(() => {
    const savedGameData = localStorage.getItem('eventData');
    const gameData = redisGames;
    if (gameData) {
      return setSportIds(gameData?.map((game: any) => `${game?.id}`));
    } else if (savedGameData) {
      return setSportIds(JSON.parse(savedGameData)?.map((game: any) => `${game?.sportId}`));
    } else {
      return console.log("nothing");
    }
  }, [redisGames]);
  return (
    <div
      className={`content pt-[68px] sm:pt-[78px] ${showSidebar
        ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
        : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
        } pe-[10px] sm:pe-[20px]`}
    >
      <HeroSection />
      <CardsSection />
      {/* live matches */}
      {sportIds?.length > 0 && sportIds?.map((sportid) => (
        <CricketDropdownsSection text={`Live ${sportid === '4' ? "Cricket Matches" : sportid === '1' ? "Soccer Matches" : "Tennis Matches"}`} id={sportid} />
      ))}
      {/* <SoccerDropdownsSection text={"Live Soccer"} /> */}
      {/* <TennisDropdownsSection text={"Live Tennis"} /> */}
      {/* upcoming matches */}
      {/* <UpcomingCricketMatches text={"Cricket"} /> */}
      {/* <UpcomingSoccerMatches text={"Soccer"} /> */}
      {/* casino slider */}
      <CasinoSlider />
      <hr className="border-[1px] border-gray-300 my-[40px]" />
      <Footer />
    </div>
  );
};

export default Home;
