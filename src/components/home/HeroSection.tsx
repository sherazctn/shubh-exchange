import "swiper/css";
import "swiper/css/autoplay";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import URL, { getBannersApi } from "../../api/api";

const HeroSection = () => {
  const [banners, setBanners] = useState([]);
  const fn_getBanners = async () => {
    const response = await getBannersApi();
    if (response?.status) {
      setBanners(response?.data);
    }
  };
  useEffect(() => {
    fn_getBanners();
  }, []);
  return (
    <div>
      {banners?.length > 0 && (
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          modules={[Autoplay, Navigation]}
          className="home-hero-section-swiper max-h-[700px] mb-[15px]"
          spaceBetween={50}
          slidesPerView={1}
        >
          {banners?.map((item: any) => (
            <SwiperSlide><img src={`${URL}/${item?.image}`} alt="banner1" className="object-contain rounded-[10px] object-center" /></SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroSection;
