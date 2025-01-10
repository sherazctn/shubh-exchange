import "swiper/css";
import "swiper/css/autoplay";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import banner1 from "../../assets/banner_1.jpg";
import banner2 from "../../assets/banner_2.jpg";
import banner3 from "../../assets/banner_3.jpg";
import banner4 from "../../assets/banner_4.jpg";
import banner5 from "../../assets/banner_5.jpg";
import banner6 from "../../assets/banner_6.jpg";
import banner7 from "../../assets/banner_7.jpg";
import banner8 from "../../assets/banner_8.jpg";

const HeroSection = () => {
  const webColor = useSelector((state: any) => state.websiteColor);
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Navigation]}
        className="home-hero-section-swiper max-h-[700px]"
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide><img src={banner1} alt="banner1" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner2} alt="banner2" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner3} alt="banner3" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner4} alt="banner4" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner5} alt="banner5" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner6} alt="banner6" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner7} alt="banner7" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        <SwiperSlide><img src={banner8} alt="banner8" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
        {/* <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner2})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner3})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner4})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner5})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner6})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner7})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide>
        <SwiperSlide
          style={{
            backgroundColor: webColor,
            backgroundImage: `url(${banner8})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default HeroSection;
