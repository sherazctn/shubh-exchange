import sports from "../../assets/sports.png";
import inPlay from "../../assets/inplay.png";
import casino from "../../assets/casino.png";
import trophy from "../../assets/trophy.png";

const CardsSection = () => {
  return (
    <div className="mt-[15px] flex gap-[8px]">
        <div className="home-cards-section shadow-sm">
            <img alt="sports" src={sports} className="h-[25px]" />
            <p className="text-[13px] font-[500]">Sports</p>
        </div>
        <div className="home-cards-section shadow-sm">
            <img alt="inPlay" src={inPlay} className="h-[25px]" />
            <p className="text-[13px] font-[500]">In-Play</p>
        </div>
        <div className="home-cards-section shadow-sm">
            <img alt="casino" src={casino} className="h-[25px]" />
            <p className="text-[13px] font-[500]">Live Casino</p>
        </div>
        <div className="home-cards-section shadow-sm">
            <img alt="trophy" src={trophy} className="h-[25px]" />
            <p className="text-[13px] font-[500]">Slots</p>
        </div>
    </div>
  )
}

export default CardsSection