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
  const [sportIds, setSportIds] = useState([]);
  const redisGames = useSelector((state: any) => state.redisGames);
  const showSidebar = useSelector((state: any) => state.showSidebar);
  useEffect(() => {
    dispatch(updateMobileMenu(false));
    dispatch(updatePageNav("home"));
  }, [dispatch]);
  useEffect(() => {
    const savedGameData = localStorage.getItem('eventData');
    const gameData = redisGames;
    if (gameData) {
      return setSportIds(gameData?.map((game: any) => `${game?.id}`).sort((a: any, b: any) => parseInt(b?.sportid) - parseInt(a?.sportId)));
    } else if (savedGameData && savedGameData !== "undefined") {
      return setSportIds(JSON.parse(savedGameData)?.map((game: any) => `${game?.sportId}`));
    } else {
      return console.log("nothing");
    }
  }, [redisGames]);
  return (
    <div
      className={`content pt-[78px] sm:pt-[78px] ${showSidebar
        ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
        : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
        } pe-[10px] sm:pe-[20px]`}
    >
      <HeroSection />
      <CardsSection />
      {sportIds?.find(id => id == "4") && (<CricketDropdownsSection text={`Live Cricket Matches`} id={"4"} smallText={"cricket"} />)}
      {sportIds?.find(id => id == "2") && (<CricketDropdownsSection text={`Live Tennis Matches`} id={"2"} smallText={"tennis"} />)}
      {sportIds?.find(id => id == "1") && (<CricketDropdownsSection text={`Live Soccer Matches`} id={"1"} smallText={"soccer"} />)}
      <CasinoSlider />
      <hr className="border-[1px] border-gray-300 my-[40px]" />
      <Footer />
    </div>
  );
};

export default Home;
