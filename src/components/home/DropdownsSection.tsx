import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import crciketBall from "../../assets/cricket-ball.png";

const DropdownsSection = ({ text }: any) => {
  const [dropdown, setDropdown] = useState(true);
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);
  return (
    <div className="mt-[15px]">
      <div
        className="flex items-center gap-4 w-[max-content] cursor-pointer"
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-[18px] font-[500]">{text}</p>
        <IoIosArrowUp
          className={`text-[20px] transition-all duration-300 ${
            dropdown ? "-rotate-180" : ""
          }`}
        />
      </div>
      {dropdown && (
        <div className="flex flex-col gap-[10px]">
          <div className="bg-white mt-[5px] rounded-[7px]">
            {/* header */}
            <div
              onClick={() => setSub1(!sub1)}
              className="bg-[--main-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[15px] justify-between cursor-pointer"
            >
              <p>Country Champianship</p>
              <div className="flex items-center gap-[10px]">
                <p>10</p>
                <IoIosArrowUp />
              </div>
            </div>
            {/* content */}
            {sub1 && (
              <div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Durham <span className="font-[600]">vs</span> Lanchire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Essex <span className="font-[600]">vs</span>{" "}
                      Nottinghamshire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Kent <span className="font-[600]">vs</span> Hamphire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Middlesex <span className="font-[600]">vs</span>{" "}
                      Gloucestershire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
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
              className="bg-[--main-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[14px] justify-between cursor-pointer"
            >
              <p>International Twenty20 Matches</p>
              <div className="flex items-center gap-[10px]">
                <p>10</p>
                <IoIosArrowUp />
              </div>
            </div>
            {/* content */}
            {sub2 && (
              <div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Durham <span className="font-[600]">vs</span> Lanchire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Essex <span className="font-[600]">vs</span>{" "}
                      Nottinghamshire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Kent <span className="font-[600]">vs</span> Hamphire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Middlesex <span className="font-[600]">vs</span>{" "}
                      Gloucestershire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
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
              onClick={() => setSub3(!sub3)}
              className="bg-[--main-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[14px] justify-between cursor-pointer"
            >
              <p>Womens One Day International</p>
              <div className="flex items-center gap-[10px]">
                <p>10</p>
                <IoIosArrowUp />
              </div>
            </div>
            {/* content */}
            {sub3 && (
              <div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Durham <span className="font-[600]">vs</span> Lanchire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Essex <span className="font-[600]">vs</span>{" "}
                      Nottinghamshire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] border-b flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Kent <span className="font-[600]">vs</span> Hamphire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                  </div>
                </div>
                <div className="min-h-[65px] flex items-center justify-between px-[11px] cursor-pointer">
                  <div className="flex items-center gap-4 ms-2.5">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      Middlesex <span className="font-[600]">vs</span>{" "}
                      Gloucestershire
                    </p>
                  </div>
                  <div className="flex gap-[11px] items-center">
                    <div className="bg-[--main-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] flex justify-center items-center relative">
                      Live
                      <GoDotFill className="absolute top-[1px] right-[1px] text-[10px] text-green-500 animate-pulse-scale" />
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">620</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        3.35k
                      </p>
                    </div>
                    <div className="h-[47px] w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
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
      )}
    </div>
  );
};

export default DropdownsSection;
