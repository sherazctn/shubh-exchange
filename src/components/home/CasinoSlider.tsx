import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import casino1 from "../../assets/casino-1.png";
import casino2 from "../../assets/casino-2.png";
import casino3 from "../../assets/casino-3.png";
import casino4 from "../../assets/casino-4.png";
import casino5 from "../../assets/casino-5.png";

const CasinoSlider = () => {
    const [img1, setImg1] = useState(false);
    const [img2, setImg2] = useState(false);
    const [img3, setImg3] = useState(false);
    const [img4, setImg4] = useState(false);
    const [img5, setImg5] = useState(false);
    const [img6, setImg6] = useState(false);
    const [img7, setImg7] = useState(false);
    const [img8, setImg8] = useState(false);
    const [img9, setImg9] = useState(false);
    const [img10, setImg10] = useState(false);
    const [img11, setImg11] = useState(false);
    const [img12, setImg12] = useState(false);
    const [img13, setImg13] = useState(false);
    const [img14, setImg14] = useState(false);
    const [img15, setImg15] = useState(false);
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
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg1(true)} onMouseLeave={() => setImg1(false)}>
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img1 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img1 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg2(true)} onMouseLeave={() => setImg2(false)}>
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img2 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img2 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg3(true)} onMouseLeave={() => setImg3(false)}>
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img3 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img3 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg4(true)} onMouseLeave={() => setImg4(false)}>
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img4 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img4 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg5(true)} onMouseLeave={() => setImg5(false)}>
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img5 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img5 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg6(true)} onMouseLeave={() => setImg6(false)}>
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img6 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img6 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg7(true)} onMouseLeave={() => setImg7(false)}>
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img7 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img7 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg8(true)} onMouseLeave={() => setImg8(false)}>
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img8 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img8 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg9(true)} onMouseLeave={() => setImg9(false)}>
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img9 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img9 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg10(true)} onMouseLeave={() => setImg10(false)}>
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img10 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img10 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg11(true)} onMouseLeave={() => setImg11(false)}>
                            <img alt='img' src={casino1} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img11 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img11 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg12(true)} onMouseLeave={() => setImg12(false)}>
                            <img alt='img' src={casino2} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img12 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img12 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg13(true)} onMouseLeave={() => setImg13(false)}>
                            <img alt='img' src={casino3} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img13 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img13 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg14(true)} onMouseLeave={() => setImg14(false)}>
                            <img alt='img' src={casino4} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img14 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img14 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide style={{ width: '200px' }}>
                        <div className="min-h-[250px] w-[200px] rounded-[10px] relative" onMouseEnter={() => setImg15(true)} onMouseLeave={() => setImg15(false)}>
                            <img alt='img' src={casino5} className='w-[200px] h-[250px] rounded-[10px] object-center object-cover' />
                            <div className={`absolute left-0 top-0 h-[250px] w-[200px] rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${img15 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${img15 ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                    Play
                                </button>
                            </div>
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
