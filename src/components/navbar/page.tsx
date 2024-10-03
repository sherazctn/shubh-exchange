import { useState } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import SignupModal from "./SignupModal";
import { SignInApi } from "../../api/api";
import { authenticate, updateMobileMenu, updateMobileSidebar } from "../../features/features";

import { SlLogout } from "react-icons/sl";
import { SiBetfair } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { IoMenuSharp } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiNetworkBars, GiNotebook } from "react-icons/gi";
import { LuLayoutDashboard, LuWallet2 } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight, MdOutlineCasino, MdOutlineHistory, MdOutlineSportsBaseball, MdOutlineSportsScore } from "react-icons/md";
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.mobileMenu);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const pageNav = useSelector((state: any) => state.navPage);
  const authentication = useSelector((state: any) => state.authentication);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);

  const handleMobileLogin = () => {
    dispatch(updateMobileMenu(false));
    setLoginModal(true);
  };

  const fn_submit = async (e: any) => {
    e.preventDefault();
    const data = {
      username, password
    }
    setLoader(true);
    const response = await SignInApi(data);
    if (response?.status) {
      setUsername("");
      setPassword("");
      setPasswordType("password");
      dispatch(authenticate(true));
      setLoginModal(false);
      setLoader(false);
      return toast.success(response?.message)
    } else {
      setLoader(false);
      dispatch(authenticate(false));
      return toast.error(response?.message)
    }
  };

  const fn_logout = () => {
    Cookies.remove('token');
    dispatch(authenticate(false));
    return toast.success("Logout Successfullty");
  }

  return (
    <>
      <div className="navbar shadow-md">
        {/* company name */}
        <div>
          <Link to={"/"} className="text-[28px] font-[700] text-[--text-color]">
            Shubh Exchange
          </Link>
        </div>
        {/* web menus */}
        <div className="hidden md:flex gap-[10px]">
          <ul className="menus flex items-center gap-[15px] font-[600] text-[15px] text-[--text-color]">
            <Link to={"/"} className={`menu ${pageNav === "home" && "active"} flex items-center gap-[4px]`}>
              <GiNetworkBars className="w-[17px] h-[17px] text-[--text-color]" />
              My Markets
            </Link>
            <Link
              to={"/all-sports"}
              className={`menu ${pageNav === "sports" && "active"} flex items-center gap-[4px]`}
            >
              <MdOutlineSportsBaseball className="w-[17px] h-[17px] text-[--text-color]" />
              Sports
            </Link>
            <Link
              to={"/in-play"}
              className={`menu ${pageNav === "inplay" && "active"} flex items-center gap-[4px]`}
            >
              <MdOutlineSportsScore className="w-[17px] h-[17px] text-[--text-color]" />
              In-Play
            </Link>
            <li className="menu flex items-center gap-[4px]"><MdOutlineCasino className="w-[17px] h-[17px] text-[--text-color]" /> Casino</li>
          </ul>
          {authentication ? (
            <button
              className="navbar-profile"
              onMouseEnter={() => setAccountDropdown(true)}
              onMouseLeave={() => setAccountDropdown(false)}
            >
              <FaUser />
            </button>
          ) : (
            <>
              <button className="navbar-signup-btn" onClick={() => setSignupModal(true)}>
                Signup
              </button>
              <button className="navbar-btn" onClick={() => setLoginModal(true)}>
                Login
              </button>
            </>
          )}
        </div>
        {/* mobile menu btn */}
        <div className="flex gap-[10px] md:hidden">
          <div className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] bg-[--text-color] cursor-pointer">
            <IoMenuSharp
              className="text-[--main-color] text-[25px]"
              onClick={() => dispatch(updateMobileMenu(true))}
            />
          </div>
          <div>
            <button
              className="navbar-profile"
              onMouseEnter={() => setAccountDropdown(true)}
              onMouseLeave={() => setAccountDropdown(false)}
            >
              <FaUser />
            </button>
          </div>
        </div>
        {/* mobile menu */}
        <div
          className={`absolute transition-all flex z-[9999] justify-center duration-700 bg-[#000000c0] w-full min-h-[100vh] top-0 py-[11px] px-[20px] ${mobileMenu ? "left-0" : "left-[-100vw]"
            }`}
        >
          <div className="flex justify-end absolute right-[20px]">
            <div
              onClick={() => dispatch(updateMobileMenu(false))}
              className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] bg-[--main-color] cursor-pointer"
            >
              <RxCross2 className="text-white text-[25px]" />
            </div>
          </div>
          <ul className="menus flex flex-col text-white justify-center gap-[15px] font-[600] text-[15px] w-full">
            <Link
              to={"/"}
              className={`menu w-[max-content] ${pageNav === "home" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              My Markets
            </Link>
            <Link
              to={"/all-sports"}
              className={`menu w-[max-content] ${pageNav === "sports" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              Sports
            </Link>
            <Link
              to={"/in-play"}
              className={`menu w-[max-content] ${pageNav === "inplay" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              In-Play
            </Link>
            <li
              className="menu w-[max-content]"
              style={{ borderColor: "white" }}
            >
              Casino
            </li>
            {!authentication && (
              <button
                className="navbar-btn"
                style={{ backgroundColor: "var(--main-color)", color: "var(--text-color)" }}
                onClick={handleMobileLogin}
              >
                Login
              </button>
            )}
          </ul>
        </div>
        {!mobileSidebar && (
          <div className="absolute lg:hidden w-[38px] h-[38px] left-[10px] top-[68px] bg-gray-100 rounded-[7px] shadow-md border z-[999] flex justify-center items-center">
            <MdKeyboardDoubleArrowRight
              onClick={() => dispatch(updateMobileSidebar(!mobileSidebar))}
              className="text-[25px]"
            />
          </div>
        )}
        {accountDropdown && (
          <div
            onMouseEnter={() => setAccountDropdown(true)}
            onMouseLeave={() => setAccountDropdown(false)}
            className="bg-white absolute top-[49px] shadow-lg border border-gray-300 right-[20px] rounded-[7px] flex flex-col"
          >
            <Link
              to={"/account/dashboard"}
              className="border-b flex-1 flex items-center gap-[5px] w-[100%] text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-t-[7px]"
            >
              <LuLayoutDashboard />
              Dashboard
            </Link>
            <Link
              to={"/account/wallet"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <LuWallet2 />
              My Wallet
            </Link>
            <Link
              to={"/account/bets"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <SiBetfair />
              Bets
            </Link>
            <Link
              to={"/account/account-statement"}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <GiNotebook />
              Account Statement
            </Link>
            <Link
              to={"/account/bonus-statement"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <FaHandHoldingDollar />
              Bonus Statement
            </Link>
            <Link
              to={"/account/login-history"}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-b-[7px]"
            >
              <MdOutlineHistory />
              Login History
            </Link>
            <div
              onClick={fn_logout}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-b-[7px]"
            >
              <SlLogout />
              Logout
            </div>
          </div>
        )}
      </div>
      <Modal
        title=""
        centered
        open={loginModal}
        onOk={() => setLoginModal(false)}
        onCancel={() => setLoginModal(false)}
        footer={null}
        style={{ fontFamily: "Roboto" }}
      >
        <div className="flex justify-center font-[800] text-[30px] sm:text-[35px] gap-[8px]">
          Shubh<span className="text-[--main-color]">Exchange</span>
        </div>
        <form onSubmit={fn_submit} className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[3px]">
            <label
              htmlFor="username"
              className="font-[600] text-[16px] sm:text-[18px]"
            >
              Username
            </label>
            <input
              className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative flex flex-col gap-[3px]">
            <label
              htmlFor="password"
              className="font-[600] text-[16px] sm:text-[18px]"
            >
              Password
            </label>
            <input
              type={passwordType}
              className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px] outline-[--main-color]"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType === "password" ? (
              <FaRegEyeSlash
                onClick={() => setPasswordType("text")}
                className="cursor-pointer absolute right-[10px] bottom-[13px]"
              />
            ) : (
              <FaRegEye
                onClick={() => setPasswordType("password")}
                className="cursor-pointer absolute right-[10px] bottom-[13px]"
              />
            )}
          </div>
          <button className="bg-[--main-color] text-[--text-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center">
            {!loader ? "Login" :
              <Loader color="var(--text-color)" size={20} />
            }
          </button>
        </form>
      </Modal>
      <SignupModal signupModal={signupModal} setSignupModal={setSignupModal} />
    </>
  );
};

export default Navbar;
