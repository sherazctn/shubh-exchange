import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateMobileMenu, updatePageNav } from "../../features/features";

import { CasinoBoxes } from "../../assets/data";

const Casino = () => {
    const dispatch = useDispatch();
    const showSidebar = useSelector((state: any) => state.showSidebar);
    const [casinoBoxes, setCasinoBoxes] = useState(CasinoBoxes);
    useEffect(() => {
        dispatch(updateMobileMenu(false));
        dispatch(updatePageNav("casino"));
    }, [dispatch]);
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
        <div
            className={`content pt-[68px] sm:pt-[60px] ${showSidebar
                ? "ps-[10px] sm:ps-[20px] lg:ps-[285px]"
                : "ps-[10px] sm:ps-[20px] lg:ps-[85px]"
                } pe-[10px] sm:pe-[20px] flex`}
        >
            <div className="w-[100%] xl:me-[15px] pt-[15px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-[15px] h-[max-content]">
                {casinoBoxes?.map((item) => (
                    <div
                        key={item.id}
                        className="h-[250px] 2xl:h-[330px] rounded-[10px] relative"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={() => handleMouseLeave(item.id)}
                    >
                        <img alt={item.label} src={item.img} className="w-full rounded-[10px] min-h-[200px] 2xl:min-h-[280px] h-[200px] 2xl:h-[280px] object-cover" />
                        <p className="text-center pt-[10px] leading-[18px] text-[15px] font-[600]">{item.label}</p>
                        <div className={`absolute left-0 top-0 h-[200px] 2xl:h-[280px] w-full rounded-[10px] bg-black bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${item.hover ? 'opacity-100' : 'opacity-0'}`}>
                            <button className={`bg-black w-[75px] h-[30px] text-[14px] font-[500] text-white rounded-full border border-gray-600 transition-transform duration-300 ${item.hover ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                Play
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Casino;
