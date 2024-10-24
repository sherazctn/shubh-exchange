import { useState } from "react";

import Footer from "../footer/page";

import cashoutImg from "../../assets/cashout.png";

import { IoIosArrowUp } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { updateBettingSlip } from "../../features/features";

const LiveCricketLeftSection = () => {
  const divHeight = `${window.innerHeight - 60}px`;
  const [tabs, setTabs] = useState("all");
  const [matchOdds, setMatchOdds] = useState(true);
  const [tiedMatch, setTiedMatch] = useState(true);
  const [fancyMatch, setFancyMatch] = useState(true);

  const webColor = useSelector((state: any) => state.websiteColor);

  return (
    <div
      className="w-[100%] lg:me-[15px] overflow-auto pt-[15px]"
      style={{ maxHeight: divHeight }}
    >
      <div className="min-h-[120px] text-[--text-color] rounded-[7px] mb-[10px] p-[15px] flex flex-col justify-center items-center" style={{ backgroundColor: webColor }}>
        <p className="text-[23px] text-center">One Day Internationals</p>
        <p className="text-[22px] text-center">England VS Australia</p>
        <button className="live-match-btn">IN-PLAY</button>
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
        <div
          className={`h-[47px] pt-[1px] rounded-[7px] text-[14px] min-w-[90px] flex-1 flex justify-center items-center cursor-pointer font-[600] ${tabs === "match-odd" ? "text-[--text-color]" : ""
            }`}
          style={{ backgroundColor: tabs === "match-odd" ? webColor : "white" }}
          onClick={() => setTabs("match-odd")}
        >
          Match Odd
        </div>
        <div
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
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        {(tabs === "all" || tabs === "match-odd") && (
          <MatchOdds matchOdds={matchOdds} setMatchOdds={setMatchOdds} webColor={webColor} />
        )}
        {tabs === "all" && (
          <TiedMatch tiedMatch={tiedMatch} setTiedMatch={setTiedMatch} webColor={webColor} />
        )}
        {(tabs === "all" || tabs === "fancy") && (
          <FancyMatch fancyMatch={fancyMatch} setFancyMatch={setFancyMatch} tabs={tabs} setTabs={setTabs} webColor={webColor} />
        )}
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default LiveCricketLeftSection;

const MatchOdds = ({ matchOdds, setMatchOdds, webColor }: any) => {
  const dispatch = useDispatch();
  const handleBetClicked = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateBettingSlip("open"));
  }
  return (
    <div className="bg-white shadow-sm rounded-[7px]">
      <div
        className="h-[47px] flex justify-between border-b cursor-pointer"
        onClick={() => setMatchOdds(!matchOdds)}
      >
        <div className="text-[--text-color] flex justify-center items-center rounded-br-[13px] w-[max-content] h-[100%] px-[10px] text-[14px] font-[600]" style={{ backgroundColor: webColor }}>
          Match Odds
        </div>
        <div className="flex gap-[7px] items-center pe-[10px]">
          <div className="h-[37px] cursor-not-allowed bg-[--cashout] rounded-[7px] flex gap-[5px] justify-center items-center text-[14px] font-[600] px-[10px]">
            <img alt="cashout" src={cashoutImg} className="w-[20px]" />
            CashOut
          </div>
          <HiMiniInformationCircle className="text-[20px]" />
          <IoIosArrowUp
            className={`${!matchOdds && "-rotate-180"
              } transition-all duration-300`}
          />
        </div>
      </div>
      {matchOdds && (
        <div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <BsGraphUp />
              <p className="text-[15px] font-[500]">England</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                  620
                </p>
                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
            </div>
          </div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <BsGraphUp />
              <p className="text-[15px] font-[500]">Australia</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[13px] sm:text-[15px]">
                  620
                </p>
                <p className="font-[600] text-center text-[9px] sm:text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
                <p className="font-[800] text-center text-[15px]">620</p>
                <p className="font-[600] text-center text-[10px] text-gray-700 leading-[11px]">
                  3.35k
                </p>
              </div>
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px] cursor-pointer" onClick={handleBetClicked}>
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
  );
};

const TiedMatch = ({ tiedMatch, setTiedMatch, webColor }: any) => {
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
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
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
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
            </div>
          </div>
          <div className="min-h-[55px] py-[4px] flex flex-col sm:flex-row gap-[5px] justify-between items-center px-[10px] border-b">
            <div className="flex h-[100%] items-center gap-[5px] text-gray-500 w-full sm:w-auto">
              <BsGraphUp />
              <p className="text-[15px] font-[500]">No</p>
            </div>
            <div className="flex flex-wrap gap-[7px] sm:gap-[11px] justify-center items-center">
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--blue] flex flex-col justify-between py-[6px]">
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
              <div className="h-[43px] sm:h-[47px] w-[43px] sm:w-[47px] rounded-[5px] bg-[--red] flex flex-col justify-between py-[6px]">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FancyMatch = ({ fancyMatch, setFancyMatch, tabs, setTabs, webColor }: any) => {
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
      {fancyMatch && (
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
