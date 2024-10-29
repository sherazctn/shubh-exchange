import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IoIosArrowUp } from "react-icons/io";

const UpcomingSoccerMatches = ({ text }: any) => {
  const webColor = useSelector((state: any) => state.websiteColor);
  const data = useSelector((state: any) => state.upcomingSoccer);
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const formatTime = (openDate: any) => {
    const date = new Date(openDate);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  const formatDate = (openDate: any) => {
    const date: any = new Date(openDate);
    const now: any = new Date();
    date.setUTCHours(0, 0, 0, 0);
    now.setUTCHours(0, 0, 0, 0);
    const timeDiff = date - now;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    if (dayDiff < 1) {
      return "Today";
    } else if (dayDiff < 2) {
      return "Tomorrow";
    } else {
      return date.toDateString();
    }
  };
  return (
    <div className="mt-[15px]">
      <div className="flex items-center justify-between gap-4 cursor-default">
        <p className="text-[18px] font-[500]">{text}</p>
        <p className="text-[18px] font-[500]">25 Events</p>
      </div>
      <div className="flex flex-col gap-[10px]">
        {data?.length > 0 && data?.map((item: any) => (
          <div key={item?.competitionId} className="bg-white mt-[5px] rounded-[7px]">
            {/* header */}
            <div
              className="text-[--text-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] md:text-[15px] justify-between cursor-pointer"
              style={{ backgroundColor: webColor }}
            >
              <p>{item?.competitionName}</p>
              <div className="flex items-center gap-[10px]">
                <p>{item?.games?.length}</p>
                <IoIosArrowUp
                  className={`${!item?.open ? "-rotate-180" : ""
                    } transition-all duration-300`}
                />
              </div>
            </div>
            {/* content */}
            <div>
              {item?.games?.map((i: any, idx: number) => (
                <div key={idx} className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                    <div className="text-[--text-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]" style={{ backgroundColor: webColor }}>
                      <p className="font-[500] text-[13px] leading-[13px]">
                        {formatTime(i?.openDate)}
                      </p>
                      <p className="text-[11px] leading-[11px] text-center">{formatDate(i?.openDate)}</p>
                    </div>
                    <p className="text-[14px]">
                      {i?.name}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center pb-[10px] md:pb-0">
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
                      <p className="font-[800] text-center text-[15px]">-</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        -
                      </p>
                    </div>
                    <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">-</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        -
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSoccerMatches;
