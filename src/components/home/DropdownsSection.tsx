import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GoDotFill } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";

import crciketBall from "../../assets/cricket-ball.png";
import { updateBets, updateBettingSlip } from "../../features/features";
import { getLiveMarketsApi } from "../../api/api";

const CricketDropdownsSection = ({ text, id }: any) => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const webColor = useSelector((state: any) => state.websiteColor);
  const wallet = useSelector((state: any) => state.wallet);
  const bets = useSelector((state: any) => state.bets);
  const authentication = useSelector((state: any) => state.authentication);
  const liveCricket = useSelector((state: any) => state.liveCricket);
  const [sub1, setSub1] = useState(true);
  const [sub2, setSub2] = useState(true);
  const [sub3, setSub3] = useState(true);

  const [marketData, setMarketData] = useState([]);
  const eventData = useSelector((state: any) => state.eventData)?.find((i: any) => i.sportId == id);

  const handleBetClicked = (e: any, odd: any, gameName: any, side: string, runner: string, sport: string, adminCommission: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authentication) return toast.error("Login Yourself")
    if (!odd) return;
    if (!gameName) return;
    const profit = parseFloat((10 * (odd - 1)).toFixed(2));
    const loss = 10;
    const obj = {
      odd: odd,
      gameName: gameName,
      amount: 10,
      afterWin: wallet + profit,
      afterLoss: wallet - 10,
      profit,
      loss,
      side: side,
      runner: runner,
      sport: sport,
      adminCommision: adminCommission
    }
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }

  const fn_getLiveMarkets = async () => {
    const response = await getLiveMarketsApi(id);
    console.log(response?.data);
    setMarketData(response?.data);
    console.log("eventData ", eventData);
  }

  useEffect(() => {
    fn_getLiveMarkets();
  }, []);

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
          {liveCricket?.length > 0 && liveCricket?.map((item: any) => (
            <div key={item?.competitionId} className="bg-white mt-[5px] rounded-[7px]">
              {/* header */}
              <div
                onClick={() => setSub1(!sub1)}
                className="text-[--text-color] h-[40px] rounded-t-[7px] flex items-center px-[20px] font-[500] text-[13px] sm:text-[15px] justify-between cursor-pointer"
                style={{ backgroundColor: webColor }}
              >
                <p>{item?.competitionName}</p>
                <div className="flex items-center gap-[10px]">
                  <p>1</p>
                  <IoIosArrowUp
                    className={`${!sub1 ? "-rotate-180" : ""
                      } transition-all duration-300`}
                  />
                </div>
              </div>
              {/* content */}
              <div>
                <Link
                  to={`/cricket/live/${item?.competitionId}`}
                  className="min-h-[65px] border-b pb-[10px] md:pb-0 flex flex-col md:flex-row items-center justify-between px-[11px] cursor-pointer"
                >
                  <div className="flex w-full md:w-auto items-center gap-4 ms-2.5 min-h-[55px] md:min-h-auto">
                    <img src={crciketBall} alt="img" className="w-[21px]" />
                    <p className="text-[14px]">
                      {item?.name}
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
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                      onClick={(e) => handleBetClicked(e, item?.odds?.Runners[0]?.ExchangePrices?.AvailableToLay[0]?.price, item?.name, "Lay", item?.odds?.Runners[0]?.runnerName, item?.sport, item?.adminCommission)}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {item?.odds?.Runners[0]?.ExchangePrices?.AvailableToLay[0]?.price}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[0]?.ExchangePrices?.AvailableToLay[0]?.size}
                      </p>
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                      onClick={(e) => handleBetClicked(e, item?.odds?.Runners[0]?.ExchangePrices?.AvailableToBack[0]?.price, item?.name, "Back", item?.odds?.Runners[0]?.runnerName, item?.sport, item?.adminCommission)}
                    >
                      <p className="font-[800] text-center text-[15px]">
                        {item?.odds?.Runners[0]?.ExchangePrices?.AvailableToBack[0]?.price}
                      </p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[0]?.ExchangePrices?.AvailableToBack[0]?.size}
                      </p>
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]"
                      onClick={(e) => handleBetClicked(e, item?.odds?.Runners[2]?.ExchangePrices?.AvailableToLay[0]?.price, item?.name, "Lay", item?.odds?.Runners[2]?.runnerName, item?.sport, item?.adminCommission)}
                    >
                      <p className="font-[800] text-center text-[15px]">
                        {item?.odds?.Runners[2]?.ExchangePrices?.AvailableToLay[0]?.price}
                      </p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[2]?.ExchangePrices?.AvailableToLay[0]?.size}
                      </p>
                    </div>
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                      onClick={(e) => handleBetClicked(e, item?.odds?.Runners[2]?.ExchangePrices?.AvailableToBack[0]?.price, item?.name, "Back", item?.odds?.Runners[2]?.runnerName, item?.sport, item?.adminCommission)}
                    >
                      <p className="font-[800] text-center text-[15px]">
                        {item?.odds?.Runners[2]?.ExchangePrices?.AvailableToBack[0]?.price}
                      </p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[2]?.ExchangePrices?.AvailableToBack[0]?.size}
                      </p>
                    </div>
                    <div onClick={(e) => handleBetClicked(e, item?.odds?.Runners[1]?.ExchangePrices?.AvailableToLay[0]?.price, item?.name, "Lay", item?.odds?.Runners[1]?.runnerName, item?.sport, item?.adminCommission)} className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                      <p className="font-[800] text-center text-[15px]">
                        {item?.odds?.Runners[1]?.ExchangePrices?.AvailableToLay[1]?.price}
                      </p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[1]?.ExchangePrices?.AvailableToLay[1]?.size}
                      </p>
                    </div>
                    <div
                      onClick={(e) => handleBetClicked(e, item?.odds?.Runners[1]?.ExchangePrices?.AvailableToBack[0]?.price, item?.name, "Back", item?.odds?.Runners[0]?.runnerName, item?.sport, item?.adminCommission)}
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]"
                    >
                      <p className="font-[800] text-center text-[15px]">
                        {item?.odds?.Runners[1]?.ExchangePrices?.AvailableToBack[1]?.price}
                      </p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {item?.odds?.Runners[1]?.ExchangePrices?.AvailableToBack[1]?.size}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CricketDropdownsSection;
