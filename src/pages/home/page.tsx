import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/footer/page";
import HeroSection from "../../components/home/HeroSection";
import CardsSection from "../../components/home/cardsSection";
import CasinoSlider from "../../components/home/CasinoSlider";
import { updateMobileMenu, updatePageNav } from "../../features/features";
import CricketDropdownsSection from "../../components/home/DropdownsSection";

const Home = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const redisGames = useSelector((state: any) => state.redisGames);
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
      {sportIds?.length > 0 && sportIds?.map((sportid) => (
        <CricketDropdownsSection text={`Live ${sportid === '4' ? "Cricket Matches" : sportid === '1' ? "Soccer Matches" : "Tennis Matches"}`} id={sportid} />
      ))}
      <CasinoSlider />
      <hr className="border-[1px] border-gray-300 my-[40px]" />
      <Footer />
    </div>
  );
};

export default Home;
