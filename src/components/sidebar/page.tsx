import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowDown } from "react-icons/io";

import cricketBall from "../../assets/cricket-ball.png";
import soccerBall from "../../assets/soccer-ball.png";
import tennisBall from "../../assets/tennis-ball.png";
import { updateSidebar } from "../../features/features";

const Sidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state: any) => state.showSidebar);
  return (
    <div
      className={`sidebar top-0 left-0 transition-all duration-500 ${
        showSidebar ? "w-[230px]" : "w-[65px] ms-2"
      }`}
    >
      <div className="flex justify-center mt-[15px]">
        <div className="w-[95%] border h-[50px] bg-white rounded-[12px] shadow-sm flex items-center justify-between px-[15px]">
          {showSidebar && (
            <p className="uppercase font-[700] text-[14px]">Sports</p>
          )}
          <div
            className="bg-black w-[30px] h-[30px] rounded-full text-white flex justify-center items-center cursor-pointer"
            onClick={() => dispatch(updateSidebar(!showSidebar))}
          >
            {showSidebar ? (
              <MdKeyboardDoubleArrowLeft className="text-[20px]" />
            ) : (
              <MdKeyboardDoubleArrowRight className="text-[20px]" />
            )}
          </div>
        </div>
      </div>
      {showSidebar && (
        <div className="flex justify-center mt-[15px]">
          <div className="w-[95%] border h-[50px] bg-white rounded-[12px] shadow-sm flex items-center justify-between px-[20px] focus-within:border-[--main-color]">
            <input
              type="text"
              placeholder="Search..."
              className="font-[500] text-[14px] focus:outline-none w-full"
            />
            <FiSearch className="text-[25px] text-gray-300" />
          </div>
        </div>
      )}
      <div className="mt-[15px] flex flex-col gap-1.5 items-center">
        <CricketOption showSidebar={showSidebar} />
        <SoccerOption showSidebar={showSidebar} />
        <TennisOption showSidebar={showSidebar} />
      </div>
    </div>
  );
};

export default Sidebar;

const CricketOption = ({ showSidebar }: any) => {
  return (
    <div
      className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:scale-[1.02] hover:bg-white transition-all duration-200 ${
        showSidebar ? "justify-between" : "justify-center"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <img
          alt="cricket-ball"
          src={cricketBall}
          className="w-[20px] h-[20px]"
          style={{ imageRendering: "crisp-edges" }}
        />
        {showSidebar && <p className="font-[600] text-[14px]">Cricket</p>}
      </div>
      {showSidebar && (
        <div className="flex items-center gap-2.5">
          <div className="px-1.5 min-w-[32px] rounded-[4px] h-[22px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
            16
          </div>
          <IoIosArrowDown />
        </div>
      )}
    </div>
  );
};

const SoccerOption = ({ showSidebar }: any) => {
  return (
    <div
      className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:scale-[1.02] hover:bg-white transition-all duration-200 ${
        showSidebar ? "justify-between" : "justify-center"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <img
          alt="cricket-ball"
          src={soccerBall}
          className="w-[20px] h-[20px]"
          style={{ imageRendering: "crisp-edges" }}
        />
        {showSidebar && <p className="font-[600] text-[14px]">Soccer</p>}
      </div>
      {showSidebar && (
        <div className="flex items-center gap-2.5">
          <div className="px-1.5 min-w-[32px] rounded-[4px] h-[22px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
            111
          </div>
          <IoIosArrowDown />
        </div>
      )}
    </div>
  );
};

const TennisOption = ({ showSidebar }: any) => {
  return (
    <div
      className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:scale-[1.02] hover:bg-white transition-all duration-200 ${
        showSidebar ? "justify-between" : "justify-center"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <img
          alt="cricket-ball"
          src={tennisBall}
          className="w-[20px] h-[20px]"
          style={{ imageRendering: "crisp-edges" }}
        />
        {showSidebar && <p className="font-[600] text-[14px]">Tennis</p>}
      </div>
      {showSidebar && (
        <div className="flex items-center gap-2.5">
          <div className="px-1.5 min-w-[32px] rounded-[4px] h-[22px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
            134
          </div>
          <IoIosArrowDown />
        </div>
      )}
    </div>
  );
};
