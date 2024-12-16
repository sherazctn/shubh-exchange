import { Drawer } from "antd";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PiHandDeposit } from "react-icons/pi";
import { FaHome, FaUser } from "react-icons/fa";
// import { IoMoon, IoSunnySharp } from "react-icons/io5";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";

import { updateUserApi } from "../../api/api";

const Navbar = ({ pageName, colors }: any) => {
  const navigate = useNavigate();
  // const colorScheme = useSelector((state: any) => state.colorScheme);
  const panelMainColor = useSelector((state: any) => state.panelMainColor);
  const panelSecColor = useSelector((state: any) => state.panelSecColor);
  const user = useSelector((state: any) => state?.user);
  const [oddsPrice, setOddsPrice] = useState([]);
  const [prevPrice, setPrevPrice] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  useEffect(() => {
    setOddsPrice(user?.oddsPrice || [1000, 2000, 3000, 4000, 5000]);
    setPrevPrice(user?.oddsPrice || [1000, 2000, 3000, 4000, 5000]);
  }, [user]);
  const onChangePrice = (index: number, price: number) => {
    setOddsPrice((prev: any) =>
      prev.map((item: any, i: any) => (i === index ? price : item))
    );
  };
  const fn_update = async () => {
    const response = await updateUserApi({ oddsPrice: oddsPrice });
    if (response?.status) {
      toast.success("Data Updated")
    } else {
      toast.error(response?.message || "Something went wrong")
    }
  }
  return (
    <>
      <div className="mt-[20px] mx-[10px] sm:mx-[20px] flex flex-col-reverse sm:flex-row gap-[5px] items-center justify-between">
        <p
          className={`font-[600] text-[18px] sm:text-[20px] md:text-[25px] capitalize`}
          style={{ color: panelSecColor }}
        >
          {pageName}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-[15px]">
          <div
            className="w-[max-content] h-[60px] rounded-full flex items-center px-[14px]"
            style={{ backgroundColor: panelMainColor }}
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={`rounded-full cursor-pointer flex items-center justify-center h-[40px] px-[20px] gap-[5px]`}
                style={{ backgroundColor: colors.dark }}
                onClick={() => navigate("/account/deposit-withdraw")}
              >
                <PiHandDeposit className="text-[25px]" style={{ color: panelSecColor }} />
                <span className="text-[16px] font-[800]" style={{ color: panelSecColor }}>Deposit</span>
              </div>
              <Link
                to={"/"}
                className={`w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center`}
                style={{ backgroundColor: colors.dark }}
              >
                <FaHome className="text-[22px]" style={{ color: panelSecColor }} />
              </Link>
            </div>
          </div>
          <div
            className="w-[max-content] h-[60px] rounded-full  flex items-center px-[20px]"
            style={{ backgroundColor: panelMainColor }}
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
                style={{ backgroundColor: colors.dark }}
              >
                <IoIosNotifications style={{ color: panelSecColor }} />
              </div>
              <div
                className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
                onClick={() => setOpenDrawer(!openDrawer)}
                style={{ backgroundColor: colors.dark }}
              >
                <IoMdSettings style={{ color: panelSecColor }} />
              </div>
              {/* <div
              className={`w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center`}
              onClick={() => dispatch(updateDarkTheme(!darkTheme))}
              style={{ backgroundColor: colors.dark }}
            >
              {darkTheme ? (
                <IoSunnySharp style={{ color: panelSecColor }} />
              ) : (
                <IoMoon style={{ color: panelSecColor }} />
              )}
            </div> */}
              <div
                className={`w-[40px] h-[40px] rounded-full cursor-pointer flex items-center justify-center`}
                style={{ backgroundColor: colors.dark }}
              >
                <FaUser style={{ color: panelSecColor }} />
              </div>
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
        <p className="text-[15px] font-[600]">Account Info</p>
        <div className="mt-[10px]">
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Name</p>
            <p>{user?.username}</p>
          </div>
          <div className="flex h-[22px]">
            <p className="w-[120px] font-[500]">Mobile #</p>
            <p>{user?.phone}</p>
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
            <p className="w-[120px] font-[500]">Time Zone</p>
            <p>GMT+0500</p>
          </div>
          <div>
          </div>
        </div>
        <hr className="my-[20px]" />
        <p className="text-[15px] font-[600]">Odds Price Hints</p>
        <div className="flex flex-col gap-[7px] mt-[10px]">
          {oddsPrice && oddsPrice?.map((i: number, index: number) => (
            <input
              min={1}
              value={i}
              type="number"
              onChange={(e: any) => onChangePrice(index, parseInt(e.target.value))}
              className="bg-gray-200 w-full px-[10px] h-[25px] font-[500] rounded-[5px]"
            />
          ))}
          <button className={`h-[35px] rounded-[5px] font-[500] mt-[5px] ${prevPrice === oddsPrice ? "bg-gray-200 cursor-not-allowed hidden" : "bg-gray-300 cursor-pointer"}`} onClick={fn_update}>Update</button>
        </div>
        <hr className="my-[20px]" />
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
