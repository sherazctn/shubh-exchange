import { useEffect } from "react";
import aos from "aos";

import sports from "../../assets/sports.png";
import inPlay from "../../assets/inplay.png";
import casino from "../../assets/casino.png";
import trophy from "../../assets/trophy.png";

const CardsSection = () => {
  useEffect(() => {
    aos.init();
  }, []);
  return (
    <div className="mt-[15px] grid grid-cols-2 lg:grid-cols-4 gap-[8px]">
      <a href="/all-sports" data-aos="zoom-in" data-aos-duration="500" className="home-cards-section shadow-sm">
        <img alt="sports" src={sports} className="h-[25px]" />
        <p className="text-[13px] font-[500]">Sports</p>
      </a>
      <a href="/in-play" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="250" className="home-cards-section shadow-sm">
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
      </a>
    </div>
  );
};

export default CardsSection;
