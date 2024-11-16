import { useState } from "react";
import toast from "react-hot-toast";
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";

import Footer from "../footer/page";
import { updateBets, updateBettingSlip } from "../../features/features";

import cashoutImg from "../../assets/cashout.png";

import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { HiMiniInformationCircle } from "react-icons/hi2";

const LiveCricketLeftSection = ({ singleLiveCricket, markets, selectedEvent, runners }: any) => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [tabs, setTabs] = useState("all");
  const [matchOdds, setMatchOdds] = useState<string[]>([]);
  const [tiedMatch, setTiedMatch] = useState(true);
  const [fancyMatch, setFancyMatch] = useState(true);

  const webColor = useSelector((state: any) => state.websiteColor);
  const matchOddsData = [singleLiveCricket?.odds?.Runners[0], singleLiveCricket?.odds?.Runners[1]];
  const drawMatchData = singleLiveCricket?.odds?.Runners[2];
  const fancyMacthData = singleLiveCricket?.hasFancy;

  console.log("markets ==> ", markets);
  console.log("selectedEvent ==> ", selectedEvent);
  console.log("runners ==> ", runners);

  const eventDate: any = selectedEvent?.date ? parseISO(selectedEvent.date) : null;



  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[23px] text-center">{selectedEvent?.competitionName}</p>
        <p className="text-[22px] text-center">{selectedEvent?.eventName}</p>
        <button className="live-match-btn">{format(eventDate, "dd MMM yyyy, hh:mm a")}</button>
      </div>
      {/* tabs */}
      <div className="flex gap-[10px] overflow-auto mb-[10px]">
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "all" ? `text-[--text-color]` : ""
            }`}
          style={{ backgroundColor: tabs === "all" ? webColor : "white" }}
          onClick={() => setTabs("all")}
        >
          All
        </div>
        {markets?.map((item: any) => (
          <div
            className={`h-[47px] capitalize text-center pt-[1px] rounded-[7px] text-[14px] min-w-[max-content] px-[15px] flex-1 text-nowrap flex justify-center items-center cursor-pointer font-[600] ${tabs === item?.marketId ? "text-[--text-color]" : ""
              }`}
            style={{ backgroundColor: tabs === item?.marketId ? webColor : "white" }}
            onClick={() => setTabs(item?.marketId)}
          >
            {item?.marketName}
          </div>
        ))}
        {/* <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "bookmaker" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "bookmaker" ? webColor : "white" }}
          onClick={() => setTabs("bookmaker")}
        >
          Bookmaker
        </div>
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "line" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "line" ? webColor : "white" }}
          onClick={() => setTabs("line")}
        >
          Line
        </div>
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "fancy" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "fancy" ? webColor : "white" }}
          onClick={() => setTabs("fancy")}
        >
          Fancy
        </div> */}
      </div>
      <div className="flex flex-col gap-[10px]">
        {markets?.map((item: any) => {
          const filterData = runners.find((runner: any) => runner?.[0]?.marketId === item?.marketId);
          return (
            <MatchOdds market={item} webColor={webColor} matchOdds={matchOdds} setMatchOdds={setMatchOdds} runner={filterData ? filterData[0] : null} />
          )
        })}
        {/* {tabs === "all" && (
          <TiedMatch tiedMatch={tiedMatch} setTiedMatch={setTiedMatch} webColor={webColor} drawMatchData={drawMatchData} />
        )}
        {(tabs === "all" || tabs === "fancy") && (
          <FancyMatch fancyMatch={fancyMatch} setFancyMatch={setFancyMatch} tabs={tabs} setTabs={setTabs} webColor={webColor} />
        )} */}
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default LiveCricketLeftSection;

const MatchOdds = ({ market, webColor, matchOdds, setMatchOdds, runner }: any) => {
  const dispatch = useDispatch();
  const bets = useSelector((state: any) => state.bets);
  const wallet = useSelector((state: any) => state.wallet);
  const authentication = useSelector((state: any) => state.authentication);
  const fn_controlOddsView = (id: string) => {
    const findId = matchOdds.find((m: any) => m === id);
    if (findId) {
      const updatedData = matchOdds.filter((m: any) => m !== id);
      setMatchOdds(updatedData);
    } else {
      setMatchOdds((prev: any) => ([...prev, id]));
    }
  }
  const handleBetClicked = (e: any, odd: any, gameName: any, side: string, runner: string) => {
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
    }
    const updatedBets = [obj, ...bets];
    dispatch(updateBets(updatedBets));
    dispatch(updateBettingSlip("open"));
  }
  return (
    <div key={market.marketId} className="bg-white shadow-sm rounded-[7px]">
      <div
        className="h-[47px] flex justify-between border-b cursor-pointer"
        onClick={() => fn_controlOddsView(market.marketId)}
      >
        <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
          {market.marketName}
        </div>
        <div className="flex gap-[7px] items-center pe-[10px]">
          <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
            <img alt="cashout" src={cashoutImg} className="w-[20px]" />
            CashOut
          </div>
          <HiMiniInformationCircle className="text-[20px]" />
          <IoIosArrowUp className={`transition-all duration-300 ${matchOdds.find((m: any) => m === market.marketId) ? "rotate-180" : "rotate-0"}`} />
        </div>
      </div>
      {runner && market.odds && !matchOdds.find((m: any) => m === market.marketId) && (
        <div>
          {runner.runners?.map((item: any, index: any) => {
            const odd = market.odds.runners.find((run: any) => run.selectionId === item?.selectionId);
            return (
              <div key={index} className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                  <BsGraphUp />
                  <p className="text-[15px] font-[500]">{item?.runnerName}</p>
                </div>
                <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                  {odd?.lay?.map((i: any) => (
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer"
                    // onClick={(e) => handleBetClicked(e, i?.price, item?.name, "Lay", item?.runnerName)}
                    >
                      <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                        {i?.price}
                      </p>
                      <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                        {i?.size}
                      </p>
                    </div>
                  ))}
                  {odd?.back?.map((i: any) => (
                    <div
                      className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer"
                    // onClick={(e) => handleBetClicked(e, i?.price, item?.name, "Lay", item?.runnerName)}
                    >
                      <p className="font-[800] text-center text-[15px]">{i?.price}</p>
                      <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                        {i?.size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

const TiedMatch = ({ tiedMatch, setTiedMatch, webColor, drawMatchData }: any) => {
  return (
    <div className="bg-white shadow-sm rounded-[7px]">
      <div
        className="h-[47px] flex justify-between border-b cursor-pointer"
        onClick={() => setTiedMatch(!tiedMatch)}
      >
        <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
          Tied Match
        </div>
        <div className="flex gap-[7px] items-center pe-[10px]">
          <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
            <img alt="cashout" src={cashoutImg} className="w-[20px]" />
            CashOut
          </div>
          <HiMiniInformationCircle className="text-[20px]" />
          <IoIosArrowUp
            className={`${!tiedMatch && "-rotate-180"
              } transition-all duration-300`}
          />
        </div>
      </div>
      {tiedMatch && (
        <div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <BsGraphUp />
              <p className="text-[15px] font-[500]">Yes</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              {drawMatchData?.ExchangePrices?.AvailableToBack?.map((i: any) => (
                <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                  <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                    {i?.price}
                  </p>
                  <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                    {i?.size}
                  </p>
                </div>
              ))}
              {drawMatchData?.ExchangePrices?.AvailableToLay?.map((i: any) => (
                <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                  <p className="font-[800] text-center text-[15px]">{i?.price}</p>
                  <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                    {i?.size}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FancyMatch = ({ fancyMatch, setFancyMatch, tabs, setTabs, webColor, fancyMacthData }: any) => {
  return (
    <div className="bg-white shadow-sm rounded-[7px]">
      <div
        className="h-[47px] flex justify-between border-b cursor-pointer"
        onClick={() => setFancyMatch(!fancyMatch)}
      >
        <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
          Fancy Market
        </div>
        <div className="flex gap-[7px] items-center pe-[10px]">
          <HiMiniInformationCircle className="text-[20px]" />
          <IoIosArrowUp
            className={`${!fancyMatch && "-rotate-180"
              } transition-all duration-300`}
          />
        </div>
      </div>
      {fancyMatch && fancyMacthData && (
        <div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <p className="text-[15px] font-[500]">Total Match Run</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                  620
                </p>
                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
              </div>
            </div>
          </div>
          <div className="min-h-[55px] sm:pe-[142px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <p className="text-[15px] font-[500]">Total Match Run</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center relative">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-gray-200 flex flex-col justify-between py-[6px]"></div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-gray-200 flex flex-col justify-between py-[6px]"></div>
              <div className="w-[90px] rounded-[5px] bg-gray-500 h-[20px] absolute flex justify-center items-center text-white text-[13px] font-[500]">
                Ball Running
              </div>
            </div>
          </div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <p className="text-[15px] font-[500]">Total Match Run</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                  620
                </p>
                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
              </div>
            </div>
          </div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <p className="text-[15px] font-[500]">Total Match Run</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                  620
                </p>
                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  100
                </p>
              </div>
              <div>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
              </div>
            </div>
          </div>
          {tabs === "fancy" && (
            <>
              <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                  <p className="text-[15px] font-[500]">Total Match Run</p>
                </div>
                <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                      620
                    </p>
                    <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[15px]">620</p>
                    <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
                  </div>
                </div>
              </div>
              <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                  <p className="text-[15px] font-[500]">Total Match Run</p>
                </div>
                <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                      620
                    </p>
                    <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[15px]">620</p>
                    <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
                  </div>
                </div>
              </div>
              <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                  <p className="text-[15px] font-[500]">Total Match Run</p>
                </div>
                <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                      620
                    </p>
                    <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[15px]">620</p>
                    <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
                  </div>
                </div>
              </div>
              <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
                <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
                  <p className="text-[15px] font-[500]">Total Match Run</p>
                </div>
                <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                      620
                    </p>
                    <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
                    <p className="font-[800] text-center text-[15px]">620</p>
                    <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                      100
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Bet: 100.0K</p>
                    <p className="text-[13px] italic font-[500] text-gray-600">Max Market: 1000.0K</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {tabs === "all" && (
            <p
              className="px-[10px] py-[3px] text-[14px] font-[500] hover:underline cursor-pointer w-[max-content]"
              onClick={() => setTabs("fancy")}
            >
              See More
            </p>
          )}
        </div>
      )}
    </div>
  );
};
