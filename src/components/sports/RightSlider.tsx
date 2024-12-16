import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import React, { useEffect } from 'react';

interface RightSliderProps {
  sportId: string | number;
  eventId: string | number;
}

const RightSlider: React.FC<RightSliderProps> = ({ sportId, eventId }) => {
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
    <div className="w-full max-w-[450px] mx-auto rounded-[7px]">
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
    </div>
  );
};

export default RightSlider;