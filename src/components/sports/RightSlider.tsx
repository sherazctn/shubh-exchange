import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import React, { useEffect, useState } from 'react';
import { MdFullscreen } from "react-icons/md";

import { Modal } from 'antd';

interface RightSliderProps {
  sportId: string | number;
  eventId: string | number;
}

const RightSlider: React.FC<RightSliderProps> = ({ sportId, eventId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Attempt to disable right-click prevention
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
            referrerPolicy="no-referrer"
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
              referrerPolicy="no-referrer"
              scrolling="no"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            ></iframe>
          </div>
        </Modal>
      </div>
      {/* <div className="w-full max-w-[450px] mx-auto rounded-[7px] relative">
        <div className="relative pt-[56.25%] mt-[7px]">
          <iframe
            src={`https://dpmatka.in/sr.php?eventid=${eventId}&sportid=${sportId}`}
            className="absolute top-0 left-0 w-full h-full bg-black rounded-[7px]"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            frameBorder="0"
            referrerPolicy="no-referrer"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-presentation"
          ></iframe>
        </div>
      </div> */}
    </>
  );
};

export default RightSlider;