import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import crciketBall from "../../assets/soccer-ball.png";
import { getSoccerMatchesApi } from "../../api/api";

const SoccerDropdownsSection = ({ text }: any) => {
  const [dropdown, setDropdown] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const [data, setData] = useState([]);

  const fn_getSoccerMatchs = async () => {
    const response = await getSoccerMatchesApi();
    if (response?.status) {
      const inPlayMatches = response?.data?.filter((match: any) => match.inplay);
      const groupedInPlay = inPlayMatches.reduce((acc: any, match: any) => {
        let competition = acc.find((comp: any) => comp.competitionId === match.competitionId);
        if (!competition) {
          competition = {
            competitionId: match.competitionId,
            competitionName: match.competitionName,
            games: [],
            open: true
          };
          acc.push(competition);
        }
        competition.games.push(match);
        return acc;
      }, []);
      setData(groupedInPlay);
    } else {
      setData([]);
    }
  }

  useEffect(() => {
    fn_getSoccerMatchs();
  }, []);

  const fn_openTab = (competitionId: string) => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item.competitionId === competitionId
          ? { ...item, open: !item.open }
          : item
      )
    );
  };

  return (
    <div className="mt-[15px]">
      <div
        className="flex items-center gap-4 w-[max-content] cursor-pointer"
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-[18px] font-[500]">{text}</p>
        <IoIosArrowUp
          className={`text-[20px] transition-all duration-300 ${dropdown ? "-rotate-180" : ""
            }`}
        />
      </div>
      {dropdown && (
        <div className="flex flex-col gap-[10px]">
          {data?.length > 0 && data?.map((item: any) => (
            <div className="bg-white mt-[5px] rounded-[7px]">
              {/* header */}
              <div
                onClick={() => fn_openTab(item.competitionId)}
                className="text-[--text-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] sm:text-[15px] justify-between cursor-pointer"
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
              {item?.open && (
                <div>
                  {item?.games?.map((i: any) => (
                    <div className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer">
                      <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
                        <img src={crciketBall} alt="img" className="w-[21px]" />
                        <p className="text-[14px]">
                          {i?.name}
                        </p>
                        <div className="flex md:hidden text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
                          Live
                          <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-[7px] sm:gap-[11px] items-center min-h-[65px] md:min-h-auto">
                        <div className="hidden md:flex text-[--text-color] h-[25px] w-[47px] rounded-[7px] font-[500] text-[12px] pt-[2px] justify-center items-center relative" style={{ backgroundColor: webColor }}>
                          Live
                          <GoDotFill className="absolute top-[1px] right-[1px] text-[11px] text-green-500 dot-blink" />
                        </div>
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoccerDropdownsSection;
