import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import { GoDotFill } from "react-icons/go";
import { MdFullscreen } from "react-icons/md";

interface RightSliderProps {
  sportId: string | number;
  eventId: string | number;
  cricketScore: any;
  selectedEvent: any
}

const RightSlider: React.FC<RightSliderProps> = ({ sportId, eventId, cricketScore, selectedEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.stopPropagation();
      return true;
    };

    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  return (
    <>
      <div className="w-full max-w-[450px] mx-auto rounded-[7px] relative">
        <div className="w-[30px] h-[30px] bg-[#000000cb] absolute z-[99] right-[2px] top-[2px] rounded-[7px] flex justify-center items-center cursor-pointer text-white" onClick={() => setIsModalOpen(!isModalOpen)}>
          <MdFullscreen className="text-[23px]" />
        </div>
        <div className="relative pt-[56.25%]">
          <iframe
            src={`https://dpmatka.in/dcasino/nntv.php?MatchID=${eventId}`}
            className="absolute top-0 left-0 w-full h-full bg-black rounded-[7px]"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            frameBorder="0"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-presentation"
          ></iframe>
        </div>
        <Modal
          title=""
          open={isModalOpen}
          onOk={() => setIsModalOpen(!isModalOpen)}
          onCancel={() => setIsModalOpen(!isModalOpen)}
          centered
          width={"99%"}
          footer={null}
          className="custom-modal"
          wrapClassName="custom-modal-mask"
        >
          <div className="relative pt-[56.25%]">
            <iframe
              src={`https://dpmatka.in/dcasino/nntv.php?MatchID=${eventId}`}
              className="absolute top-0 left-0 w-full h-full bg-black rounded-[7px]"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            ></iframe>
          </div>
        </Modal>
      </div>
      {sportId !== "4" && (
        <div className="w-full max-w-[450px] mx-auto rounded-[7px] relative">
          <div className="relative pt-[56.25%] mt-[7px]">
            <iframe
              src={`https://dpmatka.in/sr.php?eventid=${eventId}&sportid=${sportId}`}
              className="absolute top-0 left-0 w-full h-full bg-black rounded-[7px]"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              frameBorder="0"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            ></iframe>
          </div>
        </div>
      )}
      {sportId === "4" && cricketScore?.data && (
        <div className="w-full max-w-[450px] mx-auto rounded-[7px] relative mt-[7px] p-[7px] flex flex-col gap-[5px]">
          <p className="text-center uppercase text-[16px] font-[600] border-b pb-[10px] mb-[5px]">{selectedEvent?.competitionName}</p>
          {/* first team score */}
          <div className={`flex justify-between text-[15px] font-[500] ${cricketScore?.data?.activenation1 === "1" ? "text-black" : "text-gray-400"}`}>
            <p className="flex">{cricketScore?.data?.spnnation1}{cricketScore?.data?.activenation1 === "1" && <GoDotFill className="text-[#e34242] animate-pulse scale-[0.7] ml-[-2px]" />}</p>
            <div>
              <div className="flex gap-[4px]">
                {cricketScore?.data?.score1?.replace(/\s+/g, '').split("&")?.map((score: string) => {
                  return (<p>{score.split("(")[0]} <span className="text-[11px] font-[400] text-purple-600">({score.split("(")[1]}</span> {cricketScore?.data?.score1?.replace(/\s+/g, '').split("&")?.length > 1 && cricketScore?.data?.score1?.replace(/\s+/g, '').split("&")[0] === score && "&"}</p>)
                })}
              </div>
              {cricketScore?.data?.spnrunrate1 !== "" && (
                <p className="text-[12px] text-gray-400 font-[400] text-right">CRR {cricketScore?.data?.spnrunrate1}</p>
              )}
            </div>
          </div>
          {/* second team score */}
          <div className={`flex justify-between text-[15px] font-[500] mb-[4px] ${cricketScore?.data?.activenation2 === "1" ? "text-black" : "text-gray-400"}`}>
            <p className="flex">{cricketScore?.data?.spnnation2}{cricketScore?.data?.activenation2 === "1" && <GoDotFill className="text-[#e34242] animate-pulse scale-[0.7] ml-[-2px]" />}</p>
            <div>
              <div className="flex gap-[4px]">
                {cricketScore?.data?.score2?.replace(/\s+/g, '').split("&")?.map((score: string) => {
                  return (<p>{score.split("(")[0]} <span className="text-[11px] font-[400] text-purple-600">({score.split("(")[1]}</span> {cricketScore?.data?.score2?.replace(/\s+/g, '').split("&")?.length > 1 && cricketScore?.data?.score2?.replace(/\s+/g, '').split("&")[0] === score && "&"}</p>)
                })}
              </div>
              {cricketScore?.data?.spnrunrate2 !== "" && (
                <p className="text-[12px] text-gray-400 font-[400] text-right">CRR {cricketScore?.data?.spnrunrate2}</p>
              )}
            </div>
          </div>
          {/* balls */}
          <div className="flex w-full justify-between items-center border-y py-[10px]">
            <p className="text-[12px] sm:text-[14px] font-[500] uppercase">Last 6 balls</p>
            <div className="flex gap-[5px] mt-[-2px] justify-center">
              {cricketScore?.data?.balls.map((ball: any, index: any) => (
                <div
                  key={index}
                  className={`w-[29px] h-[29px] sm:w-[31px] sm:h-[31px] rounded-full flex justify-center items-center text-[13px] sm:text-[14px] font-[500] ${ball === "ww" ? "bg-[#e34242] text-white" : ball === "4" ? "bg-[#0e9c68] text-white" : ball === "6" ? "bg-blue-500 text-white" : "bg-gray-300 sm:bg-gray-200 text-black"}`}
                >
                  {ball === "ww" ? "W" : ball}
                </div>
              ))}
            </div>
          </div>
          {/* message */}
          {cricketScore?.data?.spnmessage && cricketScore?.data?.spnmessage !== "" && (
            <p className="text-center text-[15px] font-[500] text-[#05a9f5] mt-[7px]">{cricketScore?.data?.spnmessage}</p>
          )}
        </div>
      )}
    </>
  );
};

export default RightSlider;