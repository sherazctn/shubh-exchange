import aos from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import URL, { getAvailableGames } from "../../api/api";
import { updateMobileSidebar, updateSidebar } from "../../features/features";

import { FiSearch } from "react-icons/fi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

// options
import { CricketOptions } from "../../assets/data";

const Sidebar = () => {
  const dispatch = useDispatch();
  const screenHeight = `${window.innerHeight}px`;
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const [openOptions, setOpenOption] = useState<any>([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  useEffect(() => {
    aos.init({ once: true });
    fn_getGames();
  }, []);
  const fn_getGames = async () => {
    setLoader(true)
    const response: any = await getAvailableGames();
    if (response?.status) {
      setLoader(false);
      setData(response?.data);
    } else {
      setLoader(false);
    }
  };
  return (
    <div
      className={`sidebar top-0 shadow-lg md:shadow-none transition-all duration-500 ${showSidebar ? "w-[270px]" : "w-[67px] ms-2"
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
            className="hidden lg:flex w-[30px] min-w-[30px] h-[30px] rounded-full text-white justify-center items-center cursor-pointer"
            style={{ backgroundColor: webColor }}
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
      {loader ? (
        <div className="flex justify-center mt-[20px]"><Loader color="var(--main-color)" size={25} /></div>
      ) : (
        <div
          className={`sidebar-menus my-[15px] flex flex-col gap-1.5 items-center`}
        >
          {data?.length > 0 ? data?.map((item: any) => (
            <CricketOption
              showSidebar={showSidebar}
              openOptions={openOptions}
              setOpenOption={setOpenOption}
              game={item}
            />
          )) : (
            <div className="text-center mt-[20px] text-[15px] font-[500] text-gray-600 flex justify-center items-center gap-[7px]">
              <BsFillExclamationCircleFill className="text-[20px]" />No Game is playing
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

const CricketOption = ({
  showSidebar,
  openOptions,
  setOpenOption,
  game
}: any) => {
  const navigate = useNavigate();
  const [option, setOption] = useState(false);
  useEffect(() => {
    setOption(openOptions.find((id: string) => id === game?._id) ? true : false);
  }, [openOptions, game]);
  return (
    <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
      {/* header */}
      <div
        className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${!option
          ? "hover:scale-[1.02]"
          : "border-t border-x rounded-none rounded-t-[7px] border-gray-300 bg-white"
          } ${showSidebar
            ? "justify-between"
            : "justify-center border-none rounded-b-[7px]"
          }`}
        onClick={() => {
          if (!option) {
            setOpenOption((prev: any) => [...prev, game?._id])
          } else {
            const updatedOptions = openOptions.filter((item: any) => item !== game?._id);
            setOpenOption(updatedOptions);
          }
        }}
      >
        <div className="flex items-center gap-2.5">
          <img
            alt={game?.name}
            src={`${URL}/${game?.image}`}
            className="w-[25px] h-[25px] rounded-full object-cover"
          />
          {showSidebar && <p className="font-[600] text-[15px] capitalize">{game?.name}</p>}
        </div>
        {showSidebar && (
          <div className="flex items-center gap-2.5">
            <div className="px-1.5 min-w-[32px] rounded-[4px] h-[22px] pt-[3px] bg-gray-300 font-[600] text-[11px] flex items-center justify-center">
              16
            </div>
            {!option ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        )}
      </div>
      {/* options */}
      {showSidebar && option && (
        <div className="w-[90%] border border-gray-300 bg-gray-200 border-b rounded-b-[7px] py-[6px] px-[5px] flex flex-col">
          {CricketOptions.map((item) => (
            <div
              key={item.id}
              className="min-h-[30px] flex items-center justify-between cursor-pointer hover:bg-white px-[5px] rounded-[3px]"
              onClick={() => navigate("/cricket/live")}
            >
              <p className="text-[13px] font-[500]">{item?.name}</p>
              {/* <IoIosArrowDown /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
