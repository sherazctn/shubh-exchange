import { IoMenuSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navbar shadow-md">
      <div>
        <p className="text-[28px] font-[700]">Betting App</p>
      </div>
      <div className="hidden md:flex gap-[25px]">
        <ul className="menus flex items-center gap-[15px] font-[600] text-[15px]">
          <li className="menu">Sports</li>
          <li className="menu">My Markets</li>
          <li className="menu">In-Play</li>
          <li className="menu">Casino</li>
        </ul>
        <button className="navbar-btn">Login</button>
      </div>
      <div className="flex justify-center items-center md:hidden w-[38px] h-[38px] rounded-[5px] bg-black cursor-pointer">
        <IoMenuSharp className="text-white text-[25px]" />
      </div>
    </div>
  );
};

export default Navbar;
