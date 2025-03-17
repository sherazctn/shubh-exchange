import aos from "aos";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import casino from "../../assets/Casino.svg"
import matka from "../../assets/Matka.svg"
import avitor from "../../assets/Aviator.svg"
import horseRiding from "../../assets/Horse Racing.svg"
import basketBall from "../../assets/Basket Ball.svg"
import rugby from "../../assets/Rugby.svg"
import boxingIcon from "../../assets/Boxing.svg"
import baseball from "../../assets/Baseball.svg"
import golfIcon from "../../assets/Golf.svg"
import snooker from "../../assets/Snooker.svg"
import eSports from "../../assets/e-Sports.svg"

import Loader from "../Loader";
import URL, { retrieveEventsDataToRedisApi, retrieveGamesDataToRedisApi } from "../../api/api";
import { updateEventData, updateMobileSidebar, updateSelectedEvent, updateSidebar } from "../../features/features";

import { FiSearch } from "react-icons/fi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdWatchLater } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const toastRef = useRef<string | null>(null);
  const screenHeight = `${window.innerHeight}px`;
  const [openOptions, setOpenOption] = useState<any>([]);
  const savedEventData = localStorage.getItem('eventData');
  const eventData = useSelector((state: any) => state.eventData);
  const redisGames = useSelector((state: any) => state.redisGames);
  const webColor = useSelector((state: any) => state.websiteColor);
  const showSidebar = useSelector((state: any) => state.showSidebar);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const authentication = useSelector((state: any) => state.authentication);
  const sportPermission = useSelector((state: any) => state.sportPermission);

  const fn_getEvents = async () => {
    const response = await retrieveEventsDataToRedisApi();
    const gameResponse = await retrieveGamesDataToRedisApi();
    if (response?.status) {
      const games = gameResponse?.data;
      const gamesIds = games?.map((gm: any) => gm?.id);
      const updatedGames = response?.data?.filter((gme: any) => gamesIds?.includes(gme?.sportId));
      setData(updatedGames);
      dispatch(updateEventData(updatedGames));
      localStorage.setItem('eventData', JSON.stringify(updatedGames));
    }
    setLoader(false);
  };

  useEffect(() => {
    if (savedEventData) {
      setLoader(false);
      setData(JSON.parse(savedEventData));
    }
    aos.init({ once: true });

    if (eventData.length !== 0) {
      setData(eventData);
      setLoader(false);
    }

    fn_getEvents();

    const intervalId = setInterval(fn_getEvents, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [sportPermission]);

  useEffect(() => {
    if (redisGames) {
      const sportId = redisGames?.map((gm: any) => gm?.id);
      const Udata = data.filter((d: any) => sportId.includes(d?.sportId));
      setData(Udata);
    }
    fn_getEvents();
  }, [redisGames]);

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
        <div className="flex justify-center mt-[20px]"><Loader color={webColor} size={25} /></div>
      ) : (
        <div
          className={`sidebar-menus my-[15px] flex flex-col gap-1.5 items-center`}
        >
          {data?.length > 0 ? data?.map((item: any) => {
            const sportStatus = sportPermission?.[item.sportName];
            const disabled = authentication && (sportStatus === false);

            return (
              <Events
                showSidebar={showSidebar}
                openOptions={openOptions}
                setOpenOption={setOpenOption}
                game={item}
                disabled={disabled}
              />
            );
          }) : (
            <div className="text-center mt-[20px] text-[15px] font-[500] text-gray-600 flex justify-center items-center gap-[7px]">
              <BsFillExclamationCircleFill className="text-[20px]" /> No Game is playing
            </div>
          )}
          {/* casino */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="Casino"
                  src={casino}
                  className="w-[25px] h-[25px] rounded-full object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Casino</p>}
              </div>
            </div>
          </div>
          {/* matka */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="matka"
                  src={matka}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Matka</p>}
              </div>
            </div>
          </div>
          {/* aviator */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="Aviator"
                  src={avitor}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Aviator</p>}
              </div>
            </div>
          </div>
          {/* horse racing */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="horseRiding"
                  src={horseRiding}
                  className="w-[25px] h-[25px] object-cover scale-[1.2]"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Horse Racing</p>}
              </div>
            </div>
          </div>
          {/* basket ball */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="basketBall"
                  src={basketBall}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Basket Ball</p>}
              </div>
            </div>
          </div>
          {/* rugby */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="rugby"
                  src={rugby}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Rugby</p>}
              </div>
            </div>
          </div>
          {/* boxing */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="boxingIcon"
                  src={boxingIcon}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Boxing</p>}
              </div>
            </div>
          </div>
          {/* baseball */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="baseball"
                  src={baseball}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Baseball</p>}
              </div>
            </div>
          </div>
          {/* golf */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="golfIcon"
                  src={golfIcon}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Golf</p>}
              </div>
            </div>
          </div>
          {/* snooker */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="snooker"
                  src={snooker}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">Snooker</p>}
              </div>
            </div>
          </div>
          {/* e-Sports */}
          <div className="w-full flex flex-col items-center" data-aos="slide-right" data-aos-duration="500">
            <div
              className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] hover:bg-white transition-all duration-200 ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
              onClick={() => {
                if (toastRef.current) {
                  toast.dismiss(toastRef.current);
                }
                toastRef.current = toast.error('Coming Soon', {
                  icon: <MdWatchLater style={{ color: 'orange' }} />,
                  duration: 4000,
                  position: 'top-center'
                });
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  alt="eSports"
                  src={eSports}
                  className="w-[25px] h-[25px] object-cover"
                />
                {showSidebar && <p className="font-[600] text-[15px] capitalize">e-Sports</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

const Events = ({ showSidebar, openOptions, setOpenOption, game, disabled }: any) => {

  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const [subOption, setSubOption] = useState<any>(null);
  const adminGamesData = useSelector((state: any) => state.redisGames);

  useEffect(() => {
    setOption(openOptions.find((id: string) => id === game?.sportId) ? true : false);
  }, [openOptions, game]);

  const fn_subOption = (id: string) => {
    if (subOption === id) return setSubOption(null);
    setSubOption(id);
  };

  const fn_selectEvent = (sportId: string, eventId: string, i: any, competitionName: string) => {
    dispatch(updateSelectedEvent({ ...i, competitionName }));
    localStorage.setItem('selectedEvent', JSON.stringify({ ...i, competitionName }));
    window.location.href = `/match?sportId=${sportId}&eventId=${eventId}`;
  };

  return (
    <div className={`w-full flex flex-col items-center ${disabled && "cursor-not-allowed"}`} data-aos="slide-right" data-aos-duration="500">
      {/* header */}
      <a
        href={disabled ? undefined : `/all-sports?game=${game?.sportName}`}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        className={`cursor-pointer w-[90%] h-[40px] rounded-[7px] flex items-center px-[10px] transition-all duration-200 ${!disabled ? !option ? "hover:bg-white hover:scale-[1.02]" : "border-t border-x rounded-none rounded-t-[7px] border-gray-300 bg-white" : "cursor-not-allowed"} ${showSidebar ? "justify-between" : "justify-center border-none rounded-b-[7px]"}`}
      >
        <div className="flex items-center gap-2.5">
          {adminGamesData && (
            <img
              alt={game?.name}
              src={`${URL}/${adminGamesData?.find((g: any) => g?.id == game?.sportId)?.image}`}
              className={`w-[25px] h-[25px] rounded-full object-cover ${disabled ? "contrast-50 opacity-70" : ""}`}
            />
          )}
          {showSidebar && <p className={`font-[600] text-[15px] capitalize ${disabled ? "text-gray-500" : "text-black"}`}>{game?.sportName}</p>}
        </div>
        {showSidebar && (
          <div
            className="flex items-center gap-2.5"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!option) {
                setOpenOption((prev: any) => [...prev, game?.sportId])
              } else {
                const updatedOptions = openOptions.filter((item: any) => item !== game?.sportId);
                setOpenOption(updatedOptions);
              }
            }}
          >
            <div className={`px-1.5 min-w-[32px] rounded-[4px] h-[22px] pt-[1px] font-[600] text-[11px] flex items-center justify-center ${disabled ? "text-gray-400 bg-gray-200" : "text-black bg-gray-300"}`}>
              {!disabled ? game?.competitions.length : <FaLock />}
            </div>
            {!option ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        )}
      </a>
      {/* options */}
      {showSidebar && option && (
        <div className="w-[90%] border border-gray-300 bg-gray-200 border-b rounded-b-[7px] py-[6px] px-[5px] flex flex-col">
          {game?.competitions.length > 0 ? game?.competitions.map((item: any) => (
            <div
              key={item.competitionId}
              className={`min-h-[30px] flex flex-col justify-center hover:bg-white px-[5px] rounded-[3px] ${subOption === item.competitionId && "bg-white pb-[3px] pt-[5px]"}`}
              onClick={() => fn_subOption(item?.competitionId)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <p className="text-[13px] font-[500]">{item?.competitionName}</p>
                {subOption === item?.competitionId ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {subOption === item?.competitionId && (
                <div className="py-[2px] px-[3px] rounded-[5px]">
                  {item?.events?.map((i: any) => (
                    <p key={i?.eventId} className="text-[13px] hover:bg-gray-100 cursor-pointer px-[5px] py-[3px]" onClick={() => fn_selectEvent(game.sportId, i.eventId, i, item?.competitionName)}>{i?.eventName}</p>
                  ))}
                </div>
              )}
            </div>
          )) : (
            <p className="text-[13px] font-[600] text-center text-gray-700"><BsFillExclamationCircleFill className="text-[16px] inline-block me-[5px] mt-[-2px]" />No Competition Found</p>
          )}
        </div>
      )}
    </div>
  );
};
