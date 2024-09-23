import { useState } from "react";
import { Drawer } from "antd";

import { FaUser } from "react-icons/fa";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateColorScheme, updateDarkTheme } from "../../features/features";

const Navbar = ({ pageName, darkTheme, colors }: any) => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: any) => state.colorScheme);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div className="mt-[20px] mx-[10px] sm:mx-[20px] flex flex-col-reverse sm:flex-row gap-[5px] items-center justify-between">
        <p
          className={`font-[600] text-[18px] sm:text-[20px] md:text-[25px] capitalize`}
          style={{ color: colors.text }}
        >
          {pageName}
        </p>
        <div
          className="w-[max-content] h-[60px] rounded-full  flex items-center px-[20px]"
          style={{ backgroundColor: colors.light }}
        >
          <div className="flex items-center gap-[10px]">
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              style={{ backgroundColor: colors.dark }}
            >
              <IoIosNotifications style={{ color: colors.text }} />
            </div>
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              onClick={() => setOpenDrawer(!openDrawer)}
              style={{ backgroundColor: colors.dark }}
            >
              <IoMdSettings style={{ color: colors.text }} />
            </div>
            <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              onClick={() => dispatch(updateDarkTheme(!darkTheme))}
              style={{ backgroundColor: colors.dark }}
            >
              {darkTheme ? (
                <IoSunnySharp style={{ color: colors.text }} />
              ) : (
                <IoMoon style={{ color: colors.text }} />
              )}
            </div>
            <div
              className={`w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center`}
              style={{ backgroundColor: colors.dark }}
            >
              <FaUser style={{ color: colors.text }} />
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title="Theme Settings"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        style={{ fontFamily: "Roboto" }}
      >
        <p className="text-[15px] font-[600]">Select Theme</p>
        <div className="mt-[10px] flex gap-[10px]">
          <div
            className={`w-[30px] h-[30px] rounded-full cursor-pointer ${
              colorScheme === "color1" && "border border-[black]"
            }`}
            style={{ backgroundColor: colors.color1 }}
            onClick={() => dispatch(updateColorScheme("color1"))}
          ></div>
          <div
            className={`w-[30px] h-[30px] rounded-full cursor-pointer ${
              colorScheme === "color2" && "border border-[black]"
            }`}
            style={{ backgroundColor: colors.color2 }}
            onClick={() => dispatch(updateColorScheme("color2"))}
          ></div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
