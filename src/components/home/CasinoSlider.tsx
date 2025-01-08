import 'swiper/css';
import 'swiper/css/navigation';
import toast from 'react-hot-toast';
import { useState, useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { MdWatchLater } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CasinoBoxes, CasinoUpperBoxes } from '../../assets/data';

const CasinoSlider = () => {
    const toastRef = useRef<string | null>(null);
    const [casinoBoxes, setCasinoBoxes] = useState(CasinoBoxes);
    const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => {
        setCasinoBoxes((prevBoxes) =>
            prevBoxes.map((item) =>
                item.id === id ? { ...item, hover: true } : item
            )
        );
    };
    const handleMouseLeave = (id: number) => {
        setCasinoBoxes((prevBoxes) =>
            prevBoxes.map((item) =>
                item.id === id ? { ...item, hover: false } : item
            )
        );
    };
    return (
        <>
            <p className="text-[18px] font-[500] mt-[15px]">Live Casino</p>
            <div className="relative mt-[10px]">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={10}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper"
                >
                    {CasinoUpperBoxes?.map((box) => (
                        <SwiperSlide 
                            key={box.id} 
                            style={{ width: '300px', cursor: 'pointer' }}
                            onMouseEnter={() => setHoveredSlide(box.id)}
                            onMouseLeave={() => setHoveredSlide(null)}
                            onClick={() => {
                                if (toastRef.current) {
                                    toast.dismiss(toastRef.current);
                                }
                                toastRef.current = toast.error('Coming Soon', {
                                    icon: <MdWatchLater style={{ color: 'orange' }} />,
                                    duration: 4000,
                                    position: 'top-center'
                                });
                            }}
                        >
                            <div className={`h-[165px] w-[300px] rounded-[5px] relative ${hoveredSlide === box.id ? 'blur-[3px]' : ''}`}>
                                <img alt='img' src={box.img} className='w-[300px] h-[165px] rounded-[5px] object-center object-cover' />
                                <div className='absolute w-full h-[35px] bg-gray-800 left-0 bottom-0 rounded-b-[5px] flex justify-center items-center'>
                                    <p className='text-[13px] font-[500] text-center text-white'>{box.label}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="relative mt-[10px]">
                <div className="w-[100%] xl:me-[15px] pt-[15px] grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[5px] sm:gap-[10px] h-[max-content]">
                    {casinoBoxes?.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-[10px] relative"
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                        >
                            <img alt={item.label} src={item.img} className="w-full rounded-[5px] object-cover" />
                            <div className={`absolute left-0 top-0 h-full w-full rounded-[5px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${item.hover ? 'opacity-100' : 'opacity-0'}`}>
                                <button 
                                    className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${item.hover ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                                    onClick={() => {
                                        if (toastRef.current) {
                                            toast.dismiss(toastRef.current);
                                        }
                                        toastRef.current = toast.error('Coming Soon', {
                                            icon: <MdWatchLater style={{ color: 'orange' }} />,
                                            duration: 4000,
                                            position: 'top-center'
                                        });
                                    }}
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CasinoSlider;
