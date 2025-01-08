import aos from "aos";
import { useEffect } from "react";
import Lottie from "lottie-react";
import toast from "react-hot-toast";

import cricketAnimation from "../../assets/animations/cricket.json";
import tennisAnimation from "../../assets/animations/tennis.json";
import footballAnimation from "../../assets/animations/football-player.json";
import aviatorAnimation from "../../assets/animations/aviator.json";
import spadesAnimation from "../../assets/animations/spades.json";
import matkaAnimation from "../../assets/animations/matka.json";
// import inPlay from "../../assets/inplay.png";
// import casino from "../../assets/casino.png";
// import trophy from "../../assets/trophy.png";

const CardsSection = () => {
  useEffect(() => {
    aos.init();
  }, []);
  return (
    <div className="mt-[15px] grid grid-cols-3 lg:grid-cols-6 gap-[8px]">
      <a href="/all-sports?game=cricket" data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={cricketAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Cricket</p>
      </a>
      <a href="/all-sports?game=tennis" data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={tennisAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Tennis</p>
      </a>
      <a href="/all-sports?game=soccer" data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={footballAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Soccer</p>
      </a>
      <button onClick={() => toast.error("Coming Soon")} data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={aviatorAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Aviator</p>
      </button>
      <button onClick={() => toast.error("Coming Soon")} data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={spadesAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Casino</p>
      </button>
      <button onClick={() => toast.error("Coming Soon")} data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <Lottie animationData={matkaAnimation} loop={true} className="h-[50px] sm:h-[60px]" />
        <p className="text-[13px] font-[500]">Matka</p>
      </button>
      {/* <a href="/in-play" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="250" className="home-cards-section shadow-sm">
        <img alt="inPlay" src={inPlay} className="h-[25px]" />
        <p className="text-[13px] font-[500]">In-Play</p>
      </a>
      <a href="/casino" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500" className="home-cards-section shadow-sm">
        <img alt="casino" src={casino} className="h-[25px]" />
        <p className="text-[13px] font-[500]">Live Casino</p>
      </a>
      <a href="#" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="750" className="home-cards-section shadow-sm">
        <img alt="trophy" src={trophy} className="h-[25px]" />
        <p className="text-[13px] font-[500]">Slots</p>
      </a> */}
    </div>
  );
};

export default CardsSection;
