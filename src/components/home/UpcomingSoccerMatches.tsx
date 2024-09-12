import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const UpcomingSoccerMatches = ({ text }: any) => {
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  return (
    <div className="mt-[15px]">
      <div className="flex items-center justify-between gap-4 cursor-default">
        <p className="text-[18px] font-[500]">{text}</p>
        <p className="text-[18px] font-[500]">25 Events</p>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="bg-white mt-[5px] rounded-[7px]">
          {/* header */}
          <div
            onClick={() => setSub1(!sub1)}
            className="bg-[--main-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] md:text-[15px] justify-between cursor-pointer"
          >
            <p>Country Champianship</p>
            <div className="flex items-center gap-[10px]">
              <p>10</p>
              <IoIosArrowUp
                className={`${
                  !sub1 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </div>
          </div>
          {/* content */}
          {sub1 && (
            <div>
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
            </div>
          )}
        </div>
        <div className="bg-white mt-[5px] rounded-[7px]">
          {/* header */}
          <div
            onClick={() => setSub2(!sub2)}
            className="bg-[--main-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] md:text-[15px] justify-between cursor-pointer"
          >
            <p>International T20 League</p>
            <div className="flex items-center gap-[10px]">
              <p>9</p>
              <IoIosArrowUp
                className={`${
                  !sub2 ? "-rotate-180" : ""
                } transition-all duration-300`}
              />
            </div>
          </div>
          {/* content */}
          {sub2 && (
            <div>
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
              <div className="min-h-[60px] border-b flex flex-col md:flex-row gap-[10px] items-center justify-between px-[11px] cursor-pointer">
                <div className="flex items-center gap-4 w-full md:w-auto mt-[10px] md:mt-0">
                  <div className="bg-[--main-color] rounded-[7px] flex flex-col justify-center items-center h-[47px] w-[80px] gap-[4px]">
                    <p className="font-[500] text-[13px] leading-[13px]">
                      20:45
                    </p>
                    <p className="text-[12px] leading-[12px]">Tomorrow</p>
                  </div>
                  <p className="text-[14px]">
                    Durham <span className="font-[600]">vs</span> Lanchire
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSoccerMatches;
