import aos from "aos";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateMobileSidebar, updateSidebar } from "../../features/features";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

import cricketBall from "../../assets/cricket-ball.png";
import soccerBall from "../../assets/soccer-ball.png";
import tennisBall from "../../assets/tennis-ball.png";

// options
import { CricketOptions, SoccerOptions, TennisOptions } from "../../assets/data";

const Sidebar = () => {
  const dispatch = useDispatch();
  const screenHeight = `${window.innerHeight}px`;
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const [openCricketOptions, setOpenCricketOptions] = useState(false);
  const [openSoccerOptions, setOpenSoccerOptions] = useState(false);
  const [openTennisOptions, setOpenTennisOptions] = useState(false);
  useEffect(() => {
    aos.init({ once: true });
  }, []);
  return (
    <div
      className={`sidebar top-0 shadow-lg md:shadow-none transition-all duration-500 ${
        showSidebar ? "w-[270px]" : "w-[67px] ms-2"
      } ${mobileSidebar ? "left-0" : "left-[-270px] lg:left-0"}`}
      style={{ height: screenHeight }}
    >
      {/* button-control-sidebar */}
      <div className="flex justify-center mt-[15px]">
        <div className="w-[90%] border h-[50px] bg-white rounded-[12px] shadow-sm flex items-center justify-between px-[15px]">
          {showSidebar && (
            <p className="uppercase font-[700] text-[14px]">Sports</p>
          )}
          <div
            className="bg-[--main-color] hidden lg:flex w-[30px] min-w-[30px] h-[30px] rounded-full text-white justify-center items-center cursor-pointer"
            onClick={() => dispatch(updateSidebar(!showSidebar))}
          >
            {showSidebar ? (
              <MdKeyboardDoubleArrowLeft className="text-[20px]" />
            ) : (
              <MdKeyboardDoubleArrowRight className="text-[20px]" />
            )}
          </div>
          <div
            className="bg-black flex lg:hidden w-[30px] min-w-[30px] h-[30px] rounded-full text-white justify-center items-center cursor-pointer"
            onClick={() => dispatch(updateMobileSidebar(!mobileSidebar))}
          >
            {mobileSidebar ? (
              <MdKeyboardDoubleArrowLeft className="text-[20px]" />
            ) : (
              <MdKeyboardDoubleArrowRight className="text-[20px]" />
            )}
          </div>
        </div>
      </div>
      {/* search-bar */}
      {showSidebar && (
        <div className="flex justify-center mt-[15px]">
          <div className="w-[90%] border h-[50px] bg-white rounded-[12px] shadow-sm flex items-center justify-between px-[20px] focus-within:border-[--main-color]">
            <input
              type="text"
              placeholder="Search..."
              className="font-[500] text-[14px] focus:outline-none w-full"
            />
            <FiSearch className="text-[25px] text-gray-300" />
          </div>
        </div>
      )}
      {/* sports */}
      <div
        className={`sidebar-menus my-[15px] flex flex-col gap-1.5 items-center`}
      >
        <CricketOption
          showSidebar={showSidebar}
          openCricketOptions={openCricketOptions}
          setOpenCricketOptions={setOpenCricketOptions}
        />
        <SoccerOption
          showSidebar={showSidebar}
          openSoccerOptions={openSoccerOptions}
          setOpenSoccerOptions={setOpenSoccerOptions}
        />
        <TennisOption
          showSidebar={showSidebar}
          openTennisOptions={openTennisOptions}
          setOpenTennisOptions={setOpenTennisOptions}
        />
      </div>
    </div>
  );
};

export default Sidebar;

const CricketOption = ({
  showSidebar,
  openCricketOptions,
  setOpenCricketOptions,
}: any) => {
  return (
    <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
      {/* header */}
      <div
        className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${
          !openCricketOptions
            ? "hover:scale-[1.02]"
            : "border-t border-x rounded-none rounded-t-[7px] border-gray-300 bg-white"
        } ${
          showSidebar
            ? "justify-between"
            : "justify-center border-none rounded-b-[7px]"
        }`}
        onClick={() => setOpenCricketOptions(!openCricketOptions)}
      >
        <div className="flex items-center gap-2.5">
          <img
            alt="cricket-ball"
            src={cricketBall}
            className="w-[20px] h-[20px]"
            style={{ imageRendering: "crisp-edges" }}
          />
          {showSidebar && <p className="font-[600] text-[15px]">Cricket</p>}
        </div>
        {showSidebar && (
          <div className="flex items-center gap-2.5">
            <div className="px-1.5 min-w-[32px] rounded-[4px] h-[22px] pt-[3px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
              16
            </div>
            {!openCricketOptions ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        )}
      </div>
      {/* options */}
      {showSidebar && openCricketOptions && (
        <div className="w-[90%] border border-gray-300 bg-gray-200 border-b rounded-b-[7px] py-[6px] px-[5px] flex flex-col">
          {CricketOptions.map((item) => (
            <div
              key={item.id}
              className="min-h-[30px] flex items-center justify-between cursor-pointer hover:bg-white px-[5px] rounded-[3px]"
            >
              <p className="text-[13px] font-[500]">{item?.name}</p>
              <IoIosArrowDown />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SoccerOption = ({
  showSidebar,
  openSoccerOptions,
  setOpenSoccerOptions,
}: any) => {
  return (
    <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500" data-aos-delay="250">
      {/* header */}
      <div
        className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${
          !openSoccerOptions
            ? "hover:scale-[1.02]"
            : "border-t border-x rounded-none rounded-t-[7px] border-gray-300 bg-white"
        } ${
          showSidebar
            ? "justify-between"
            : "justify-center border-none rounded-b-[7px]"
        }`}
        onClick={() => setOpenSoccerOptions(!openSoccerOptions)}
      >
        <div className="flex items-center gap-2.5">
          <img
            alt="cricket-ball"
            src={soccerBall}
            className="w-[20px] h-[20px]"
            style={{ imageRendering: "crisp-edges" }}
          />
          {showSidebar && <p className="font-[600] text-[15px]">Soccer</p>}
        </div>
        {showSidebar && (
          <div className="flex items-center gap-2.5">
            <div className="px-1.5 min-w-[32px] pt-[2px] rounded-[4px] h-[22px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
              111
            </div>
            {!openSoccerOptions ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        )}
      </div>
      {/* options */}
      {showSidebar && openSoccerOptions && (
        <div className="w-[90%] border border-gray-300 bg-gray-200 border-b rounded-b-[7px] py-[6px] px-[5px] flex flex-col">
          {SoccerOptions.map((item) => (
            <div
              key={item.id}
              className="min-h-[30px] flex items-center justify-between cursor-pointer hover:bg-white px-[5px] rounded-[3px]"
            >
              <p className="text-[13px] font-[500]">{item?.name}</p>
              <IoIosArrowDown />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TennisOption = ({
  showSidebar,
  openTennisOptions,
  setOpenTennisOptions,
}: any) => {
  return (
    <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500" data-aos-delay="500">
      {/* header */}
      <div
        className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${
          !openTennisOptions
            ? "hover:scale-[1.02]"
            : "border-t border-x rounded-none rounded-t-[7px] border-gray-300 bg-white"
        } ${
          showSidebar
            ? "justify-between"
            : "justify-center border-none rounded-b-[7px]"
        }`}
        onClick={() => setOpenTennisOptions(!openTennisOptions)}
      >
        <div className="flex items-center gap-2.5">
          <img
            alt="cricket-ball"
            src={tennisBall}
            className="w-[20px] h-[20px]"
            style={{ imageRendering: "crisp-edges" }}
          />
          {showSidebar && <p className="font-[600] text-[15px]">Tennis</p>}
        </div>
        {showSidebar && (
          <div className="flex items-center gap-2.5">
            <div className="px-1.5 min-w-[32px] rounded-[4px] pt-[2px] h-[22px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
              134
            </div>
            {!openTennisOptions ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        )}
      </div>
      {/* options */}
      {showSidebar && openTennisOptions && (
        <div className="w-[90%] border border-gray-300 bg-gray-200 border-b rounded-b-[7px] py-[6px] px-[5px] flex flex-col">
          {TennisOptions.map((item) => (
            <div
              key={item.id}
              className="min-h-[30px] flex items-center justify-between cursor-pointer hover:bg-white px-[5px] rounded-[3px]"
            >
              <p className="text-[13px] font-[500]">{item?.name}</p>
              <IoIosArrowDown />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
