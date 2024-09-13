import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import img1 from "../../assets/slide-img-1.png";

const RightSlider = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="sports-right-swiper h-[170px] sm:h-[300px]"
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide
          style={{
            backgroundImage: `url(https://media.cybernews.com/images/featured-big/2022/06/Best-VPNs-for-Betfair.jpg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url(${img1})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: `url(https://assets.cdnppb.net/lac/2023/06/27/f86c9e67b53c_ds107934_bingo_v1.jpg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RightSlider;
