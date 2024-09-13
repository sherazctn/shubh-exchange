import { useEffect, useState } from "react";
import aos from "aos";

import cricketBall from "../../assets/cricket-ball.png";
import soccerBall from "../../assets/soccer-ball.png";
import tennisBall from "../../assets/tennis-ball.png";
import { IoIosArrowUp } from "react-icons/io";

import Footer from "../footer/page";

const LeftSection = () => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [cricketTab, setCricketTab] = useState(true);
  const [soccerTab, setSoccerTab] = useState(false);
  const [tennisTab, setTennisTab] = useState(false);
  useEffect(() => {
    aos.refresh();
  }, [cricketTab, soccerTab, tennisTab]);
  const fn_controlTabs = (value: string) => {
    if (value === "cricket") {
      setCricketTab(true);
      setSoccerTab(false);
      setTennisTab(false);
    } else if (value === "soccer") {
      setCricketTab(false);
      setSoccerTab(true);
      setTennisTab(false);
    } else {
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
      <div className="h-[67px] flex gap-[15px] overflow-auto">
        <div
          className={`sports-left-top-tabs shadow-sm ${
            cricketTab
              ? "bg-[#f3f3f3] border border-[--main-color-light]"
              : " bg-white"
          }`}
          onClick={() => fn_controlTabs("cricket")}
          data-aos="zoom-in" data-aos-duration="500"
        >
          <img alt="img" src={cricketBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Cricket</p>
          <p className="count">29</p>
        </div>
        <div
          className={`sports-left-top-tabs shadow-sm ${
            soccerTab
              ? "bg-[#f3f3f3] border border-[--main-color-light]"
              : " bg-white"
          }`}
          onClick={() => fn_controlTabs("soccer")}
          data-aos="zoom-in" data-aos-duration="500" data-aos-delay="250"
        >
          <img alt="img" src={soccerBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Soccer</p>
          <p className="count">111</p>
        </div>
        <div
          className={`sports-left-top-tabs shadow-sm ${
            tennisTab
              ? "bg-[#f3f3f3] border border-[--main-color-light]"
              : " bg-white"
          }`}
          onClick={() => fn_controlTabs("tennis")}
          data-aos="zoom-in" data-aos-duration="500" data-aos-delay="500"
        >
          <img alt="img" src={tennisBall} className="w-[21px] h-[21px]" />
          <p className="font-[500] text-[14px]">Tennis</p>
          <p className="count">134</p>
        </div>
      </div>
      {cricketTab && <CricketTab />}
      {soccerTab && <SoccerTab />}
      {tennisTab && <TennisTab />}
      <Footer />
    </div>
  );
};

export default LeftSection;

const List = () => {
  return (
    <div className="border-b p-[7px] flex flex-col lg:flex-row gap-[10px] items-center justify-between cursor-pointer">
      <div className="flex gap-[10px] w-full lg:w-auto">
        <div className="min-w-[70px] sm:min-w-[80px] h-[50px] sm:h-[55px] bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center">
          <p className="text-[11px] sm:text-[13px] font-[500]">20:30</p>
          <p className="text-[11px] sm:text-[13px] font-[500]">Today</p>
        </div>
        <div className="flex flex-col gap-[5px] justify-center">
          <p className="text-[11px] sm:text-[13px] font-[500]">
            Northern Raiders VS Stellenbosh Kings
          </p>
          <p className="text-[10px] sm:text-[12px] font-[500] px-[10px] rounded-[7px] py-[3px] bg-[--main-color] w-[max-content]">
            Live
          </p>
        </div>
      </div>
      <div className="flex justify-end flex-wrap gap-[6px] sm:gap-[10px]">
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--red] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--red] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
        <div className="w-[43px] sm:w-[47px] h-[43px] sm:h-[47px] rounded-[7px] bg-[--blue] flex flex-col gap-[4px] justify-center items-center">
          <p className="text-[12px] sm:text-[13px] font-[600] leading-[13px] text-center">
            1.38
          </p>
          <p className="text-[9px] sm:text-[10px] font-[600] leading-[10px] text-gray-500 text-center">
            4.5M
          </p>
        </div>
      </div>
    </div>
  );
};

const CricketTab = () => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">Boland T20</p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub1 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub2(!sub2)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Mens T20 International
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub2 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub2 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub3(!sub3)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Bangladesh Premium League
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub3 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub3 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
    </div>
  );
};

const SoccerTab = () => {
  const [sub1, setSub1] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Indonesia Liga 1
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub1 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
    </div>
  );
};

const TennisTab = () => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  return (
    <div className="flex flex-col gap-[8px] py-[15px] pb-[40px]">
      <div>
        <div
          onClick={() => setSub1(!sub1)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            Dobrish Challenger 2024
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub1 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub1 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() => setSub2(!sub2)}
          className="h-[40px] bg-[--main-color] rounded-t-[7px] flex justify-between px-[15px] items-center cursor-pointer"
        >
          <p className="text-[13px] sm:text-[15px] font-[500]">
            WTA Guadalajara 2024
          </p>
          <div className="flex items-center gap-[10px]">
            <p className="text-[13px] sm:text-[15px] font-[500]">2</p>
            <IoIosArrowUp
              className={`transition-all duration-300 ${
                sub2 ? "" : "-rotate-180"
              }`}
            />
          </div>
        </div>
        {sub2 && (
          <div className="bg-white rounded-b-[7px]">
            <List />
            <List />
          </div>
        )}
      </div>
    </div>
  );
};
