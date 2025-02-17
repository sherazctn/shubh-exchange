import { Modal } from "antd";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import SignupModal from "./SignupModal";
import URL, { SignInApi, webLogoApi, webNameApi } from "../../api/api";
import { authenticate, updateBets, updateExposure, updateMobileMenu, updateMobileSidebar, updateUsername, updateWallet } from "../../features/features";

import { SlLogout } from "react-icons/sl";
import { SiBetfair } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { PiHandDeposit } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiNetworkBars, GiNotebook } from "react-icons/gi";
import { LuLayoutDashboard, LuWallet2 } from "react-icons/lu";
import { FaRegEye, FaRegEyeSlash, FaUser, FaUserPlus } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight, MdOutlineHistory, MdOutlineSportsBaseball, MdOutlineSportsScore } from "react-icons/md";

import indianFlag from "../../assets/indian_flag.webp";
import bangaliFlag from "../../assets/bangladesh_flag.png";
import bangaliFlag2 from "../../assets/bangladesh_flag_2.png";

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
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);

  const [webName, setWebName] = useState("");
  const [webLogo, setWebLogo] = useState("");
  const webColor = useSelector((state: any) => state.websiteColor);
  const wallet = useSelector((state: any) => state.wallet);
  const exposure = useSelector((state: any) => state.exposure);
  const username = useSelector((state: any) => state.username);

  const countries = [
    { name: "India", flag: indianFlag },
    { name: "Bangladesh", flag: bangaliFlag },
  ];
  const [showCountry, setShowCountry] = useState(false);
  const [clickedCountry, setClickedCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(countries[0]);

  const rootWebsite = window.location.origin;

  useEffect(() => {
    fn_webName();
    fn_webLogo();
  }, [])

  const handleMobileLogin = () => {
    dispatch(updateMobileMenu(false));
    setLoginModal(true);
  };

  const handleMobileSignup = () => {
    dispatch(updateMobileMenu(false));
    setSignupModal(true);
  };

  const fn_webName = async () => {
    const response = await webNameApi();
    if (response?.status) {
      setWebName(response?.data[0].name)
    }
  };

  const fn_webLogo = async () => {
    const response = await webLogoApi();
    if (response?.status) {
      setWebLogo(response?.data[0].image)
    }
  };

  const fn_submit = async (e: any) => {
    e.preventDefault();
    if (phone.length < 5) {
      return toast.error("Write Correct Phone Number")
    }
    const phoneNumber = "+" + phone;
    const data = {
      phone: phoneNumber, password
    }
    setLoader(true);
    const response = await SignInApi(data);
    if (response?.status) {
      setPhone("");
      setPassword("");
      setPasswordType("password");
      dispatch(authenticate(true));
      dispatch(updateWallet(response?.data?.wallet || 0));
      dispatch(updateExposure(response?.data?.exposure || 0));
      dispatch(updateUsername(response?.data?.username));
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
    dispatch(updateBets([]));
    setAccountDropdown(false);
    return toast.success("Logout Successfully");
  }

  const fn_depositClicked = () => {
    if (!authentication) {
      return toast.error("Login Yourself")
    } else {
      window.location.href = "/account/deposit-withdraw";
    }
  }

  return (
    <>
      <div className="navbar h-[70px] sm:h-[60px] px-[10px] sm:px-[20px] shadow-md" style={{ backgroundColor: webColor }}>
        {/* country website */}
        <div className={`h-[45px] w-[150px] bg-white absolute bottom-[-45px] border border-black rounded-l-full px-[10px] flex justify-center items-center transition-all duration-200 ${!showCountry ? "right-[-100px]" : "right-[-15px]"}`}>
          <div className="relative w-full">
            <button
              className="w-full bg-transparent text-[15px] font-[500] flex items-center justify-between gap-2 cursor-pointer"
              type="button"
              onMouseEnter={() => setShowCountry(true)}
              onMouseLeave={() => {
                setShowCountry(false);
                setClickedCountry(false);
              }}
              onClick={() => setClickedCountry(!clickedCountry)}
            >
              {rootWebsite === "https://shubhbet.com" ? (
                <div className="flex items-center gap-2">
                  <img
                    src={bangaliFlag}
                    width={30}
                    height={30}
                    className="object-cover rounded-full w-[30px] h-[30px] border"
                  />
                  <span>Bangladesh</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img
                    src={indianFlag}
                    width={30}
                    height={30}
                    className="object-cover rounded-full w-[30px] h-[30px] border"
                  />
                  <span>India</span>
                </div>
              )}
            </button>
            {clickedCountry && (
              <ul
                className="absolute left-0 top-[29px] w-full bg-white border mt-0.5 rounded-md shadow-md z-10 p-[5px]"
                onMouseEnter={() => {
                  setShowCountry(true)
                  setClickedCountry(true);
                }}
                onMouseLeave={() => {
                  setShowCountry(false);
                  setClickedCountry(false);
                }}
              >
                {rootWebsite === "https://shubhbet.com" ? (
                  <>
                    <a
                      href={"https://shubhexchange.com"}
                      target="__blank"
                      className=" hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-[13px] mb-[5px]"
                    >
                      <img
                        src={indianFlag}
                        width={20}
                        className="object-contain"
                      />
                      India
                    </a>
                    <a
                      href={"#"}
                      className=" hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-[13px]"
                    >
                      <img
                        src={bangaliFlag2}
                        width={20}
                        className="object-contain"
                      />
                      Bangladesh
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href={"#"}
                      className=" hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-[13px] mb-[5px]"
                    >
                      <img
                        src={indianFlag}
                        width={20}
                        className="object-contain"
                      />
                      India
                    </a>
                    <a
                      href={"https://shubhbet.com"}
                      target="__blank"
                      className=" hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-[13px]"
                    >
                      <img
                        src={bangaliFlag2}
                        width={20}
                        className="object-contain"
                      />
                      Bangladesh
                    </a>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
        {/* company name */}
        <div className="flex items-center gap-[10px]">
          {webLogo !== "" && (
            <a href="/" className="inline-block">
              <img src={`${URL}/${webLogo}`} alt="" className={`${authentication ? "h-[30px] mt-[-20px] sm:mt-0 sm:h-[40px]" : "h-[30px] sm:h-[40px]"}`} />
            </a>
          )}
          <a href={"/"} className={`text-[22px] sm:text-[28px] font-[700] text-[--text-color] ${authentication && "mt-[-18px] sm:mt-0"}`}>
            {webName}
          </a>
        </div>
        {/* web menus */}
        <div className="hidden md:flex gap-[10px]">
          <ul className="menus flex items-center gap-[15px] font-[600] text-[15px] text-[--text-color]">
            <p style={{ color: webColor }} className="flex items-center justify-center gap-[10px] bg-[--text-color] h-[37px] rounded-[5px] w-[120px] shadow-md scale-up-down" onClick={fn_depositClicked}>
              <PiHandDeposit className="w-[19px] h-[19px]" />
              <span className="me-[5px]">Deposit</span>
            </p>
            <a href={"/"} className={`menu ${pageNav === "home" && "active"} flex items-center gap-[4px]`}>
              <GiNetworkBars className="w-[17px] h-[17px] text-[--text-color]" />
              My Markets
            </a>
            <a
              href={"/all-sports"}
              className={`menu ${pageNav === "sports" && "active"} flex items-center gap-[4px]`}
            >
              <MdOutlineSportsBaseball className="w-[17px] h-[17px] text-[--text-color]" />
              Sports
            </a>
            <a
              href={"/in-play"}
              className={`menu ${pageNav === "inplay" && "active"} flex items-center gap-[4px]`}
            >
              <MdOutlineSportsScore className="w-[17px] h-[17px] text-[--text-color]" />
              In-Play
            </a>
            {/* <a
              href={"/casino"}
              className={`menu ${pageNav === "casino" && "active"} flex items-center gap-[4px]`}
            >
              <MdOutlineCasino className="w-[17px] h-[17px] text-[--text-color]" />
              Casino
            </a> */}
          </ul>
          {authentication ? (
            <div className="min-w-[270px] bg-[#ffffff5e] rounded-[5px] flex justify-between">
              <p className="flex flex-col justify-center ps-[13px] gap-[3px] pt-[2px] text-white flex-nowrap">
                <span className="text-[11px] leading-[10px] font-[500]">Balance</span>
                <span className="text-[14px] leading-[14px] font-[600] text-nowrap"><FaIndianRupeeSign className="inline-block mt-[-1px]" />{Number(wallet).toFixed(2)}</span>
              </p>
              <p className="flex flex-col justify-center ps-[13px] gap-[3px] pt-[2px] text-white">
                <span className="text-[11px] leading-[10px] font-[500]">Exp</span>
                <span className="text-[14px] leading-[14px] font-[600] text-nowrap"><FaIndianRupeeSign className="inline-block mt-[-1px]" />{exposure <= 0 ? Number(exposure).toFixed(2) : `-${Number(exposure).toFixed(2)}`}</span>
              </p>
              <p className="flex flex-col justify-center px-[13px] gap-[3px] pt-[2px] text-white">
                <span className="text-[11px] leading-[10px] font-[500]">Username</span>
                <span className="text-[14px] leading-[14px] font-[600] capitalize text-nowrap">{username}</span>
              </p>
              <button
                className="navbar-profile"
                style={{ color: webColor }}
                onMouseEnter={() => setAccountDropdown(true)}
                onMouseLeave={() => setAccountDropdown(false)}
              >
                <FaUser />
              </button>
            </div>
          ) : (
            <>
              <button className="navbar-signup-btn" onClick={() => setSignupModal(true)}>
                Signup
              </button>
              <button className="navbar-btn" style={{ color: webColor }} onClick={() => setLoginModal(true)}>
                Login
              </button>
            </>
          )}
        </div>
        {/* mobile menu btn */}
        <div className={`flex gap-[6px] sm:gap-[10px] md:hidden ${authentication && "mt-[-18px]"}`}>
          <div className="scale-up-down flex justify-center items-center md:hidden min-w-[29px] h-[29px] rounded-[5px] bg-[--text-color] cursor-pointer text-[12px] font-[600] px-[10px]" onClick={fn_depositClicked}>
            <PiHandDeposit className="scale-[1.2] me-[4px]" />Deposit
          </div>
          {!authentication && (
            <div className="flex justify-center items-center md:hidden w-[29px] h-[29px] rounded-[30px] bg-[--text-color] cursor-pointer text-[13px] font-[600]" onClick={() => setLoginModal(true)}>
              <FaUser className="mt-[-1px]" />
            </div>
          )}
          {!authentication && (
            <div className="flex justify-center items-center md:hidden w-[29px] h-[29px] rounded-[30px] bg-[--text-color] cursor-pointer text-[17px]" onClick={() => setSignupModal(true)}>
              <FaUserPlus className="mt-[-1px] ml-[4px]" />
            </div>
          )}
          {authentication && (
            <div>
              <button
                className="navbar-profile w-[30px] h-[30px] sm:h-[38px] sm:w-[38px]"
                style={{ color: webColor }}
                onMouseEnter={() => setAccountDropdown(true)}
                onMouseLeave={() => setAccountDropdown(false)}
              >
                <FaUser />
              </button>
            </div>
          )}
          {authentication && (
            <div className="text-white text-[13px] font-[600] absolute text-nowrap top-[48px] bg-black w-full left-0 flex justify-between items-center px-[10px] py-[1px]">
              <p>Balance: <FaIndianRupeeSign className="inline-block text-[14px]" />{Number(wallet).toFixed(2)}</p>
              <p>Exposure: <FaIndianRupeeSign className="inline-block text-[14px]" />{exposure <= 0 ? Number(exposure).toFixed(2) : `-${Number(exposure).toFixed(2)}`}</p>
            </div>
          )}
        </div>
        {/* mobile menu */}
        <div
          className={`absolute transition-all flex z-[9999] justify-center duration-700 bg-[#000000c0] w-full min-h-[100vh] top-0 py-[11px] px-[20px] ${mobileMenu ? "left-0" : "left-[-100vw]"
            }`}
        >
          <div className="flex justify-end absolute right-[20px]">
            <div
              onClick={() => dispatch(updateMobileMenu(false))}
              className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] cursor-pointer"
              style={{ backgroundColor: webColor }}
            >
              <RxCross2 className="text-white text-[25px]" />
            </div>
          </div>
          <ul className="menus flex flex-col text-white justify-center gap-[15px] font-[600] text-[15px] w-full">
            <a
              href={"/"}
              className={`menu w-[max-content] ${pageNav === "home" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              My Markets
            </a>
            <a
              href={"/all-sports"}
              className={`menu w-[max-content] ${pageNav === "sports" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              Sports
            </a>
            <a
              href={"/in-play"}
              className={`menu w-[max-content] ${pageNav === "inplay" && "border-b"
                }`}
              style={{ borderColor: "white" }}
            >
              In-Play
            </a>
            {/* <li
              className="menu w-[max-content]"
              style={{ borderColor: "white" }}
            >
              Casino
            </li> */}
            {!authentication && (
              <button
                className="navbar-btn"
                style={{ backgroundColor: webColor, color: "var(--text-color)" }}
                onClick={handleMobileLogin}
              >
                Login
              </button>
            )}
            {!authentication && (
              <button
                className="navbar-btn"
                style={{ color: webColor, backgroundColor: "var(--text-color)" }}
                onClick={handleMobileSignup}
              >
                Signup
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
            className={`bg-white absolute top-[40px] sm:top-[47px] shadow-lg border border-gray-300 right-[20px] rounded-[7px] flex flex-col z-[999999]`}
          >
            <a
              href={"/account/dashboard"}
              className="border-b flex-1 flex items-center gap-[5px] w-[100%] text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-t-[7px]"
            >
              <LuLayoutDashboard />
              Dashboard
            </a>
            <a
              href={"/account/deposit-withdraw"}
              className="border-b flex-1 flex items-center gap-[5px] w-[100%] text-[13px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-t-[7px]"
            >
              <PiHandDeposit className="scale-[1.15]" />
              Deposit
            </a>
            <a
              href={"/account/wallet"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <LuWallet2 />
              My Wallet
            </a>
            <a
              href={"/account/bets"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <SiBetfair />
              Bets
            </a>
            <a
              href={"/account/payment-information"}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <GiNotebook />
              Payment Information
            </a>
            {/* <a
              href={"/account/bonus-statement"}
              className="border-b text-[13px] flex items-center gap-[5px] font-[500] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300"
            >
              <FaHandHoldingDollar />
              Bonus Statement
            </a> */}
            <a
              href={"/account/login-history"}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-b-[7px]"
            >
              <MdOutlineHistory />
              Login History
            </a>
            <div
              onClick={fn_logout}
              className="border-b text-[13px] font-[500] flex items-center gap-[5px] px-[13px] py-[5px] cursor-pointer hover:bg-gray-300 rounded-b-[7px]"
            >
              <SlLogout />
              Logout
            </div>
          </div>
        )}
      </div >
      <Modal
        title=""
        centered
        open={loginModal}
        onOk={() => setLoginModal(false)}
        onCancel={() => setLoginModal(false)}
        footer={null}
        style={{ fontFamily: "Roboto" }}
      >
        <div className="flex justify-center font-[700] text-[30px] sm:text-[35px] gap-[8px]">
          {/* {webName} */}
          Login
        </div>
        <form onSubmit={fn_submit} className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[3px]">
            <label
              className="font-[600] text-[16px] sm:text-[18px]"
            >
              Phone Number
            </label>
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={(e) => setPhone(e)}
              inputStyle={{
                width: "100%",
                borderColor: "#e5e7eb"
              }}
              inputProps={{
                required: true,
              }}
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
              className="border h-[40px] rounded-[5px] px-[10px] font-[500] outline-[1px]"
              style={{ outlineColor: webColor }}
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
          <button className="text-[--text-color] h-[40px] rounded-[5px] text-[16px] font-[600] mt-[5px] flex justify-center items-center" style={{ backgroundColor: webColor }}>
            {!loader ? "Login" :
              <Loader color="var(--text-color)" size={20} />
            }
          </button>
        </form>
      </Modal>
      <SignupModal signupModal={signupModal} setSignupModal={setSignupModal} webName={webName} webColor={webColor} />
    </>
  );
};

export default Navbar;
