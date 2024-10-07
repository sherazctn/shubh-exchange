import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import casino1 from "../../assets/casino-1.png";
import casino2 from "../../assets/casino-2.png";
import casino3 from "../../assets/casino-3.png";
import casino4 from "../../assets/casino-4.png";
import casino5 from "../../assets/casino-5.png";

const CasinoSlider = () => {
    return (
        <>
            <p className="text-[18px] font-[500] mt-[15px]">Live Casino</p>
            <div className="relative mt-[10px]">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={30}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    autoplay={{
                        delay: 5000, // Auto scroll every 5 seconds
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px]">
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Navigation buttons */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </>
    );
};

export default CasinoSlider;
