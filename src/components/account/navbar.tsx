import { Drawer } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateDarkTheme } from "../../features/features";
// import { updateColorScheme } from "../../features/features";

const Navbar = ({ pageName, darkTheme, colors }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const colorScheme = useSelector((state: any) => state.colorScheme);
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
        title="Settings"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        style={{ fontFamily: "Roboto" }}
      >
        {/* <p className="text-[15px] font-[600]">Select Theme</p>
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
        <hr className="my-[20px]" /> */}
        <p className="text-[15px] font-[600]">Account Info</p>
        <div className="mt-[10px]">
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Name</p>
            <p>Test</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Username</p>
            <p>test228</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Mobile</p>
            <p>+91 203 1234434</p>
          </div>
        </div>
        <hr className="my-[20px]" />
        <p className="text-[15px] font-[600]">Web Settings</p>
        <div className="mt-[10px]">
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Currency</p>
            <p>INR</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Odds Format</p>
            <p>--</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Time Zone</p>
            <p>GMT+0500</p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/");
            Cookies.remove('token');
          }}
          className="w-full bg-gray-300 rounded-[4px] h-[35px] my-[15px] text-[15px] font-[500]"
        >
          Logout
        </button>
      </Drawer>
    </>
  );
};

export default Navbar;
