import { useState } from "react";

import RightSlider from "./RightSlider";

import cricketImg from "../../assets/cricket-ball.png";

const RightSection = () => {
  const divHeight = `${window.innerHeight-60}px`;
  const [showCasino, setShowCasino] = useState(true);
  const [popularEvents, setPopularEvents] = useState(true);
  return (
    <div className="hidden lg:block w-[350px] xl:w-[450px] min-w-[350px] xl:min-w-[450px] pt-[13px] pb-[20px] overflow-auto" style={{ maxHeight: divHeight }}>
      <div className="rounded-[7px] p-[7px] bg-white">
        <button
          className={`sports-right-top-btn text-[--text-color] ${showCasino && "mb-[7px]"}`}
          onClick={() => setShowCasino(!showCasino)}
        >
          Live Casino Games
        </button>
        {showCasino && <RightSlider />}
      </div>
      <div className="rounded-[7px] p-[7px] bg-white mt-[7px]">
        <button
          className={`sports-right-top-btn text-[--text-color] ${popularEvents && "mb-[7px]"}`}
          onClick={() => setPopularEvents(!popularEvents)}
        >
          Popular Events
        </button>
        {popularEvents && (
          <div className="px-[5px]">
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
            <PopularEvents />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;

const PopularEvents = () => {
  return (
    <div className="min-h-[50px] border-b flex justify-between items-center">
      <div className="flex items-center gap-[15px]">
        <img alt="img" src={cricketImg} className="w-[21px] h-[21px]" />
        <div>
          <p className="text-[12px] font-[500] leading-[14px]">Stallions</p>
          <p className="text-[11px] font-[500] leading-[12px]">Lions</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-[500] leading-[12px]">Today 09:30</p>
        <div className="text-[12px] flex justify-end gap-1">
          <p className="text-[10px] bg-gray-300 py-[1px] px-[4px] rounded-[2px] w-[max-content]">
            F4
          </p>
          <p className="text-[10px] bg-gray-300 py-[1px] px-[4px] rounded-[2px] w-[max-content]">
            B
          </p>
        </div>
      </div>
    </div>
  );
};
