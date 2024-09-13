import { useDispatch, useSelector } from "react-redux";

import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { updateMobileMenu, updateMobileSidebar } from "../../features/features";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.mobileMenu);
  const mobileSidebar = useSelector((state: any) => state.mobileSidebar);
  return (
    <div className="navbar shadow-md">
      <div>
        <Link to={"/"} className="text-[28px] font-[700]">
          Betting App
        </Link>
      </div>
      <div className="hidden md:flex gap-[25px]">
        <ul className="menus flex items-center gap-[15px] font-[600] text-[15px]">
          <Link to={"/"} className="menu">
            My Markets
          </Link>
          <Link to={"/all-sports"} className="menu">
            Sports
          </Link>
          <li className="menu">In-Play</li>
          <li className="menu">Casino</li>
        </ul>
        <button className="navbar-btn">Login</button>
      </div>
      <div className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] bg-black cursor-pointer">
        <IoMenuSharp
          className="text-white text-[25px]"
          onClick={() => dispatch(updateMobileMenu(true))}
        />
      </div>
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
            className="menu w-[max-content]"
            style={{ borderColor: "white" }}
          >
            My Markets
          </Link>
          <Link
            to={"/all-sports"}
            className="menu w-[max-content]"
            style={{ borderColor: "white" }}
          >
            Sports
          </Link>
          <li className="menu w-[max-content]" style={{ borderColor: "white" }}>
            In-Play
          </li>
          <li className="menu w-[max-content]" style={{ borderColor: "white" }}>
            Casino
          </li>
          <button
            className="navbar-btn"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            Login
          </button>
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
    </div>
  );
};

export default Navbar;
