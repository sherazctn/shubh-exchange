import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import React, { useEffect, useState } from 'react';
import { MdFullscreen } from "react-icons/md";

import { Modal } from 'antd';

interface RightSliderProps {
  sportId: string | number;
  eventId: string | number;
  cricketScore: any;
}

const RightSlider: React.FC<RightSliderProps> = ({ sportId, eventId, cricketScore }) => {
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
            src={`https://dpmatka.in/dd.php?sportId=${sportId}&eventId=${eventId}`}
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
              src={`https://dpmatka.in/dd.php?sportId=${sportId}&eventId=${eventId}`}
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
          <div className="flex justify-between text-[15px] font-[500]">
            <p>{cricketScore?.data?.spnnation1}</p>
            {cricketScore?.data?.score1 !== "0-0 (0.0)" ? (
              <p className="flex flex-col text-right">
                {cricketScore?.data?.score1}
                {cricketScore?.data?.spnrunrate1 !== "" && (
                  <span className="text-[12px] text-gray-400">R.R {cricketScore?.data?.spnrunrate1}</span>
                )}
              </p>
            ) : (
              <p className="flex flex-col">Yet to bat</p>
            )}
          </div>
          <div className="flex justify-between text-[15px] font-[500]">
            <p>{cricketScore?.data?.spnnation2}</p>
            {cricketScore?.data?.score2 !== "0-0 (0.0)" ? (
              <p className="flex flex-col text-right">
                {cricketScore?.data?.score2}
                {cricketScore?.data?.spnrunrate2 !== "" && (
                  <span className="text-[12px] text-gray-400">R.R {cricketScore?.data?.spnrunrate2}</span>
                )}
              </p>
            ) : (
              <p className="flex flex-col">Yet to bat</p>
            )}
          </div>
          {cricketScore?.data?.spnmessage && cricketScore?.data?.spnmessage !== "" && (
            <p className="text-center text-[15px] font-[500]">{cricketScore?.data?.spnmessage}</p>
          )}
          <p className="text-[14px] font-[500]">Running Over</p>
          <div className="flex gap-[5px] mt-[-2px]">
            {(() => {
              const runRate1 = cricketScore?.data?.spnrunrate1;
              const runRate2 = cricketScore?.data?.spnrunrate2;

              if (runRate1 !== "") {
                const totalBalls = cricketScore?.data?.score1.toString().includes('.') ? parseInt(cricketScore?.data?.score1.toString().split('.')[1][0] || null, 10) : null;
                console.log("1 ", totalBalls)
                if (totalBalls !== null) {
                  return (
                    <>
                      {totalBalls === 0 ? cricketScore?.data?.balls.map((ball: any, index: any) => (
                      <div
                        key={index}
                        className="w-[33px] h-[33px] rounded-full bg-gray-200 flex justify-center items-center text-[15px] font-[500]"
                      >
                        {ball}
                      </div>
                      )) : Array.from({ length: totalBalls }).map((_, i: any) => (
                          <div
                            key={i}
                            className="w-[33px] h-[33px] rounded-full bg-gray-200 flex justify-center items-center text-[15px] font-[500]"
                          >
                            {cricketScore?.data?.balls[i]}
                          </div>
                        )
                      )}
                    </>
                  );
                }
              } else if (runRate2 !== "") {
                const totalBalls = cricketScore?.data?.score2.toString().includes('.') ? parseInt(cricketScore?.data?.score2.toString().split('.')[1][0] || null, 10) : null;
                console.log("2 ", totalBalls);
                if (totalBalls !== null) {
                  return (
                    <>
                      {Array.from({ length: totalBalls }).map((_, i: any) => (
                        totalBalls === 0 ? (
                          <div
                            key={i}
                            className="flex gap-2"
                          >
                            {cricketScore?.data?.balls.map((ball: any, index: any) => (
                              <div
                                key={index}
                                className="w-[33px] h-[33px] rounded-full bg-gray-200 flex justify-center items-center text-[15px] font-[500]"
                              >
                                {ball}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            key={i}
                            className="w-[33px] h-[33px] rounded-full bg-gray-200 flex justify-center items-center text-[15px] font-[500]"
                          >
                            {cricketScore?.data?.balls[i]}
                          </div>
                        )
                      ))}
                    </>
                  );
                }
              }

              return null;
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default RightSlider;