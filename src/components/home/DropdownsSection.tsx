import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

import crciketBall from "../../assets/cricket-ball.png";
import { updateBets, updateBettingSlip, updateLiveMarkets } from "../../features/features";
import { getLiveMarketsApi } from "../../api/api";

const CricketDropdownsSection = ({ text, id }: any) => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const wallet = useSelector((state: any) => state.wallet);
  const bets = useSelector((state: any) => state.bets);
  const authentication = useSelector((state: any) => state.authentication);
  const liveCricket = useSelector((state: any) => state.liveCricket);
  const liveMarkets = useSelector((state: any) => state.liveMarkets);
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);

  const location = useLocation();
  const [marketData, setMarketData] = useState([]);
  const sportName = id === 1 ? "soccer" : id === 2 ? "tennnis" : "cricket";

  const handleBetClicked = (e: any, odd: any, gameName: any, selectionId: any, side: any, eventId: any, marketId: any, marketName: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!gameName) return;
    const profit = parseFloat((10 * (odd - 1)).toFixed(2));
    const loss = 10;
    const obj = {
      afterLoss: wallet - 10,
      afterWin: wallet + profit,
      amount: 10,
      eventId: eventId,
      gameId: selectionId,
      gameName: gameName,
      loss,
      marketId: marketId,
      marketName: marketName,
      odd: odd,
      profit,
      side: side,
      sportId: id
    }
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const fn_getLiveMarkets = () => {
    const intervalId = setInterval(async () => {
      if (location.pathname !== "/") {
        clearInterval(intervalId);
        return;
      }

      const response = await getLiveMarketsApi(id);
      setMarketData(response?.data);
      dispatch(updateLiveMarkets({ ...liveMarkets, [sportName]: response?.data }));
    }, 500);
  };

  useEffect(() => {
    fn_getLiveMarkets();
  }, [location.pathname]);

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
          {marketData?.length > 0 && marketData?.map((competition: any) => (
            <div key={competition?.competitionId} className="bg-white mt-[5px] rounded-[7px]">
              {/* header */}
              <div
                onClick={() => setSub1(!sub1)}
                className="text-[--text-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] sm:text-[15px] justify-between cursor-pointer"
                style={{ backgroundColor: webColor }}
              >
                <p>{competition?.competitionName}</p>
                <div className="flex items-center gap-[10px]">
                  <p>{competition?.events?.length}</p>
                  <IoIosArrowUp
                    className={`${!sub1 ? "-rotate-180" : ""
                      } transition-all duration-300`}
                  />
                </div>
              </div>
              {/* content */}
              <div>
                {competition?.events?.map((event: any) => (
                  <Link
                    onClick={() => setTimeout(() => window.location.reload(), 1000)}
                    to={`/match?sportId=${id}&eventId=${event?.match_id}`}
                    className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer"
                  >
                    <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
                      {/* <img src={crciketBall} alt="img" className="w-[21px]" /> */}
                      <p className="text-[14px]">
                        {event?.matchName}
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
                      {event?.odd?.numberOfRunners === 3 ? (
                        <>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[0]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[0]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[1]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[1]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[2]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[2]?.ex?.availableToBack[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[2]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[2]?.ex?.availableToLay[0]?.size}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[0]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[0]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToLay[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[0]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[0]?.ex?.availableToBack[1]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[1]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[1]?.selectionId,
                              "Back",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToBack[0]?.size}
                            </p>
                          </div>
                          <div
                            className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                            onClick={(e) => handleBetClicked(
                              e,
                              event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.price,
                              event?.matchName,
                              event?.odd?.runners?.[1]?.selectionId,
                              "Lay",
                              event?.match_id,
                              event?.market_id,
                              event?.marketname
                            )}
                          >
                            <p className="font-[800] text-center text-[12px] sm:text-[14px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.price}
                            </p>
                            <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                              {event?.odd?.runners?.[1]?.ex?.availableToLay[1]?.size}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CricketDropdownsSection;
