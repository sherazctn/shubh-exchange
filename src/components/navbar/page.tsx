import { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  authenticate,
  updateMobileMenu,
  updateMobileSidebar,
} from "../../features/features";

import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.mobileMenu);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  const pageNav = useSelector((state: any) => state.navPage);
  const authentication = useSelector((state: any) => state.authentication);
  const [loginModal, setLoginModal] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleMobileLogin = () => {
    dispatch(updateMobileMenu(false));
    setLoginModal(true);
  };
  const fn_submit = (e: any) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setPasswordType("password");
    setLoginModal(false);
    dispatch(authenticate(true));
  };
  return (
    <>
      <div className="navbar shadow-md">
        {/* company name */}
        <div>
          <Link to={"/"} className="text-[28px] font-[700]">
            Betting App
          </Link>
        </div>
        {/* web menus */}
        <div className="hidden md:flex gap-[25px]">
          <ul className="menus flex items-center gap-[15px] font-[600] text-[15px]">
            <Link to={"/"} className={`menu ${pageNav === "home" && "active"}`}>
              My Markets
            </Link>
            <Link
              to={"/all-sports"}
              className={`menu ${pageNav === "sports" && "active"}`}
            >
              Sports
            </Link>
            <Link
              to={"/in-play"}
              className={`menu ${pageNav === "inplay" && "active"}`}
            >
              In-Play
            </Link>
            <li className="menu">Casino</li>
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
            <button className="navbar-btn" onClick={() => setLoginModal(true)}>
              Login
            </button>
          )}
        </div>
        {/* mobile menu btn */}
        <div className="flex gap-[10px] md:hidden">
          <div className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] bg-black cursor-pointer">
            <IoMenuSharp
              className="text-white text-[25px]"
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
          className={`absolute transition-all flex z-[9999] justify-center duration-700 bg-[#000000c0] w-full min-h-[100vh] top-0 py-[11px] px-[20px] ${
            mobileMenu ? "left-0" : "left-[-100vw]"
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
              className={`menu w-[max-content] ${
                pageNav === "home" && "border-b"
              }`}
              style={{ borderColor: "white" }}
            >
              My Markets
            </Link>
            <Link
              to={"/all-sports"}
              className={`menu w-[max-content] ${
                pageNav === "sports" && "border-b"
              }`}
              style={{ borderColor: "white" }}
            >
              Sports
            </Link>
            <Link
              to={"/in-play"}
              className={`menu w-[max-content] ${
                pageNav === "inplay" && "border-b"
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
                style={{ backgroundColor: "var(--main-color)" }}
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
              to={"/account/profile"}
              className="border-b flex-1 w-[100%] text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-t-[7px]"
            >
              Profile
            </Link>
            <Link
              to={"/account/my-wallet"}
              className="border-b text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              My Wallet
            </Link>
            <Link
              to={"/account/account-statement"}
              className="border-b text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              Account Statement
            </Link>
            <Link
              to={"/account/bonus-statement"}
              className="border-b text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              Bonus Statement
            </Link>
            <Link
              to={"/account/bets"}
              className="border-b text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              Bets
            </Link>
            <Link
              to={"/account/login-history"}
              className="border-b text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-b-[7px]"
            >
              Login History
            </Link>
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
          <button className="bg-[--main-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px]">
            Login
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Navbar;
