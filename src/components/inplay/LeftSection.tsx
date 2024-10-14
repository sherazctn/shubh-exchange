import aos from "aos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import allTabsImg from "../../assets/inplay.png";
import cricketBall from "../../assets/cricket-ball.png";
import soccerBall from "../../assets/soccer-ball.png";
import tennisBall from "../../assets/tennis-ball.png";
import { IoIosArrowUp } from "react-icons/io";

import Footer from "../footer/page";
import { GoDotFill } from "react-icons/go";

const LeftSection = () => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [allTabs, setAllTabs] = useState(true);
  const [cricketTab, setCricketTab] = useState(false);
  const [soccerTab, setSoccerTab] = useState(false);
  const [tennisTab, setTennisTab] = useState(false);
  const webColor = useSelector((state: any) => state.websiteColor);
  useEffect(() => {
    aos.refresh();
  }, [cricketTab, soccerTab, tennisTab]);
  const fn_controlTabs = (value: string) => {
    if (value === "allTabs") {
      setAllTabs(true);
      setCricketTab(false);
      setSoccerTab(false);
      setTennisTab(false);
    } else if (value === "cricket") {
      setAllTabs(false);
      setCricketTab(true);
      setSoccerTab(false);
      setTennisTab(false);
    } else if (value === "soccer") {
      setAllTabs(false);
      setCricketTab(false);
      setSoccerTab(true);
      setTennisTab(false);
    } else {
      setAllTabs(false);
      setCricketTab(false);
      setSoccerTab(false);
      setTennisTab(true);
    }
  };
  return (
    <div
      className="w-[100%] xl:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      {/* tabs */}
      <div className="h-[67px] flex gap-[8px] sm:gap-[15px] overflow-auto">
        <div
          className={`sports-left-top-tabs shadow-sm ${allTabs
            ? "bg-[#f3f3f3] border border-[--main-color-light]"
            : " bg-white"
            }`}
          onClick={() => fn_controlTabs("allTabs")}
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <img alt="img" src={allTabsImg} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">All</p>
        </div>
        <div
          className={`sports-left-top-tabs shadow-sm ${cricketTab
            ? "bg-[#f3f3f3] border border-[--main-color-light]"
            : " bg-white"
            }`}
          onClick={() => fn_controlTabs("cricket")}
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="250"
        >
          <img alt="img" src={cricketBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Cricket</p>
        </div>
        <div
          className={`sports-left-top-tabs shadow-sm ${soccerTab
            ? "bg-[#f3f3f3] border border-[--main-color-light]"
            : " bg-white"
            }`}
          onClick={() => fn_controlTabs("soccer")}
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="500"
        >
          <img alt="img" src={soccerBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Soccer</p>
        </div>
        <div
          className={`sports-left-top-tabs shadow-sm ${tennisTab
            ? "bg-[#f3f3f3] border border-[--main-color-light]"
            : " bg-white"
            }`}
          onClick={() => fn_controlTabs("tennis")}
          data-aos="zoom-in"
          data-aos-duration="500"
          data-aos-delay="750"
        >
          <img alt="img" src={tennisBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Tennis</p>
        </div>
      </div>
      {allTabs && <AllTabs webColor={webColor} />}
      {cricketTab && <CricketTab webColor={webColor} />}
      {soccerTab && <SoccerTab webColor={webColor} />}
      {tennisTab && <TennisTab webColor={webColor} />}
      <Footer />
    </div>
  );
};

export default LeftSection;

const List = ({ value, webColor }: any) => {
  return (
    <div className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer">
      <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
        <img
          src={
            value === "cricket"
              ? cricketBall
              : value === "soccer"
                ? soccerBall
                : tennisBall
          }
          alt="img"
          className="w-[21px]"
        />
        <p className="text-[14px]">
          Durham <span className="font-[600]">vs</span> Lanchire
        </p>
        <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
          Live
          <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
        </div>
      </div>
      <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center min-h-[65px] md:min-h-auto">
        <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
          Live
          <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[13px] sm:text-[15px]">
            620
          </p>
          <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[15px]">620</p>
          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[15px]">620</p>
          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[15px]">620</p>
          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[15px]">620</p>
          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
        <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
          <p className="font-[800] text-center text-[15px]">620</p>
          <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
            3.35k
          </p>
        </div>
      </div>
    </div>
  );
};

const AllTabs = ({ webColor }: { webColor: string }) => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">Boland T20</p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="cricket" webColor={webColor} />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub2(!sub2)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Mens T20 International
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub2 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub2 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="soccer" webColor={webColor} />
            <List value="soccer" webColor={webColor} />
            <List value="soccer" webColor={webColor} />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub3(!sub3)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Bangladesh Premium League
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub3 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub3 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="tennis" webColor={webColor} />
            <List value="tennis" webColor={webColor} />
          </div>
        )}
      </div>
    </div>
  );
};

const CricketTab = ({ webColor }: { webColor: string }) => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">Boland T20</p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="cricket" webColor={webColor} />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub2(!sub2)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Mens T20 International
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub2 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub2 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="cricket" webColor={webColor} />
            <List value="cricket" webColor={webColor} />
            <List value="cricket" webColor={webColor} />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub3(!sub3)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Bangladesh Premium League
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub3 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub3 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="cricket" webColor={webColor} />
            <List value="cricket" webColor={webColor} />
          </div>
        )}
      </div>
    </div>
  );
};

const SoccerTab = ({ webColor }: { webColor: string }) => {
  const [sub1, setSub1] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Indonesia Liga 1
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="soccer" webColor={webColor} />
            <List value="soccer" webColor={webColor} />
          </div>
        )}
      </div>
    </div>
  );
};

const TennisTab = ({ webColor }: { webColor: string }) => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Dobrish Challenger 2024
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub1 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="tennis" webColor={webColor} />
            <List value="tennis" webColor={webColor} />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub2(!sub2)}
          className="h-[40px] text-[--text-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
          style={{ backgroundColor: webColor }}
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            WTA Guadalajara 2024
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${sub2 ? "" : "-rotate-180"
                }`}
            />
          </div>
        </div>
        {sub2 && (
          <div className="bg-white rounded-b-[7px]">
            <List value="tennis" webColor={webColor} />
            <List value="tennis" webColor={webColor} />
            <List value="tennis" webColor={webColor} />
          </div>
        )}
      </div>
    </div>
  );
};
