import AOS from "aos";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IoIosArrowUp } from "react-icons/io";

import Footer from "../footer/page";
import URL, { getAvailableGames } from "../../api/api";
import Loader from "../Loader";

const LeftSection = () => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [tab, setTab] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  useEffect(() => {
    AOS.init({ once: true });
    fn_getGames();
  }, []);
  const fn_controlTabs = (id: string) => {
    setTab(id)
  };
  const fn_getGames = async () => {
    setLoader(true)
    const response: any = await getAvailableGames();
    if (response?.status) {
      setLoader(false);
      setData(response?.data);
      setTab(response?.data[0]?._id)
    } else {
      setLoader(false);
    }
  };
  return (
    <div
      className="w-[100%] xl:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      {/* tabs */}
      <div className="h-[67px] flex gap-[8px] sm:gap-[15px] overflow-auto">
        {!loader ?
          data?.length > 0 ? data?.map((item: any) => (
            <div
              className={`sports-left-top-tabs shadow-sm ${tab === item?._id
                ? "bg-[#f3f3f3] border"
                : " bg-white"
                }`}
              style={{borderColor: webColor}}
              onClick={() => fn_controlTabs(item?._id)}
            >
              <img alt="img" src={`${URL}/${item?.image}`} className="w-[27px] h-[27px] rounded-full object-cover" />
              <p className="font-[500] text-[14px] capitalize">{item?.name}</p>
            </div>
          )) : (
            <p>No Game is Playing</p>
          ) : (
            <div className="p-[18px]"><Loader color="var(--main-color)" size={25} /></div>
          )}
      </div>
      {!loader ? data?.length > 0 && <CricketTab webColor={webColor} /> : (<div className="flex justify-center py-[20px]"><Loader color="var(--main-color)" size={25} /></div>)}
      <br />
      <Footer />
    </div>
  );
};

export default LeftSection;

const List = ({ webColor }: { webColor: string }) => {
  return (
    <div className="border-b p-[7px] flex flex-col lg:flex-row gap-[10px] items-center justify-between cursor-pointer">
      <div className="flex gap-[10px] w-full lg:w-auto">
        <div className="min-w-[70px] sm:min-w-[80px] h-[50px] text-[--text-color] sm:h-[55px] rounded-[7px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
          <p className="text-[11px] sm:text-[13px] font-[500]">20:30</p>
          <p className="text-[11px] sm:text-[13px] font-[500]">Today</p>
        </div>
        <div className="flex flex-col gap-[5px] justify-center">
          <p className="text-[11px] sm:text-[13px] font-[500]">
            Northern Raiders VS Stellenbosh Kings
          </p>
          <p className="text-[10px] text-[--text-color] sm:text-[12px] font-[500] px-[10px] rounded-[7px] py-[3px] w-[max-content]" style={{ backgroundColor: webColor }}>
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
            <List webColor={webColor} />
            <List webColor={webColor} />
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
            <List webColor={webColor} />
            <List webColor={webColor} />
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
            <List webColor={webColor} />
            <List webColor={webColor} />
          </div>
        )}
      </div>
    </div>
  );
};
